// global.js (optimized)

// Create panel with improved Alpine component lookup, class toggles and cleanup support
function createPanel({ trigger, container, closeBtn, openFn, closeFn, focusOnOpenSelector }) {
  if (!trigger && !closeBtn && !container) {
    throw new Error('createPanel: setidaknya salah satu dari trigger/closeBtn/container harus disediakan');
  }

  let _isOpen = false;
  let _destroyed = false;

  // cache root alpine element once (fallback)
  let _cachedAlpineRoot = null;
  function getCachedAlpineRoot() {
    if (_cachedAlpineRoot) return _cachedAlpineRoot;
    _cachedAlpineRoot = document.querySelector('[x-data]') || null;
    return _cachedAlpineRoot;
  }

  // Efficient Alpine component finder:
  // - try container (most specific)
  // - then trigger
  // - then cached root
  // returns the __x object (Alpine instance) or null
  function getAlpineComponent() {
    try {
      const tryEls = [container, trigger];
      for (let el of tryEls) {
        if (!el) continue;
        // if element itself has __x (when x-data is on same node)
        if (el.__x) return el.__x;
        // search upwards for nearest parent with __x
        let p = el.parentElement;
        while (p) {
          if (p.__x) return p.__x;
          p = p.parentElement;
        }
      }

      // fallback to cached root
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

    open() {
      if (_isOpen || _destroyed) return;
      if (typeof openFn === 'function') openFn(container);
      _isOpen = true;

      const comp = getAlpineComponent();
      if (comp && comp.$data) {
        if (typeof focusOnOpenSelector === 'string' && focusOnOpenSelector.includes('input-search')) {
          // precise search panel reset
          try {
            comp.$data.tempSearchQuery = '';
            comp.$data.typing = false;
            comp.$data.searchOpen = true;
          } catch (e) { /* ignore */ }
          // reset pagination
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

      // bersihkan DOM input secara aman
      if (focusOnOpenSelector) {
        setTimeout(() => clearInputDOM(focusOnOpenSelector), 10);
      }
    },

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
      if (trigger) trigger.removeEventListener('click', api.toggle);
      if (closeBtn) closeBtn.removeEventListener('click', api.close);
      api.onOpen = null;
      api.onClose = null;
      api.onStateChange = null;
    }
  };

  if (trigger) trigger.addEventListener('click', api.toggle);
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
  focusOnOpenSelector: '.input-search'
});

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
  // prefer class toggle (more performant than multiple style writes)
  if (isAnyOpen) {
    main.classList.add('ui-panel-open');
    // fallback for usages that do not have class CSS
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
// keydown is cheap; keep single listener
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
    // if click is outside both the sidebar and the menu -> close
    if (!sidebarEl.contains(t) && !menu.contains(t)) {
      sidebarPanel.close();
      // no need to continue if closed
      return;
    }
  }

  // Search close: only compute contains if search open
  if (searchPanel.isOpen && containerSearch && btnSearch) {
    if (!containerSearch.contains(t) && !btnSearch.contains(t)) {
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
