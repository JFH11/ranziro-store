
document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [

            // data untuk mobile legends

            {
                namaAkun: 'ぎ mitsuyaツ',
                imgAkun: 'zenix-store-1.png',
                owner: '@Zenix Store',
            },

            {
                namaAkun: 'Its making you cry',
                imgAkun: 'galih-store-1.png',
                owner: '@Galih Store',
            },

            {
                namaAkun: 'Dicdikz.',
                imgAkun: 'brott-store-1.png',
                owner: '@Brott Store',
            },

            {
                namaAkun: 'zèphyr',
                imgAkun: 'REX-STORE-1.png',
                owner: '@REX STORE',
            },

            {
                namaAkun: 'Priaidaman',
                imgAkun: 'boje-1.jpg',
                owner: '@store_jejeee',
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