const menu = document.querySelector('.btn-menu');
const sidebar = document.querySelector('.sidebar');
const closeMenu = document.querySelector('.btn-close');
let main = document.querySelector('main');
let isSidebarOpen = false;

menu.addEventListener('click', () => {
    // jika sidebar belum terbuka
    if (!isSidebarOpen) {
        // membuka sidebar
        sidebar.style.left = '0';
        main.style.pointerEvents = 'none';
        main.style.filter = 'blur(5px)';
        isSidebarOpen = true;
    } else {
        // menutup sidebar
        sidebar.style.left = '-300px';
        main.style.pointerEvents = 'auto';
        main.style.filter = 'blur(0)';
        isSidebarOpen = false;
    }
});

closeMenu.addEventListener('click', () => {
    sidebar.style.left = '-300px';
    main.style.pointerEvents = 'auto';
    main.style.filter = 'blur(0)';
    isSidebarOpen = false;
});

const btnSearch = document.querySelector('.btn-search');
const containerSearch = document.querySelector('.container-search');
const mainSearch = document.querySelector('main');
// boolean
let isSearchOpen = false;

btnSearch.addEventListener('click', () => {
    // jika search belum terbuka
    if (!isSearchOpen) {
        containerSearch.style.transform = 'scale(1)';
        mainSearch.style.pointerEvents = 'none';
        mainSearch.style.filter = 'blur(5px)';
        isSearchOpen = true;
    } else {
        containerSearch.style.transform = 'scale(0)';
        mainSearch.style.pointerEvents = 'auto';
        mainSearch.style.filter = 'blur(0)';
        isSearchOpen = false;
        // menghapus isi dari inputan
        document.querySelector('.input-search').value = '';
    }
});

// loader
function showLoader(event) {
    event.preventDefault(); // Mencegah navigasi langsung
    let loader = document.getElementById("container-loader");
    loader.style.display = "grid"; // Tampilkan loader

    // Ambil URL tujuan dari atribut href elemen <a>
    let targetUrl = event.currentTarget.href;

    setTimeout(function () {
        window.location.href = targetUrl; // Redirect setelah 2 detik
    }, 2000);
}
