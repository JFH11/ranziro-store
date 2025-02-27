const urlParams = new URLSearchParams(window.location.search);
const accountName = decodeURIComponent(urlParams.get('nama'));

const data = [
    // data untuk mobile legends

    // {
    //     // stock
    //     stock: 'STOCK02',
    //     // nama_akun
    //     namaAkun: 'ShuraTzy.',
    //     // @_usernameig
    //     owner: '@ranziro_store',
    //     // link_ig
    //     ownerLink: 'https://www.instagram.com/ranziro_store/',
    //     // daftar_gambar
    //     gallery: ['shuratzy_1.webp', 'shuratzy_2.webp', 'shuratzy_3.webp', 'shuratzy_4.webp', 'shuratzy_5.webp', 'shuratzy_6.webp', 'shuratzy_7.webp', 'shuratzy_8.webp'],
    //     // harga
    //     price: 'Rp. 175.000',
    //     // link_rekber
    //     waRekber: '6285697188236', // Nomor WhatsApp Rekber
    //     // link_penjual
    //     detail: {
    //         // jaminan = yes/no
    //         warranty: 'Yes',
    //         // deskripsi = spek akun
    //         deskripsi: 'Monsep allkos take segmail fresh -kgm, Layla asprnt, yz m5, LC Uranus, LB harith Fanny, gord epic',
    //         // id_akun
    //         idAkun: 'SS',
    //         // rank_tertinggi
    //         rankTertinggi: 'SS',
    //         // total_skin
    //         totalSkin: 'SS',
    //         // total_winrate
    //         totalWinrate: 'SS',
    //         // total_pertandingan
    //         totalPertandingan: 'SS',
    //         // total_magic_core
    //         totalMagicCore: 'SS',
    //         // level_emblem
    //         levelEmblem: 'SS',
    //         // bukti_top_up
    //         buktiTopUp: 'Tidak Ada',
    //         // akun_pribadi
    //         akunPribadi: 'Beli',
    //         // bind_akun = monsep = akun koonton terkait, monkos = akun moonton kosong, allkos = akun semua kosong/tidk terkait
    //         bindAkun: 'Montoon/Monsep Allkos',
    //     },
    //     },
        
];

const account = data.find(item => item.namaAkun === accountName);

if (account) {
    document.getElementById('account-name').textContent = account.namaAkun;
    document.getElementById('account-price').textContent = account.price;
    document.getElementById('account-stock').textContent = account.stock;

    // Tambahkan tautan pemilik akun
    const ownerElement = document.createElement('a');
    ownerElement.href = account.ownerLink;
    ownerElement.textContent = account.owner;
    ownerElement.classList.add('account-owner');
    ownerElement.target = '_blank';
    document.getElementById('account-owner').replaceWith(ownerElement);

    // Tambahkan tautan WhatsApp tanpa teks
    const rekberLink = document.querySelector('.btn-rekber');
    // target
    rekberLink.target = '_blank';
    rekberLink.rel = 'noopener noreferrer';
    rekberLink.href = `https://wa.me/${account.waRekber}`;

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
    }

    const sliderImages = document.getElementById('slider-images');
    account.gallery.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = `img-webp/${img}`;
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
    <h1 class="not-found">Akun Sudah Tidak Tersedia</h1>
    <a href="/mlbb" class="back-home">Kembali <i class="fa-solid fa-arrow-right"></i></a>
    </div>
    
    <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>`;
}