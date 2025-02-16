document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [

            // data untuk mobile legends

            {
                stock: 'STOCK01',
                namaAkun: 'ShuraTzy.',
                imgAkun: 'shuratzy_1.webp',
                hargaAkun: 'Rp. 175.000',
                status: 'Ready ✅'
            },

            {
                stock: 'STOCK02',
                namaAkun: 'Jun Kagenoshi',
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