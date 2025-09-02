document.addEventListener('alpine:init', () => {
  Alpine.data('main', () => ({
    // state
    searchQuery: '',
    selectedFilter: 'all',
    selectedSort: 'terbaru',
    visibleCount: 10,
    increment: 10,
    sortOpen: false,
    sortOpenSmall: false,
    searchOpen: false,

    // typing debounce
    typing: false,
    typingTimer: null,
    typingDebounceMs: 500,

    data: [
      { namaAkun: 'Ranziro', imgAkun: 'ranziro.webp', hargaAkun: 'Rp 315.000', status: true },
      { namaAkun: 'NEIL?!!', imgAkun: 'neil_1.webp', hargaAkun: 'Rp 350.000', status: false },
      { namaAkun: 'inselucyraan.', imgAkun: 'inselucyraan_sold.webp', hargaAkun: 'Rp 155.000', status: false },
      { namaAkun: 'DAM V2', imgAkun: 'damv2_sold.webp', hargaAkun: 'Rp 130.000', status: false },
      { namaAkun: 'AK. hoshino', imgAkun: 'akhoshino_1.webp', hargaAkun: 'Rp 45.000', status: false },
      { namaAkun: 'DARK SISTEM', imgAkun: 'darksistem_sold.webp', hargaAkun: 'Rp 45.000', status: false },
      { namaAkun: 'Z a z a.', imgAkun: 'zaza_1.webp', hargaAkun: 'Rp 35.000', status: false },
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
      { namaAkun: 'Jun Kagenoshi', imgAkun: 'junkagenoshi_sold.webp', hargaAkun: 'Rp 140.000', status: false },
    ],

    /* labels */
    get selectedSortLabel() {
      if (this.selectedSort === 'terbaru') return 'Terbaru';
      if (this.selectedSort === 'terlama') return 'Terlama';
      if (this.selectedSort === 'a-z') return 'A - Z';
      return this.selectedSort;
    },
    get selectedSortLabelSmall() { return this.selectedSortLabel; },

    /* actions */
    setFilter(filter) {
      this.selectedFilter = filter;
      this.visibleCount = 10;
    },
    setSort(sort) {
      this.selectedSort = sort;
      this.visibleCount = 10;
      this.sortOpenSmall = false;
      this.sortOpen = false;
    },
    loadMore() { this.visibleCount += this.increment; },

    onSearchFocus() {
      this.searchOpen = true;
    },

    onTyping() {
      if (!this.searchOpen) this.searchOpen = true;
      this.typing = true;
      if (this.typingTimer) clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.typing = false;
        this.typingTimer = null;
      }, this.typingDebounceMs);
    },

    /* 
      IMPORTANT CHANGE: filteredDataForSearch 
      - Jika panel search terbuka dan input KOSONG -> kembalikan array KOSONG (tidak menampilkan semua)
      - Jika user mengetik, gunakan filter + sort seperti biasa
    */
    get filteredDataForSearch() {
  const q = (this.searchQuery || '').toLowerCase().trim();

  // Kalau panel terbuka & input KOSONG -> kembalikan sliced (batasi DOM)
  if (this.searchOpen && q === '') {
    let results = this.data.slice(); // semua data dulu sebagai source

    if (this.selectedFilter === 'available') results = results.filter(i => i.status === true);
    else if (this.selectedFilter === 'sold') results = results.filter(i => i.status === false);

    if (this.selectedSort === 'terlama') results = results.slice().reverse();
    if (this.selectedSort === 'a-z') results = results.slice().sort((a,b) => a.namaAkun.toLowerCase().localeCompare(b.namaAkun.toLowerCase()));

    // BATASI render sesuai visibleCount
    return results.slice(0, this.visibleCount);
  }

  // normal search (ada query)
  let results = this.data.filter(item => {
    if (!q) return true;
    return item.namaAkun.toLowerCase().includes(q);
  });

  if (this.selectedFilter === 'available') results = results.filter(i => i.status === true);
  else if (this.selectedFilter === 'sold') results = results.filter(i => i.status === false);

  if (this.selectedSort === 'terbaru') return results;
  if (this.selectedSort === 'terlama') return results.slice().reverse();
  if (this.selectedSort === 'a-z') return results.slice().sort((a,b) => a.namaAkun.toLowerCase().localeCompare(b.namaAkun.toLowerCase()));
  return results;
},


    /* filteredData untuk grid utama tetap seperti sebelumnya */
    get filteredData() {
      const q = (this.searchQuery || '').toLowerCase().trim();
      let results = this.data.filter(item => {
        if (!q) return true;
        return item.namaAkun.toLowerCase().includes(q);
      });

      if (this.selectedFilter === 'available') results = results.filter(i => i.status === true);
      else if (this.selectedFilter === 'sold') results = results.filter(i => i.status === false);

      if (this.selectedSort === 'terbaru') return results;
      if (this.selectedSort === 'terlama') return results.slice().reverse();
      if (this.selectedSort === 'a-z') return results.slice().sort((a,b) => a.namaAkun.toLowerCase().localeCompare(b.namaAkun.toLowerCase()));
      return results;
    },

    get visibleData() { return this.filteredData.slice(0, this.visibleCount); },
    get filteredLength() { return this.filteredData.length; },

    init() {
  // intersection observer untuk auto-load (hanya jika browser support)
  this.$nextTick(() => {
    try {
      const listRoot = document.querySelector('.container-search-1');
      const sentinel = this.$refs.searchSentinel;
      if (listRoot && sentinel && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              // hanya load lebih ketika panel terbuka dan masih ada sisa
              if (this.searchOpen && this.filteredLength > this.visibleCount) {
                this.loadMore();
              }
            }
          });
        }, { root: listRoot, threshold: 0.8 });
        io.observe(sentinel);
      }
    } catch (err) { /* silent fail */ }
  });
},

  }));
});
