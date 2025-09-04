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
