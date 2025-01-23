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

const trigger = document.querySelector('.trigger-gallery-2');
const gallery = document.querySelector('.gallery-2');
let isGalleryOpen = false;

trigger.addEventListener('click', () => {
    if (!isGalleryOpen) {
        gallery.style.display = 'block';
        isGalleryOpen = true;
    } else {
        gallery.style.display = 'none';
        isGalleryOpen = false;
    }
});