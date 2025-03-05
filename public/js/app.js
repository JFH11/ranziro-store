document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [

            // data untuk mobile legends

            {
                namaAkun: 'Z a z a.',
                stock: 'STOCK012',
                imgAkun: 'zaza_1.webp',
                hargaAkun: 'Rp. 55.000',
                status: 'Ready ✅',
                destinasi: '12'
            },

            {
                namaAkun: 'Fox.',
                stock: 'STOCK011',
                imgAkun: 'fox_1.webp',
                hargaAkun: 'Rp. 450.000',
                status: 'Sold Out ❌',
                destinasi: '11'
            },

            {
                namaAkun: 'Noxx Sigma Skibdi.',
                stock: 'STOCK010',
                imgAkun: 'noxx-sigma_1.webp',
                hargaAkun: 'Rp. 300.000',
                status: 'Sold Out ❌',
                destinasi: '10'
            },

            {
                namaAkun: 'MINAK JINGGO',
                stock: 'STOCK09',
                imgAkun: 'minak_1.webp',
                hargaAkun: 'Rp. 105.000',
                status: 'Sold Out ❌',
                destinasi: '09'
            },

            {
                namaAkun: 'padliw :p',
                stock: 'STOCK08',
                imgAkun: 'padliw_1.webp',
                hargaAkun: 'Rp. 230.000',
                status: 'Sold Out ❌',
                destinasi: '08'
            },

            {
                namaAkun: 'Biasa-aja',
                stock: 'STOCK07',
                imgAkun: 'biasa-aja_1.webp',
                hargaAkun: 'Rp. 190.000',
                status: 'Sold Out ❌',
                destinasi: '07'
            },

            {
                namaAkun: '(づ≧▽≦)づ',
                stock: 'STOCK06',
                imgAkun: '(づ≧▽≦)づ_1.webp',
                hargaAkun: 'Rp. 185.000',
                status: 'Sold Out ❌',
                destinasi: '06'
            },

            {
                namaAkun: 'syzuro`',
                stock: 'STOCK05',
                imgAkun: 'syzuro_1.webp',
                hargaAkun: 'Rp. 130.000',
                status: 'Sold Out ❌',
                destinasi: '05'
            },

            {
                namaAkun: 'YouKnowDeath_x',
                stock: 'STOCK04',
                imgAkun: 'YouKnowDeath_1.webp',
                hargaAkun: 'Rp. 50.000',
                status: 'Sold Out ❌',
                destinasi: '04'
            },

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
                hargaAkun: 'Rp. 145.000',
                status: 'Sold Out ❌',
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
                item.stock.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    }));
});