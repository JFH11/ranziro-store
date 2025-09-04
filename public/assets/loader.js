(function () {
  let navTimer = null;

  document.addEventListener('DOMContentLoaded', () => {
    // Inject loader jika belum ada
    if (!document.getElementById('page-loader')) {
      const loader = document.createElement('div');
      loader.id = 'page-loader';
      loader.innerHTML = `
        <div class="loader-ripple">
          <div></div>
          <div></div>
        </div>
      `;
      document.body.appendChild(loader);
    }
    bindLinks();
  });

  function showLoader() {
    const overlay = document.getElementById('page-loader');
    if (overlay) overlay.classList.add('active');
  }

  function hideLoader() {
    const overlay = document.getElementById('page-loader');
    if (overlay) overlay.classList.remove('active');
    if (navTimer) {
      clearTimeout(navTimer);
      navTimer = null;
    }
  }

  function onLinkClick(e) {
    const a = e.currentTarget;
    const href = a.getAttribute('href');
    const target = a.getAttribute('target');

    if (e.metaKey || e.ctrlKey || e.shiftKey || (target && target === '_blank')) {
      return;
    }

    e.preventDefault();
    showLoader();

    navTimer = setTimeout(() => {
      window.location.href = href;
    }, 1200);
  }

  function bindLinks() {
    const links = [...document.querySelectorAll('a[href]')].filter(a =>
      a.getAttribute('href') &&
      !a.getAttribute('href').startsWith('#') &&
      !a.hasAttribute('data-no-loader')
    );
    links.forEach(a => {
      a.removeEventListener('click', onLinkClick);
      a.addEventListener('click', onLinkClick);
    });
  }

  // Back/forward browser → matikan loader
  window.addEventListener('popstate', hideLoader);
  window.addEventListener('pageshow', hideLoader);
})();

