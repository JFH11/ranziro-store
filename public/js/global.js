// -------------------------
// Generic panel factory
// -------------------------
function createPanel({ trigger, container, closeBtn, openFn, closeFn, focusOnOpenSelector }) {
  if (!trigger && !closeBtn && !container) {
    throw new Error('createPanel: setidaknya salah satu dari trigger/closeBtn/container harus disediakan');
  }

  let _isOpen = false;

  const api = {
    get isOpen() { return _isOpen; },

    open() {
      if (_isOpen) return;
      if (typeof openFn === 'function') openFn(container);
      _isOpen = true;
      if (api.onOpen) api.onOpen();
      if (api.onStateChange) api.onStateChange();
      if (focusOnOpenSelector) {
        const el = document.querySelector(focusOnOpenSelector);
        if (el) el.focus();
      }
    },

    close() {
      if (!_isOpen) return;
      if (typeof closeFn === 'function') closeFn(container);
      _isOpen = false;
      if (api.onClose) api.onClose();
      if (api.onStateChange) api.onStateChange();
      if (focusOnOpenSelector) {
        const el = document.querySelector(focusOnOpenSelector);
        if (el) el.value = '';
      }
    },

    toggle() {
      if (_isOpen) api.close();
      else api.open();
    },

    // hooks assigned from outside
    onOpen: null,         // called after open()
    onClose: null,        // called after close()
    onStateChange: null,  // called after open/close (useful to update UI common state)
  };

  // event listeners
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
  // tutup search kalo terbuka
  if (searchPanel.isOpen) searchPanel.close();
};
searchPanel.onOpen = () => {
  // tutup sidebar kalo terbuka
  if (sidebarPanel.isOpen) sidebarPanel.close();
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
  document.getElementById("year").textContent = new Date().getFullYear();

  // ====== Logika terakhir diakses ======
  const lastAccessedEl = document.getElementById("last-accessed");
  const lastAccessed = localStorage.getItem("lastAccessed");

  if (lastAccessed) {
    lastAccessedEl.textContent = lastAccessed;
  } else {
    lastAccessedEl.textContent = "Belum pernah diakses sebelumnya";
  }

  // simpan waktu sekarang
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
