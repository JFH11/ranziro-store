
document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [

            // data untuk mobile legends
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