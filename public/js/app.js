document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [
            {
                namaAkun: 'jejezoldyck',
                imgAkun: 'jeje.png',
                owner: 'jeje',
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
