document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [

            // data untuk mobile legends

            {
                namaAkun: 'anomali',
                imgAkun: 'anomali-1.webp',
                owner: '@store_jejeee',
            },

            {
                namaAkun: 'F25',
                imgAkun: 'f25-1.webp',
                owner: '@store_jejeee',
            },

            {
                namaAkun: 'Daxx.',
                imgAkun: 'account-name-daxx.-1.webp',
                owner: '@Zxy Store',
            },

            {
                namaAkun: 'ぎ mitsuyaツ',
                imgAkun: 'zenix-store-1.webp',
                owner: '@Zenix Store',
            },

            {
                namaAkun: 'Its making you cry',
                imgAkun: 'galih-store-1.webp',
                owner: '@Galih Store',
            },

            {
                namaAkun: 'Dicdikz.',
                imgAkun: 'brott-store-1.webp',
                owner: '@Brott Store',
            },

            {
                namaAkun: 'zèphyr',
                imgAkun: 'REX-STORE-1.webp',
                owner: '@REX STORE',
            },

            {
                namaAkun: 'Priaidaman',
                imgAkun: 'boje-1.webp',
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