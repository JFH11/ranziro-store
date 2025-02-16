document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [

            // data untuk mobile legends

            {
                namaAkun: 'STOCK02',
                imgAkun: 'shuratzy_1.webp',
                hargaAkun: 'Rp. 175.000',
                status: 'Ready ✅'
            },

            {
                namaAkun: 'STOCK01',
                imgAkun: 'junkagenoshi_1.webp',
                hargaAkun: 'Rp. 140.000',
                status: 'Sold Out ❌'
            },
        ],

        searchQuery: '',

        get filteredData() {
            if (!this.searchQuery) {
                return this.data;
            }
            return this.data.filter(item =>
                item.namaAkun.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    }));
});