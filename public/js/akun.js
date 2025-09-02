const urlParams = new URLSearchParams(window.location.search);
const accountName = decodeURIComponent(urlParams.get('nama'));

const data = [
    {
        namaAkun: 'NEIL?!!',
        owner: '@ranziro_store',
        ownerLink: 'https://www.instagram.com/ranziro_store/',
        gallery: ['neil_1.webp','neil_2.webp','neil_3.webp','neil_4.webp','neil_5.webp','neil_6.webp','neil_7.webp','neil_8.webp','neil_9.webp','neil_10.webp','neil_11.webp','neil_12.webp','neil_13.webp','neil_14.webp'],
        price: 'Rp 500.000',
        waRekber: '6285863146541',
        status: false, // <<< true = available (overlay HILANG), false = sold (overlay MUNCUL)
        detail: {
            deskripsi: 'LEG GS, KOF AURORA KARINA DYROTH, ASPIRANT ANGELA CHANGE, PRIME YZ, CC GS NATA, LCBX HAYA CHOU GUIN, ANNUAL KARRIE LESLEY, DLL.',
            idAkun: 'SS',
            rankTertinggi: 'SS',
            totalSkin: 'SS',
            totalWinrate: 'SS',
            totalPertandingan: 'SS',
            totalMagicCore: 'SS',
            levelEmblem: 'SS',
            buktiTopUp: 'TIDAK ADA',
            akunPribadi: 'BELI',
            log: 'Moonton',
            bindAkun: 'Allkos (take segmail fresh)'
        },
    },

    {
        namaAkun: 'AK. hoshino',
        owner: '@ranziro_store',
        ownerLink: 'https://www.instagram.com/ranziro_store/',
        gallery: ['akhoshino_1.webp','akhoshino_2.webp','akhoshino_3.webp','akhoshino_4.webp','akhoshino_5.webp','akhoshino_6.webp','akhoshino_7.webp','akhoshino_8.webp','akhoshino_9.webp'],
        price: 'Rp 50.000',
        waRekber: '6285863146541',
        status: false, // contoh: sold -> overlay akan muncul
        detail: {
            deskripsi: 'LB FANNY ALU, DT LING, VALENTINE CLOD, EPIC KHALED MOSKOV ROGER, DLL. MONSEP ALLKOS TAKE SEGMAIL FRESH -KGM',
            idAkun: 'SS',
            rankTertinggi: 'SS',
            totalSkin: 'SS',
            totalWinrate: 'SS',
            totalPertandingan: 'SS',
            totalMagicCore: 'SS',
            levelEmblem: 'SS',
            buktiTopUp: 'TIDAK ADA',
            akunPribadi: 'BELI',
            log: 'Moonton',
            bindAkun: 'Allkos (take segmail fresh)'
        },
    },

    {
        namaAkun: 'Z a z a.',
        owner: '@ranziro_store',
        ownerLink: 'https://www.instagram.com/ranziro_store/',
        gallery: ['zaza_1.webp','zaza_2.webp','zaza_3.webp','zaza_4.webp','zaza_5.webp','zaza_6.webp','zaza_7.webp','zaza_8.webp','zaza_9.webp','zaza_10.webp','zaza_11.webp','zaza_12.webp'],
        price: 'Rp 55.000',
        waRekber: '6285863146541',
        status: false,
        detail: {
            deskripsi: 'AKUN CEWE COCOK UNTUK USER MAGE, AKUN POLOSAN, FULLSPEK SS',
            idAkun: 'SS',
            rankTertinggi: 'SS',
            totalSkin: 'SS',
            totalWinrate: 'SS',
            totalPertandingan: 'SS',
            totalMagicCore: 'SS',
            levelEmblem: 'SS',
            buktiTopUp: 'TIDAK ADA',
            akunPribadi: 'BELI',
            log: 'Moonton',
            bindAkun: 'Plat (take segmail fresh)'
        },
    },
];

const account = data.find(item => item.namaAkun === accountName);

