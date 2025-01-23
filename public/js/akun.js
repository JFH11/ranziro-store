const urlParams = new URLSearchParams(window.location.search);
const accountName = decodeURIComponent(urlParams.get('nama'));

const data = [
    // data untuk mobile legends
{
// nama_akun
namaAkun: 'ranziro',
// @_usernameig
owner: '',
// link_ig
ownerLink: '',
// daftar_gambar
gallery: ['', '', ''],
// harga
price: '',
// link_rekber
waRekber: '', // Nomor WhatsApp Rekber
// link_penjual
waPenjual: '', // Nomor WhatsApp Penjual
// detail_akun
detail: {
    // jaminan = yes/no
    warranty: '',
    // deskripsi = spek akun
    deskripsi: '',
    // id_akun
    idAkun: '',
    // rank_tertinggi
    rankTertinggi: '',
    // total_skin
    totalSkin: '',
    // total_winrate
    totalWinrate: '',
    // total_pertandingan
    totalPertandingan: '',
    // total_magic_core
    totalMagicCore: '',
    // level_emblem
    levelEmblem: '',
    // bukti_top_up
    buktiTopUp: '',
    // akun_pribadi
    akunPribadi: '',
    // bind_akun = monsep = akun koonton terkait, monkos = akun moonton kosong, allkos = akun semua kosong/tidk terkait
    bindAkun: '',
    // keterangan_reff
    keteranganReff: '',
},
},
];

const account = data.find(item => item.namaAkun === accountName);

if (account) {
document.getElementById('account-name').textContent = account.namaAkun;
document.getElementById('account-price').textContent = account.price;

// Tambahkan tautan pemilik akun
const ownerElement = document.createElement('a');
ownerElement.href = account.ownerLink;
ownerElement.textContent = account.owner;
ownerElement.classList.add('account-owner');
ownerElement.target = '_blank';
document.getElementById('account-owner').replaceWith(ownerElement);

// Tambahkan tautan WhatsApp tanpa teks
const rekberLink = document.querySelector('.btn-rekber');
const ownerLink = document.querySelector('.btn-owner');
// target
rekberLink.target = '_blank';
ownerLink.target = '_blank';
rekberLink.href = `https://wa.me/${account.waRekber}`;
ownerLink.href = `https://wa.me/${account.waPenjual}`;

// Tampilkan detail
const detail = account.detail;
if (detail) {
document.querySelector('.warranty').textContent = `Warranty: ${detail.warranty}`;
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
document.querySelector('.bind-akun').textContent = `Bind Akun: ${detail.bindAkun}`;
document.querySelector('.keterangan-reff').textContent = `Keterangan Reff: ${detail.keteranganReff}`;
}

    const sliderImages = document.getElementById('slider-images');
    account.gallery.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.classList.add('slide');
        sliderImages.appendChild(imgElement);
    });

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
    <h1 class="not-found">Akun Tidak Ditemukan</h1>
    <a href="/semua_akun" class="back-home">Kembali <i class="fa-solid fa-arrow-right"></i></a>
    </div>`;
}
