// global.js
function createPanel({ trigger, container, closeBtn, openFn, closeFn, focusOnOpenSelector }) {
  if (!trigger && !closeBtn && !container) {
    throw new Error('createPanel: setidaknya salah satu dari trigger/closeBtn/container harus disediakan');
  }

  let _isOpen = false;

  // helper: kembalikan alpine component instance jika ada
  function getAlpineComponent() {
    try {
      const root = document.querySelector('[x-data]');
      if (!root) return null;
      // beberapa versi menyimpan instance di __x dengan property $data
      if (root.__x && root.__x.$data) return root.__x;
      if (root.__x) return root.__x;
    } catch (e) { /* ignore */ }
    return null;
  }

  // helper: bersihkan input DOM & fire input/change event supaya x-model sinkron
  function clearInputDOM(selector) {
    if (!selector) return;
    const el = document.querySelector(selector);
    if (!el) return;
    el.value = '';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const api = {
    get isOpen() { return _isOpen; },

    open() {
      if (_isOpen) return;

      if (typeof openFn === 'function') openFn(container);
      _isOpen = true;

      // sinkron ke Alpine (component)
      const comp = getAlpineComponent();
      if (comp && comp.$data) {
        // jika panel ini fokus ke '.input-search' treat sebagai search panel
        if (typeof focusOnOpenSelector === 'string' && focusOnOpenSelector.includes('input-search')) {
          comp.$data.tempSearchQuery = '';   // kosongkan input panel agar menampilkan daftar
          comp.$data.typing = false;
          comp.$data.searchOpen = true;
          comp.$data.visibleCount = 10;      // pastikan pagination kembali awal
        } else if (container && container.classList && container.classList.contains('container-search')) {
          comp.$data.searchOpen = true;
        }
      }

      if (api.onOpen) api.onOpen();
      if (api.onStateChange) api.onStateChange();

      // fokus DOM (delay kecil supaya transform visual selesai dulu)
      if (focusOnOpenSelector) {
        setTimeout(() => {
          const el = document.querySelector(focusOnOpenSelector);
          if (el) el.focus();
        }, 10);
      }
    },

    close() {
      if (!_isOpen) return;

      if (typeof closeFn === 'function') closeFn(container);
      _isOpen = false;

      // sinkron ke Alpine (component)
      const comp = getAlpineComponent();
      if (comp && comp.$data) {
        if (typeof focusOnOpenSelector === 'string' && focusOnOpenSelector.includes('input-search')) {
          // reset lengkap supaya saat buka lagi tampil semua data
          comp.$data.tempSearchQuery = '';
          comp.$data.typing = false;
          comp.$data.searchOpen = false;
          comp.$data.visibleCount = 10;
        } else if (container && container.classList && container.classList.contains('container-search')) {
          comp.$data.searchOpen = false;
        }
      }

      if (api.onClose) api.onClose();
      if (api.onStateChange) api.onStateChange();

      // cadangan: bersihkan DOM input dan dispatch event supaya Alpine sinkron
      if (focusOnOpenSelector) {
        setTimeout(() => {
          clearInputDOM(focusOnOpenSelector);
        }, 10);
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
  };

  if (trigger) trigger.addEventListener('click', api.toggle);
  if (closeBtn) closeBtn.addEventListener('click', api.close);

  return api;
}

// -------------------------
// element references
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
  closeBtn: null, // kalau ada close button tambahkan di sini
  openFn: (el) => { if (el) el.style.transform = 'scale(1)'; },
  closeFn: (el) => { if (el) el.style.transform = 'scale(0)'; },
  focusOnOpenSelector: '.input-search'
});

// -------------------------
// mutual-exclusion: jika satu buka, tutup yang lain
// -------------------------
sidebarPanel.onOpen = () => {
  if (searchPanel.isOpen) searchPanel.close(); // close search (ini akan reset search state)
};
searchPanel.onOpen = () => {
  if (sidebarPanel.isOpen) sidebarPanel.close(); // close sidebar
};

// -------------------------
// update main state (blur + pointer)
// -------------------------
function updateMainState() {
  if (!main) return;
  if (sidebarPanel.isOpen || searchPanel.isOpen) {
    main.style.pointerEvents = 'none';
    main.style.filter = 'blur(10px)';
  } else {
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

document.addEventListener('click', (e) => {
  const t = e.target;
  // close sidebar if click outside sidebar and outside menu button
  if (sidebarPanel.isOpen && sidebarEl && menu) {
    if (!sidebarEl.contains(t) && !menu.contains(t)) sidebarPanel.close();
  }
  // close search if click outside search container and outside search button
  if (searchPanel.isOpen && containerSearch && btnSearch) {
    if (!containerSearch.contains(t) && !btnSearch.contains(t)) searchPanel.close();
  }
});

// ====== Tahun otomatis ======
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== Logika terakhir diakses ======
const lastAccessedEl = document.getElementById("last-accessed");
const lastAccessed = localStorage.getItem("lastAccessed");

if (lastAccessedEl) {
  if (lastAccessed) {
    lastAccessedEl.textContent = lastAccessed;
  } else {
    lastAccessedEl.textContent = "Belum pernah diakses sebelumnya";
  }
}

// simpan waktu sekarang
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
