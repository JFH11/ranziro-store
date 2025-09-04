document.addEventListener('alpine:init', () => {
  Alpine.data('main', () => ({
    // state
    searchQuery: '',
    tempSearchQuery: '',
    selectedFilter: 'all',
    selectedFilterSearch: 'all',
    selectedSort: 'terbaru',
    selectedSortSearch: 'terbaru',

    // separate visible counts for main & search
    visibleCountMain: 10,
    visibleCountSearch: 10,
    increment: 10,

    sortOpen: false,
    sortOpenSmall: false,
    searchOpen: false,

    typing: false,
    typingTimer: null,
    typingDebounceMs: 500,

    // data (example) - you can replace/extend this
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

    // --- caching helpers (memoization) ---
    _cachedFilteredKey: null,
    _cachedFilteredResult: null,
    _cachedSearchKey: null,
    _cachedSearchResult: null,

    /* labels */
    get selectedSortLabel() {
      if (this.selectedSort === 'terbaru') return 'Terbaru';
      if (this.selectedSort === 'terlama') return 'Terlama';
      if (this.selectedSort === 'a-z') return 'A - Z';
      return this.selectedSort;
    },

    get selectedSortLabelSmall() {
      if (this.selectedSortSearch === 'terbaru') return 'Terbaru';
      if (this.selectedSortSearch === 'terlama') return 'Terlama';
      if (this.selectedSortSearch === 'a-z') return 'A - Z';
      return this.selectedSortSearch;
    },

    /* MAIN actions */
    setFilter(filter) {
      this.selectedFilter = filter;
      this.visibleCountMain = 10;
      // invalidate cache
      this._cachedFilteredKey = null;
      this._cachedFilteredResult = null;
    },
    setSort(sort) {
      this.selectedSort = sort;
      this.visibleCountMain = 10;
      this.sortOpenSmall = false;
      this.sortOpen = false;
      // invalidate cache
      this._cachedFilteredKey = null;
      this._cachedFilteredResult = null;
    },

    /* SEARCH panel actions (separate) */
    setFilterSearch(filter) {
      this.selectedFilterSearch = filter;
      this.visibleCountSearch = 10;
      // invalidate search cache
      this._cachedSearchKey = null;
      this._cachedSearchResult = null;
    },
    setSortSearch(sort) {
      this.selectedSortSearch = sort;
      this.visibleCountSearch = 10;
      this.sortOpenSmall = false;
      // invalidate search cache
      this._cachedSearchKey = null;
      this._cachedSearchResult = null;
    },

    /* separate load more functions */
    loadMoreMain() { this.visibleCountMain += this.increment; },
    loadMoreSearch() { this.visibleCountSearch += this.increment; },

    onSearchFocus() {
      this.searchOpen = true;
      // don't touch searchQuery (main)
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

    /* full results for search (memoized) */
    get filteredDataForSearchAll() {
      const q = (this.tempSearchQuery || '').toLowerCase().trim();
      const key = `${q}|${this.selectedFilterSearch}|${this.selectedSortSearch}`;

      if (this._cachedSearchKey === key && this._cachedSearchResult) return this._cachedSearchResult;

      // start from preprocessed data (contains _nameLower)
      let results = this.data;

      // filter status
      if (this.selectedFilterSearch === 'available') results = results.filter(i => i.status === true);
      else if (this.selectedFilterSearch === 'sold') results = results.filter(i => i.status === false);

      // search
      if (q && q.length > 0) {
        results = results.filter(item => item._nameLower.includes(q));
      }

      // sorting
      if (this.selectedSortSearch === 'terlama') results = results.slice().reverse();
      else if (this.selectedSortSearch === 'a-z') results = results.slice().sort((a, b) => a._nameLower.localeCompare(b._nameLower));
      // 'terbaru' => keep original order

      this._cachedSearchKey = key;
      this._cachedSearchResult = results;
      return results;
    },

    /* results shown in the panel (sliced when panel open & query empty) */
    get filteredDataForSearch() {
      const q = (this.tempSearchQuery || '').toLowerCase().trim();

      if (this.searchOpen && q === '') {
        return this.filteredDataForSearchAll.slice(0, this.visibleCountSearch);
      }

      // when there's a query, keep showing full results
      return this.filteredDataForSearchAll;
    },

    /* MAIN filtered data (memoized) */
    get filteredData() {
      const q = (this.searchQuery || '').toLowerCase().trim();
      const key = `${q}|${this.selectedFilter}|${this.selectedSort}`;

      if (this._cachedFilteredKey === key && this._cachedFilteredResult) {
        return this._cachedFilteredResult;
      }

      let results = this.data;

      if (q) {
        results = results.filter(item => item._nameLower.includes(q));
      }

      if (this.selectedFilter === 'available') results = results.filter(i => i.status === true);
      else if (this.selectedFilter === 'sold') results = results.filter(i => i.status === false);

      if (this.selectedSort === 'terlama') results = results.slice().reverse();
      else if (this.selectedSort === 'a-z') results = results.slice().sort((a, b) => a._nameLower.localeCompare(b._nameLower));
      // 'terbaru' => keep original order

      this._cachedFilteredKey = key;
      this._cachedFilteredResult = results;
      return results;
    },

    get visibleData() { return this.filteredData.slice(0, this.visibleCountMain); },
    get filteredLength() { return this.filteredData.length; },

    init() {
      // Preprocess names to lowercase once to avoid repeated toLowerCase calls
      this.data = this.data.map(item => ({ ...item, _nameLower: (item.namaAkun || '').toLowerCase() }));

      // watchers to invalidate cache when reactive params change (covers direct x-model changes too)
      if (this.$watch) {
        this.$watch('searchQuery', () => {
          this._cachedFilteredKey = null;
          this._cachedFilteredResult = null;
        });
        this.$watch('tempSearchQuery', () => {
          this._cachedSearchKey = null;
          this._cachedSearchResult = null;
        });
        this.$watch('selectedFilter', () => {
          this._cachedFilteredKey = null;
          this._cachedFilteredResult = null;
        });
        this.$watch('selectedSort', () => {
          this._cachedFilteredKey = null;
          this._cachedFilteredResult = null;
        });
        this.$watch('selectedFilterSearch', () => {
          this._cachedSearchKey = null;
          this._cachedSearchResult = null;
        });
        this.$watch('selectedSortSearch', () => {
          this._cachedSearchKey = null;
          this._cachedSearchResult = null;
        });
      }

      // removed auto-load IntersectionObserver to avoid 'auto Tampilkan lebih banyak on scroll' behavior.
      // Kalau suatu saat mau auto-load kembali, bisa diaktifkan dengan flag terpisah.
    },

  }));
});
