document.addEventListener('alpine:init', () => {
  Alpine.data('main', () => ({
    searchQuery: '',
    data: [
      { namaAkun: 'NEIL?!!', imgAkun: 'neil_1.webp', hargaAkun: 'Rp 500.000', status: true },
      { namaAkun: 'inselucyraan.', imgAkun: 'inselucyraan_sold.webp', hargaAkun: 'Rp 155.000', status: false },
      { namaAkun: 'DAM V2', imgAkun: 'damv2_sold.webp', hargaAkun: 'Rp 130.000', status: false },
      { namaAkun: 'AK. hoshino', imgAkun: 'akhoshino_1.webp', hargaAkun: 'Rp 50.000', status: true },
      { namaAkun: 'DARK SISTEM', imgAkun: 'darksistem_sold.webp', hargaAkun: 'Rp 45.000', status: false },
      { namaAkun: 'Z a z a.', imgAkun: 'zaza_1.webp', hargaAkun: 'Rp 55.000', status: true },
      { namaAkun: 'Fox.', imgAkun: 'fox_sold.webp', hargaAkun: 'Rp 450.000', status: false },
      { namaAkun: 'Noxx Sigma Skibdi.', imgAkun: 'nox-sigma_sold.webp', hargaAkun: 'Rp 300.000', status: false },
      { namaAkun: 'MINAK JINGGO', imgAkun: 'minakjinggo_sold.webp', hargaAkun: 'Rp 105.000', status: false },
      { namaAkun: 'padliw :p', imgAkun: 'padliw_sold.webp', hargaAkun: 'Rp 230.000', status: false },
      { namaAkun: 'Biasa-aja', imgAkun: 'biasa-aja_sold.webp', hargaAkun: 'Rp 190.000', status: false },
      { namaAkun: '(づ≧▽≦)づ', imgAkun: '(づ≧▽≦)づ_sold.webp', hargaAkun: 'Rp 185.000', status: false },
      { namaAkun: 'syzuro`', imgAkun: 'syzuro_sold.webp', hargaAkun: 'Rp 130.000', status: false },
      { namaAkun: 'YouKnowDeath_x', imgAkun: 'youknowdeath_sold.webp', hargaAkun: 'Rp 50.000', status: false },
      { namaAkun: 'SkyeBoyz', imgAkun: 'skyeboyz_sold.webp', hargaAkun: 'Rp 170.000', status: false },
      { namaAkun: 'ShuraTzy.', imgAkun: 'shuratzy_sold.webp', hargaAkun: 'Rp 145.000', status: false },
      { namaAkun: 'Junkagenoshi.', imgAkun: 'junkagenoshi_sold.webp', hargaAkun: 'Rp 140.000', status: false },
    ],

    /* jika nanti ingin mencari, filteredData pakai namaAkun */
    get filteredData() {
      const q = (this.searchQuery || '').toLowerCase().trim();
      if (!q) return this.data;
      return this.data.filter(item => item.namaAkun.toLowerCase().includes(q));
    }
  }));
});
