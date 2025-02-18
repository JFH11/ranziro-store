document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [

            // data untuk mobile legends

            {
                namaAkun: 'SkyeBoyz',
                stock: 'STOCK03',
                imgAkun: 'skyeboyz_1.webp',
                hargaAkun: 'Rp. 170.000',
                status: 'Sold Out ❌',
                destinasi: '03'
            },

            {
                namaAkun: 'ShuraTzy.',
                stock: 'STOCK02',
                imgAkun: 'shuratzy_1.webp',
                hargaAkun: 'Rp. 175.000',
                status: 'Ready ✅',
                destinasi: '02'
            },

            {
                namaAkun: 'Junkagenoshi.',
                stock: 'STOCK01',
                imgAkun: 'junkagenoshi_1.webp',
                hargaAkun: 'Rp. 140.000',
                status: 'Sold Out ❌',
                destinasi: '01'
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