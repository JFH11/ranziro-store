document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [

            // data untuk mobile legends

            {
                namaAkun: 'NEIL?!!',
                stock: 'STOCK017',
                imgAkun: 'neil_1.webp',
                hargaAkun: 'Rp 500.000',
                status: 'Ready ✅',
                destinasi: '17'
            },

            {
                namaAkun: 'inselucyraan.',
                stock: 'STOCK016',
                imgAkun: 'inselucyraan_sold.webp',
                hargaAkun: 'Rp 155.000',
                status: 'Sold Out ❌',
                destinasi: '16'
            },

            {
                namaAkun: 'DAM V2',
                stock: 'STOCK015',
                imgAkun: 'damv2_sold.webp',
                hargaAkun: 'Rp 130.000',
                status: 'Sold out ❌',
                destinasi: '15'
            }
,
            {
                namaAkun: 'AK. hoshino',
                stock: 'STOCK014',
                imgAkun: 'akhoshino_1.webp',
                hargaAkun: 'Rp 50.000',
                status: 'Ready ✅',
                destinasi: '14'
            },

            {
                namaAkun: 'DARK SISTEM',
                stock: 'STOCK013',
                imgAkun: 'darksistem_sold.webp',
                hargaAkun: 'Rp 45.000',
                status: 'Sold Out ❌',
                destinasi: '13'
            },

            {
                namaAkun: 'Z a z a.',
                stock: 'STOCK012',
                imgAkun: 'zaza_1.webp',
                hargaAkun: 'Rp 55.000',
                status: 'Ready ✅',
                destinasi: '12'
            },

            {
                namaAkun: 'Fox.',
                stock: 'STOCK011',
                imgAkun: 'fox_sold.webp',
                hargaAkun: 'Rp 450.000',
                status: 'Sold Out ❌',
                destinasi: '11'
            },

            {
                namaAkun: 'Noxx Sigma Skibdi.',
                stock: 'STOCK010',
                imgAkun: 'nox-sigma_sold.webp',
                hargaAkun: 'Rp 300.000',
                status: 'Sold Out ❌',
                destinasi: '10'
            },

            {
                namaAkun: 'MINAK JINGGO',
                stock: 'STOCK09',
                imgAkun: 'minakjinggo_sold.webp',
                hargaAkun: 'Rp 105.000',
                status: 'Sold Out ❌',
                destinasi: '09'
            },

            {
                namaAkun: 'padliw :p',
                stock: 'STOCK08',
                imgAkun: 'padliw_sold.webp',
                hargaAkun: 'Rp 230.000',
                status: 'Sold Out ❌',
                destinasi: '08'
            },

            {
                namaAkun: 'Biasa-aja',
                stock: 'STOCK07',
                imgAkun: 'biasa-aja_sold.webp',
                hargaAkun: 'Rp 190.000',
                status: 'Sold Out ❌',
                destinasi: '07'
            },

            {
                namaAkun: '(づ≧▽≦)づ',
                stock: 'STOCK06',
                imgAkun: '(づ≧▽≦)づ_sold.webp',
                hargaAkun: 'Rp 185.000',
                status: 'Sold Out ❌',
                destinasi: '06'
            },

            {
                namaAkun: 'syzuro`',
                stock: 'STOCK05',
                imgAkun: 'syzuro_sold.webp',
                hargaAkun: 'Rp 130.000',
                status: 'Sold Out ❌',
                destinasi: '05'
            },

            {
                namaAkun: 'YouKnowDeath_x',
                stock: 'STOCK04',
                imgAkun: 'youknowdeath_sold.webp',
                hargaAkun: 'Rp 50.000',
                status: 'Sold Out ❌',
                destinasi: '04'
            },

            {
                namaAkun: 'SkyeBoyz',
                stock: 'STOCK03',
                imgAkun: 'skyeboyz_sold.webp',
                hargaAkun: 'Rp 170.000',
                status: 'Sold Out ❌',
                destinasi: '03'
            },

            {
                namaAkun: 'ShuraTzy.',
                stock: 'STOCK02',
                imgAkun: 'shuratzy_sold.webp',
                hargaAkun: 'Rp 145.000',
                status: 'Sold Out ❌',
                destinasi: '02'
            },

            {
                namaAkun: 'Junkagenoshi.',
                stock: 'STOCK01',
                imgAkun: 'junkagenoshi_sold.webp',
                hargaAkun: 'Rp 140.000',
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