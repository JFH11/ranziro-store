{
// stock
stock: '',
// nama_akun
namaAkun: '',
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
},
},

<!-- app.js -->
{
    namaAkun: '',
    stock: '',
    imgAkun: '',
    hargaAkun: '',
    status: '',
    destinasi: ''
},

<!-- status untuk app.js -->
Ready ✅
Sold Out ❌

          Container Search
    <div class="container-search">
      <div class="container-search-1">
        <!-- Looping Data yang Sudah Difilter -->
        <template x-for="game in filteredData" :key="game.namaAkun">
          <a
            :href="`/akun?nama=${encodeURIComponent(game.namaAkun)}`"
            class="search-links"
          >
            <img :src="`img-webp/${game.imgAkun}`" alt="" class="img-search" />
            <div class="container-search-2">
              <h3 x-text="game.stock"></h3>
              <h3 x-text="game.namaAkun" class="search-akun"></h3>
              <p x-text="game.hargaAkun"></p>
            </div>
          </a>
        </template>
      </div>
    </div>
