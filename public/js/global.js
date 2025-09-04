// glwoblswsmsw.min.js (optimized)

// Create panel with improved Alpine component lookup, class toggles and cleanup support
function createPanel({ trigger, container, closeBtn, openFn, closeFn, focusOnOpenSelector, triggerAlwaysOpen = false }) {
  if (!trigger && !closeBtn && !container) {
    throw new Error('createPanel: setidaknya salah satu dari trigger/closeBtn/container harus disediakan');
  }

  let _isOpen = false;
  let _destroyed = false;

  // stored handler so we can remove it later
  let _triggerHandler = null;

  // cache root alpine element once (fallback)
  let _cachedAlpineRoot = null;
  function getCachedAlpineRoot() {
    if (_cachedAlpineRoot) return _cachedAlpineRoot;
    _cachedAlpineRoot = document.querySelector('[x-data]') || null;
    return _cachedAlpineRoot;
  }

  // Efficient Alpine component finder:
  function getAlpineComponent() {
    try {
      const tryEls = [container, trigger];
      for (let el of tryEls) {
        if (!el) continue;
        if (el.__x) return el.__x;
        let p = el.parentElement;
        while (p) {
          if (p.__x) return p.__x;
          p = p.parentElement;
        }
      }
      const root = getCachedAlpineRoot();
      if (root && root.__x) return root.__x;
    } catch (err) {
      // ignore
    }
    return null;
  }

  // helper to clear and sync input DOM (only when needed)
  function clearInputDOM(selector) {
    if (!selector) return;
    const el = document.querySelector(selector);
    if (!el) return;
    el.value = '';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // small utility to safely set or reset visibleCountSearch if present
  function resetVisibleCountSearchOnComp(comp) {
    if (!comp || !comp.$data) return;
    if (typeof comp.$data.visibleCountSearch !== 'undefined') {
      try { comp.$data.visibleCountSearch = 10; } catch (e) { /* ignore */ }
    }
  }

  const api = {
    get isOpen() { return _isOpen; },

    // open(preserveInput = false) -> kalau true: jangan reset tempSearchQuery ketika fokus ke input-search
    open(preserveInput = false) {
      if (_isOpen || _destroyed) return;
      if (typeof openFn === 'function') openFn(container);
      _isOpen = true;

      const comp = getAlpineComponent();
      if (comp && comp.$data) {
        if (typeof focusOnOpenSelector === 'string' && focusOnOpenSelector.includes('input-search')) {
          // precise search panel reset: reset hanya kalau preserveInput === false
          try {
            if (!preserveInput) comp.$data.tempSearchQuery = '';
            comp.$data.typing = false;
            comp.$data.searchOpen = true;
          } catch (e) { /* ignore */ }
          resetVisibleCountSearchOnComp(comp);
        } else if (container && container.classList && container.classList.contains('container-search')) {
          try { comp.$data.searchOpen = true; } catch (e) { }
          resetVisibleCountSearchOnComp(comp);
        }
      }

      if (api.onOpen) api.onOpen();
      if (api.onStateChange) api.onStateChange();

      // Fokus sedikit tunda supaya animasi CSS tidak terganggu
      if (focusOnOpenSelector) {
        setTimeout(() => {
          const el = document.querySelector(focusOnOpenSelector);
          if (el) el.focus();
        }, 10);
      }
    },

    close() {
      if (!_isOpen || _destroyed) return;
      if (typeof closeFn === 'function') closeFn(container);
      _isOpen = false;

      const comp = getAlpineComponent();
      if (comp && comp.$data) {
        if (typeof focusOnOpenSelector === 'string' && focusOnOpenSelector.includes('input-search')) {
          try {
            comp.$data.tempSearchQuery = '';
            comp.$data.typing = false;
            comp.$data.searchOpen = false;
          } catch (e) { /* ignore */ }
          resetVisibleCountSearchOnComp(comp);
        } else if (container && container.classList && container.classList.contains('container-search')) {
          try { comp.$data.searchOpen = false; } catch (e) { }
          resetVisibleCountSearchOnComp(comp);
        }
      }

      if (api.onClose) api.onClose();
      if (api.onStateChange) api.onStateChange();

      // bersihkan DOM input secara aman (hanya saat menutup)
      if (focusOnOpenSelector) {
        setTimeout(() => clearInputDOM(focusOnOpenSelector), 10);
      }
    },

    // toggle tetap panggil open() tanpa preserveInput (default)
    toggle() {
      if (_isOpen) api.close();
      else api.open();
    },

    // hooks assigned from outside
    onOpen: null,
    onClose: null,
    onStateChange: null,

    // cleanup untuk SPA / testability
    destroy() {
      if (_destroyed) return;
      _destroyed = true;
      if (trigger && _triggerHandler) {
        try { trigger.removeEventListener('click', _triggerHandler); } catch (e) {}
      }
      if (closeBtn) closeBtn.removeEventListener('click', api.close);
      api.onOpen = null;
      api.onClose = null;
      api.onStateChange = null;
    }
  };

  // Attach trigger listener via wrapper so we can control preserveInput and remove later
  if (trigger) {
    if (triggerAlwaysOpen) {
      _triggerHandler = function (e) {
        // default open from trigger: do NOT preserve input (explicit preserve only via other controls)
        api.open(false);
      };
    } else {
      _triggerHandler = function (e) {
        api.toggle();
      };
    }
    trigger.addEventListener('click', _triggerHandler);
  }
  if (closeBtn) closeBtn.addEventListener('click', api.close);

  return api;
}

// -------------------------
// element references (cached once)
// -------------------------
const menu = document.querySelector('.btn-menu');
const sidebarEl = document.querySelector('.sidebar');
const closeMenu = document.querySelector('.btn-close');

const btnSearch = document.querySelector('.btn-search');
// ini yg baru: tombol/elemen yang kamu sebut untuk "mempertahankan" container-search saat diklik
const btnSearchInput = document.querySelector('#input-search');
const containerSearch = document.querySelector('.container-search');
const inputSearch = document.querySelector('.input-search');

const main = document.querySelector('main');

// -------------------------
// create panels with custom open/close behaviour
// -------------------------
const sidebarPanel = createPanel({
  trigger: menu,
  container: sidebarEl,
  closeBtn: closeMenu,
  openFn: (el) => { if (el) el.style.left = '0'; },
  closeFn: (el) => { if (el) el.style.left = '-300px'; }
});

const searchPanel = createPanel({
  trigger: btnSearch,
  container: containerSearch,
  closeBtn: null,
  openFn: (el) => { if (el) el.style.transform = 'scale(1)'; },
  closeFn: (el) => { if (el) el.style.transform = 'scale(0)'; },
  focusOnOpenSelector: '.input-search',
  // klik btn-search akan selalu memanggil open() (tidak toggle)
  triggerAlwaysOpen: true
});

// -------------------------
// jika btnSearchInput disediakan: kliknya akan membuka panel namun *mempertahankan* isi input
// (open dengan preserveInput = true). Juga hentikan propagasi supaya tidak kena cek klik-di-luar.
if (btnSearchInput) {
  btnSearchInput.addEventListener('click', (e) => {
    // jika belum terbuka -> buka tapi jangan reset isi input (preserveInput = true)
    if (!searchPanel.isOpen) {
      searchPanel.open(true);
    }
    // jika sudah terbuka, biarkan saja (tidak menutup / mereset)
    // hentikan bubbling supaya document click handler tidak menutup panel bila btnSearchInput berada di luar container.
    e.stopPropagation();
  });
}

// -------------------------
// mutual-exclusion: jika satu buka, tutup yang lain
// -------------------------
sidebarPanel.onOpen = () => {
  if (searchPanel.isOpen) searchPanel.close();
};
searchPanel.onOpen = () => {
  if (sidebarPanel.isOpen) sidebarPanel.close();
};

// -------------------------
// update main state (batched via class toggle jika mungkin)
// -------------------------
function updateMainState() {
  if (!main) return;
  const isAnyOpen = sidebarPanel.isOpen || searchPanel.isOpen;
  if (isAnyOpen) {
    main.classList.add('ui-panel-open');
    main.style.pointerEvents = 'none';
    main.style.filter = 'blur(10px)';
  } else {
    main.classList.remove('ui-panel-open');
    main.style.pointerEvents = 'auto';
    main.style.filter = 'blur(0)';
  }
}
sidebarPanel.onStateChange = updateMainState;
searchPanel.onStateChange = updateMainState;

// -------------------------
// global handlers: Escape & klik di luar untuk menutup
// -------------------------
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (sidebarPanel.isOpen) sidebarPanel.close();
    if (searchPanel.isOpen) searchPanel.close();
  }
});