(function(){
  const loader = document.getElementById('top-loader');
  if (!loader) return;

  let progress = 0;           // 0..1
  let running = false;
  let rafId = null;
  let lastTick = 0;
  let simStartTime = 0;

  // tuneable parameters
  const MAX_AUTO = 0.9;       // maximum simulated value before real done
  const SPEED = 0.0025;       // per ms increment baseline
  const MIN_SHOW_MS = 120;    // min visible time to avoid flash

  function rafLoop(ts){
    if (!running) return;
    if (!lastTick) lastTick = ts;
    const dt = ts - lastTick;
    lastTick = ts;

    // incremental simulation that slows as it approaches MAX_AUTO
    const ease = (1 - progress / MAX_AUTO);
    progress += dt * SPEED * Math.max(0.2, ease);
    if (progress > MAX_AUTO) progress = MAX_AUTO;

    render();
    rafId = requestAnimationFrame(rafLoop);
  }

  function render(){
    loader.style.opacity = '1';
    loader.style.width = Math.max(0.5, progress * 100) + '%';
  }

  function start() {
    // if already running, keep as-is
    if (running) return;
    running = true;
    progress = Math.max(progress, 0.02);
    lastTick = 0;
    simStartTime = performance.now();
    loader.classList.remove('hide');
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(rafLoop);
  }

  function setProgress(realFraction) {
    // realFraction: 0..1 (we cap to MAX_AUTO to leave 100% for done())
    progress = Math.min(realFraction, MAX_AUTO);
    render();
  }

  function done() {
    if (!running && progress === 0) return;
    // ensure min visible time
    const elapsed = performance.now() - simStartTime;
    const wait = Math.max(0, MIN_SHOW_MS - elapsed);

    setTimeout(() => {
      // jump to 100%
      progress = 1;
      render();
      // fade out shortly after
      setTimeout(() => {
        loader.style.opacity = '0';
        // shrink to 0 to prepare for next start
        setTimeout(() => {
          loader.style.width = '0%';
          progress = 0;
          running = false;
          cancelAnimationFrame(rafId);
          lastTick = 0;
        }, 260);
      }, 120);
    }, wait);
  }

  // ---------- link interception (internal navigation) ----------
  document.addEventListener('click', function(e){
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    // ignore external links, anchors, targets
    if (href.startsWith('http') && new URL(href).origin !== location.origin) return;
    if (a.target && a.target !== '_self') return;
    if (href.startsWith('#')) return;
    // start loader and let browser navigate
    start();
  });

  // beforeunload fallback (some browsers may not fire if navigation is instant)
  window.addEventListener('beforeunload', function(){ start(); });

  // finish on load/pageshow (works for full reload and back/forward)
  window.addEventListener('pageshow', function(){ done(); });
  window.addEventListener('load', function(){ done(); });

  // ---------- SPA support (patch pushState/replaceState) ----------
  (function(){
    const origPush = history.pushState;
    history.pushState = function(...args){
      const res = origPush.apply(this, args);
      // custom event so router-aware apps can call done()
      window.dispatchEvent(new CustomEvent('spa:navigate'));
      start();
      return res;
    };
    const origReplace = history.replaceState;
    history.replaceState = function(...args){
      const res = origReplace.apply(this, args);
      window.dispatchEvent(new CustomEvent('spa:navigate'));
      // optional: don't always start for replaceState (but we do)
      start();
      return res;
    };
    window.addEventListener('popstate', function(){ start(); });
    // consumer of SPA should call done() when view finished rendering
    window.addEventListener('spa:done', done);
  })();

  // ---------- Fetch wrapper with streaming progress estimation ----------
  // Wrap window.fetch to attempt to measure response body progress when Content-Length is available
  if (window.fetch) {
    const nativeFetch = window.fetch;
    window.fetch = async function(input, init){
      start();
      try {
        const resp = await nativeFetch(input, init);
        // attempt streaming read if body supported and content-length present
        try {
          const cl = resp.headers.get('content-length');
          if (resp.body && cl && Number(cl) > 0) {
            const total = Number(cl);
            const reader = resp.body.getReader();
            let loaded = 0;
            // create a new Response from stream so original consumer still works:
            const stream = new ReadableStream({
              start(controller){
                function pump(){
                  reader.read().then(({done, value}) => {
                    if (done) {
                      controller.close();
                      return;
                    }
                    loaded += value.byteLength || value.length || 0;
                    // update progress (cap to MAX_AUTO)
                    setProgress(Math.min(loaded / total, MAX_AUTO));
                    controller.enqueue(value);
                    pump();
                  }).catch(err => {
                    controller.error(err);
                  });
                }
                pump();
              }
            });
            const newResp = new Response(stream, { headers: resp.headers, status: resp.status, statusText: resp.statusText });
            // when stream finishes, schedule done()
            newResp.clone().arrayBuffer().then(()=> setTimeout(done, 60)).catch(()=> setTimeout(done, 60));
            return newResp;
          } else {
            // cannot stream progress; finish when full response consumed by consumer or fallback to done after a small delay
            resp.clone().arrayBuffer().then(()=> done()).catch(()=> { /* ignore */ });
            return resp;
          }
        } catch (err) {
          // if anything fails, just return response and rely on load/pageshow
          resp.clone().arrayBuffer().then(()=> done()).catch(()=>{});
          return resp;
        }
      } catch (err) {
        // error -> hide loader
        done();
        throw err;
      }
    };
  }

  // ---------- XHR progress hooking (best-effort) ----------
  (function(){
    const X = window.XMLHttpRequest;
    if (!X) return;
    const origOpen = X.prototype.open;
    const origSend = X.prototype.send;
    X.prototype.open = function(method, url, async, user, pass){
      this._urlForProgress = url;
      return origOpen.apply(this, arguments);
    };
    X.prototype.send = function(body){
      // attach progress if possible
      try {
        this.addEventListener('loadstart', () => { start(); });
        this.addEventListener('progress', (ev) => {
          if (ev.lengthComputable) {
            setProgress(Math.min(ev.loaded / ev.total, MAX_AUTO));
          } else {
            // if not computable, nudge simulation
            progress = Math.max(progress, 0.12);
          }
        });
        this.addEventListener('load', () => { done(); });
        this.addEventListener('error', () => { done(); });
        this.addEventListener('abort', () => { done(); });
      } catch (e) { /* ignore */ }
      return origSend.apply(this, arguments);
    };
  })();

  // ---------- utility: allow manual start/done and set color ----------
  window.__TopLoader = {
    start,
    done,
    setColor: (hex) => { loader.style.background = hex; loader.style.boxShadow = '0 0 8px '+hex+'66'; },
    setProgressFraction: (f) => { setProgress(Math.max(0, Math.min(1, f))); }
  };

  // hide initially
  loader.classList.add('hide');

})();

NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

  // start saat user klik link internal (simple)
  document.addEventListener('click', function(e){
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    // hanya untuk link internal yang non-hash dan non-target-blank
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') && new URL(href).origin !== location.origin) return;
    if (a.target === '_blank') return;
    // mulai progress dan biarkan navigasi terjadi
    NProgress.start();
  });

  // pastikan NProgress selesai saat halaman baru sudah siap
  window.addEventListener('pageshow', function() { NProgress.done(); });
  window.addEventListener('load', function() { NProgress.done(); });
  window.addEventListener('beforeunload', function() { NProgress.start(); });