if (account) {
    document.getElementById('account-name').textContent = account.namaAkun;
    document.getElementById('account-price').textContent = account.price;

    // Owner link
    const ownerElement = document.createElement('a');
    ownerElement.href = account.ownerLink;
    ownerElement.textContent = account.owner;
    ownerElement.classList.add('account-owner');
    ownerElement.target = '_blank';
    document.getElementById('account-owner').replaceWith(ownerElement);

    // Rekber link (pakai nomor dari data)
    const rekberLink = document.querySelector('.btn-rekber');
    rekberLink.target = '_blank';
    rekberLink.rel = 'noopener noreferrer';
    rekberLink.href = `https://wa.me/${account.waRekber}?text=_*Halo%20bang%20saya%20ingin%20menanyakan%20ketersediaan%20akun%20dari%20${encodeURIComponent(account.namaAkun)}*_%0A%0A> Nama%20akun%20%3A%20${encodeURIComponent(account.namaAkun)}%0A> Harga%20%3A%20${encodeURIComponent(account.price)}%0A%0AKira-kira%20masih%20ada%20stocknya%20bang%20%3F`;

    // Tampilkan detail
    const detail = account.detail;
    if (detail) {
        document.querySelector('.deskripsi-akun').textContent = `Deskripsi: ${detail.deskripsi}`;
        document.querySelector('.id-akun').textContent = `ID Akun: ${detail.idAkun}`;
        document.querySelector('.rank-tertinggi').textContent = `Rank Tertinggi: ${detail.rankTertinggi}`;
        document.querySelector('.total-skin').textContent = `Total Skin: ${detail.totalSkin}`;
        document.querySelector('.total-winrate').textContent = `Total Winrate: ${detail.totalWinrate}`;
        document.querySelector('.total-pertandingan').textContent = `Total Pertandingan: ${detail.totalPertandingan}`;
        document.querySelector('.total-magic-core').textContent = `Total Magic Core: ${detail.totalMagicCore}`;
        document.querySelector('.level-emblem').textContent = `Level Emblem: ${detail.levelEmblem}`;
        document.querySelector('.bukti-top-up').textContent = `Bukti Top Up Pertama: ${detail.buktiTopUp}`;
        document.querySelector('.akun-pribadi').textContent = `Akun Pribadi/Beli: ${detail.akunPribadi}`;
        document.querySelector('.akun-log').textContent = `Log: ${detail.log}`;
        document.querySelector('.bind-akun').textContent = `Bind Akun: ${detail.bindAkun}`;
    }

    // Slider images
    const sliderImages = document.getElementById('slider-images');
    account.gallery.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = `img-webp/${img}`;
        imgElement.classList.add('slide');
        imgElement.loading = 'lazy';
        sliderImages.appendChild(imgElement);
    });

    // ---- NEW: toggle sold overlay berdasarkan account.status ----
    const containerSold = document.querySelector('.container-sold-slider');
    if (containerSold) {
        // true => overlay HILANG (available), false => overlay MUNCUL (sold)
        if (account.status === true) {
            containerSold.style.display = 'none';
        } else {
            // pastikan tampil dengan layout sama seperti HTML inline sebelumnya
            containerSold.style.display = 'grid';
            containerSold.style.placeItems = 'center';
        }
    }
    // -------------------------------------------------------------

    // Slider Logic
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const sliderWidth = document.querySelector('.slider').offsetWidth;

    function updateSliderPosition() {
        const offset = -slideIndex * sliderWidth;
        document.querySelector('.slider-images').style.transform = `translateX(${offset}px)`;
    }

    function prevSlide() {
        slideIndex = (slideIndex > 0) ? slideIndex - 1 : slides.length - 1;
        updateSliderPosition();
    }

    function nextSlide() {
        slideIndex = (slideIndex < slides.length - 1) ? slideIndex + 1 : 0;
        updateSliderPosition();
    }

    // Initial position
    updateSliderPosition();
} else {
    document.body.innerHTML = `
    <div class="not-found-container">
      <h1 class="not-found">Akun Sudah Tidak Tersedia</h1>
      <a href="/mobile-legends" class="back-home">Kembali <i class="fa-solid fa-arrow-right"></i></a>
    </div>
    <div class="area">
      <ul class="circles">
        <li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li>
      </ul>
    </div>`;
}

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
