document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        data: [

            // data untuk mobile legends

            {
                namaAkun: 'Yaampun Yisanz.',
                imgAkun: 'yaampun-mizan-1.webp',
                owner: '@store_jejeee',
                desc: 'RUBY ASPIRANT, LIGHTBORN TG, CC NATA, LUCKYBOX URANUS, EPIC JUNGLER"'
            },

            {
                namaAkun: 'skyy.',
                imgAkun: 'skyy-1.webp',
                owner: '@store_jejeee',
                desc: 'SKIN 400+, 2 LEGEND FRANCO GS, CC YSS BENED NATA, KOF GS GUIN KARINA, TF ALDOUS ROGER, SANRIO CHANGE FLORYN, STARWARS KIMMY, SL TAHUNAN KARRIE HAYA KAGURA, LUCKYBOX 9, CHAMPION LANCE HARITH'
            },

            {
                namaAkun: 'anomali',
                imgAkun: 'anomali-1.webp',
                owner: '@store_jejeee',
                desc: 'OTW 2 LEGEND, LEGEND GS+KOF, ASPIRANT ANGELA, CC NATA, LUCKYBOX SABER EUDORA HAYA FREYA ALPHA ZHASK SELENA GUIN URANUS HANABI, SL TAHUNAN GORD'
            },

            {
                namaAkun: 'F25',
                imgAkun: 'f25-1.webp',
                owner: '@store_jejeee',
                desc: 'dikit lagi dapet skin legend, skin otw 200, zodiac lance selena, luckybox lance kagura, estes, sl tahunan lesley, cc nata, lightborn alu, skin 25+',
            },

            {
                namaAkun: 'Daxx.',
                imgAkun: 'account-name-daxx.-1.webp',
                owner: '@Zxy Store',
                desc: '-tt angap aja alkoss, -dev bersih, colector badang, zodiac helcurt, Claude prime,Claude m6,lucbox estes,star Lesley,lb tigreal,venom dyrhot,venom gusion,change lunar,star vaxier,star Vale,star Nolan,venom grock,dbgon Ling,dbagon kimiy,saber,dbagon valir,epic Nana,epix grock, Blazing aldos,venom hanabi,epic balmond,epic gs,epic lunox,Rafael,sumer haya,msc lemord,CC nata dll, Sl car biasa 1, Magic core 91'
            },

            {
                namaAkun: 'ぎ mitsuyaツ',
                imgAkun: 'zenix-store-1.webp',
                owner: '@Zenix Store',
                desc: 'ex glory, emblem max, dev bersih, monsep, min kgm plat'
            },

            {
                namaAkun: `It's making you cry`,
                imgAkun: 'galih-store-1.webp',
                owner: '@Galih Store',
                desc: 'Monsep allkos nominus freece, skin 402, 2legend, 3collector, kof gs, fanny layla aspirant, yin aot, hanabi vessel, starwars alucard'
            },

            {
                namaAkun: 'Dicdikz.',
                imgAkun: 'brott-store-1.webp',
                owner: '@Brott Store',
                desc: ''
            },

            {
                namaAkun: 'zèphyr',
                imgAkun: 'REX-STORE-1.webp',
                owner: '@REX STORE',
                desc: 'Checker, Safe 2 Bulan++, Owner Out, Device Bersih, No Kontak GM'
            },

            {
                namaAkun: 'Priaidaman',
                imgAkun: 'boje-1.webp',
                owner: '@store_jejeee',
                desc: 'WR GACOR, SKIN 500+, 3 LEGEND FRANCO ALU GS, RECALL TASTAS, CC LING GRANGER VALIR BADANG NATA, AAMOON VESSEL, ANSPIRANT LAYLA ANGELA CHANGE, TRANSFORMER ROGER GRANGER POPOL, PRIME BEATRIX YZ, SANRIO CHANGE FLORYN, KOF DYROT PAQUITO'
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