// click: early exit and minimal contains checks
document.addEventListener('click', (e) => {
  const t = e.target;

  // Sidebar close: only compute contains if sidebar open
  if (sidebarPanel.isOpen && sidebarEl && menu) {
    if (!sidebarEl.contains(t) && !menu.contains(t)) {
      sidebarPanel.close();
      return;
    }
  }

  // Search close: only compute contains if search open
  // NOTE: include btnSearch and btnSearchInput in "allowed" targets so klik pada kedua elemen tidak menutup panel
  if (searchPanel.isOpen && containerSearch) {
    const clickedInsideContainer = containerSearch.contains(t);
    const clickedSearchTrigger = btnSearch && btnSearch.contains(t);
    const clickedSearchInput = btnSearchInput && btnSearchInput.contains(t);
    if (!clickedInsideContainer && !clickedSearchTrigger && !clickedSearchInput) {
      searchPanel.close();
      return;
    }
  }
});

// ====== Tahun otomatis ======
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== Logika terakhir diakses ======
const lastAccessedEl = document.getElementById("last-accessed");
const lastAccessed = localStorage.getItem("lastAccessed");

if (lastAccessedEl) {
  lastAccessedEl.textContent = lastAccessed || "Belum pernah diakses sebelumnya";
}

// simpan waktu sekarang (IIFE)
(function saveNow() {
  const now = new Date();
  const formatted = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  localStorage.setItem("lastAccessed", formatted);
})();
