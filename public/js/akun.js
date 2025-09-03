// akwn203m4xdk.min.js (final, siap pakai)
(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rawName = urlParams.get('nama');
    const accountName = rawName ? decodeURIComponent(rawName) : null;

    const data = [
        {
            namaAkun: 'Ranziro',
            id: '183746742',
            gallery: ['ranziro.webp', 'ranziro_2.webp'],
            price: 'Rp 315.000',
            waRekber: '6285863146541',
            status: true,
            detail: {
                deskripsi: 'Collector yss, prime beatrix, tf roger, annual haya kagura, luckybox selena alpha alice odette, recall gacor" skin banyak, cocok utk push rank.',
                rankTertinggi: 'Glory *74',
                totalSkin: '326',
                totalWinrate: 'ss',
                totalPertandingan: '13k+',
                totalMagicCore: 'ss',
                levelEmblem: 'Max',
                buktiTopUp: 'Tidak ada',
                akunPribadi: 'Beli',
                log: 'Moonton (take segmail/change email)',
                bindAkun: 'Moonton & Platform'
            },
        },
        {
            namaAkun: 'NEIL?!!',
            id: '99999999',
            gallery: ['neil_1.webp', 'neil_2.webp', 'neil_3.webp', 'neil_4.webp', 'neil_5.webp', 'neil_6.webp', 'neil_7.webp', 'neil_8.webp', 'neil_9.webp', 'neil_10.webp', 'neil_11.webp', 'neil_12.webp', 'neil_13.webp', 'neil_14.webp'],
            price: 'Rp 350.000',
            waRekber: '6285863146541',
            status: false,
            detail: {
                deskripsi: 'LEG GS, KOF AURORA KARINA DYROTH, ASPIRANT ANGELA CHANGE, PRIME YZ, CC GS NATA, LCBX HAYA CHOU GUIN, ANNUAL KARRIE LESLEY, DLL.',
                rankTertinggi: 'SS',
                totalSkin: 'SS',
                totalWinrate: 'SS',
                totalPertandingan: 'SS',
                totalMagicCore: 'SS',
                levelEmblem: 'SS',
                buktiTopUp: 'TIDAK ADA',
                akunPribadi: 'BELI',
                log: 'Moonton (take segmail fresh)',
                bindAkun: 'Moonton'
            },
        },
        {
            namaAkun: 'AK. hoshino',
            id: '9999999',
            gallery: ['akhoshino_1.webp', 'akhoshino_2.webp', 'akhoshino_3.webp', 'akhoshino_4.webp', 'akhoshino_5.webp', 'akhoshino_6.webp', 'akhoshino_7.webp', 'akhoshino_8.webp', 'akhoshino_9.webp'],
            price: 'Rp 50.000',
            waRekber: '6285863146541',
            status: false,
            detail: {
                deskripsi: 'LB FANNY ALU, DT LING, VALENTINE CLOD, EPIC KHALED MOSKOV ROGER, DLL. MONSEP ALLKOS TAKE SEGMAIL FRESH -KGM',
                rankTertinggi: 'SS',
                totalSkin: 'SS',
                totalWinrate: 'SS',
                totalPertandingan: 'SS',
                totalMagicCore: 'SS',
                levelEmblem: 'SS',
                buktiTopUp: 'TIDAK ADA',
                akunPribadi: 'BELI',
                log: 'Moonton (take segmail fresh)',
                bindAkun: 'Moonton'
            },
        },
        {
            namaAkun: 'Z a z a.',
            id: '99999999',
            gallery: ['zaza_1.webp', 'zaza_2.webp', 'zaza_3.webp', 'zaza_4.webp', 'zaza_5.webp', 'zaza_6.webp', 'zaza_7.webp', 'zaza_8.webp', 'zaza_9.webp', 'zaza_10.webp', 'zaza_11.webp', 'zaza_12.webp'],
            price: 'Rp 55.000',
            waRekber: '6285863146541',
            status: false,
            detail: {
                deskripsi: 'AKUN CEWE COCOK UNTUK USER MAGE, AKUN POLOSAN, FULLSPEK SS',
                rankTertinggi: 'SS',
                totalSkin: 'SS',
                totalWinrate: 'SS',
                totalPertandingan: 'SS',
                totalMagicCore: 'SS',
                levelEmblem: 'SS',
                buktiTopUp: 'TIDAK ADA',
                akunPribadi: 'BELI',
                log: 'Moonton',
                bindAkun: 'Moonton & Platform'
            },
        },
    ];

    // Map untuk lookup cepat
    const dataMap = new Map(data.map(item => [item.namaAkun, item]));
    const account = accountName ? dataMap.get(accountName) : null;

    // helper safe query
    const $ = (sel, root = document) => (root && root.querySelector ? root.querySelector(sel) : null);

    if (!account) {
        document.body.innerHTML = `
      <div class="not-found-container">
        <h1 class="not-found">Akun Sudah Tidak Tersedia</h1>
        <a href="/mobile-legends" class="back-home">Kembali <i class="fa-solid fa-arrow-right"></i></a>
      </div>
      <div class="area">
        <ul class="circles">${'<li></li>'.repeat(10)}</ul>
      </div>`;
        return;
    }

    // populate simple fields (safe)
    const elName = document.getElementById('account-name');
    const elPrice = document.getElementById('account-price');
    const elId = document.getElementById('account-id');
    if (elName) elName.textContent = account.namaAkun;
    if (elPrice) elPrice.textContent = account.price;
    if (elId) elId.textContent = account.id;

    // rekber link
    const rekberLink = $('.btn-rekber');
    if (rekberLink) {
        rekberLink.target = '_blank';
        rekberLink.rel = 'noopener noreferrer';
        rekberLink.href = `https://wa.me/${account.waRekber}?text=${encodeURIComponent(`_*Halo Admin, saya ingin menanyakan ketersediaan akun dari ${account.namaAkun}*_\n\n> Nama akun : ${account.namaAkun}\n> Harga : ${account.price}\n\nKira-kira masih ada stocknya min?`)}`;
    }

    // detail fields
    const setIf = (sel, txt) => { const el = document.querySelector(sel); if (el) el.textContent = txt; };
    setIf('.deskripsi-akun', `Deskripsi: ${account.detail.deskripsi || '-'}`);
    setIf('.rank-tertinggi', `Rank Tertinggi: ${account.detail.rankTertinggi || '-'}`);
    setIf('.total-skin', `Total Skin: ${account.detail.totalSkin || '-'}`);
    setIf('.total-winrate', `Total Winrate: ${account.detail.totalWinrate || '-'}`);
    setIf('.total-pertandingan', `Total Pertandingan: ${account.detail.totalPertandingan || '-'}`);
    setIf('.total-magic-core', `Total Magic Core: ${account.detail.totalMagicCore || '-'}`);
    setIf('.level-emblem', `Level Emblem: ${account.detail.levelEmblem || '-'}`);
    setIf('.bukti-top-up', `Bukti Top Up Pertama: ${account.detail.buktiTopUp || '-'}`);
    setIf('.akun-pribadi', `Akun Pribadi/Beli: ${account.detail.akunPribadi || '-'}`);
    setIf('.akun-log', `Log: ${account.detail.log || '-'}`);
    setIf('.bind-akun', `Bind Akun: ${account.detail.bindAkun || '-'}`);

    // append gallery images via DocumentFragment
    const sliderImages = document.getElementById('slider-images');
    if (sliderImages && Array.isArray(account.gallery)) {
        const frag = document.createDocumentFragment();
        account.gallery.forEach(src => {
            const img = document.createElement('img');
            img.className = 'slide';
            img.loading = 'lazy';
            img.decoding = 'async';
            img.alt = account.namaAkun;
            img.src = `img-webp/${src}`;
            frag.appendChild(img);
        });
        sliderImages.appendChild(frag);
    }

    // toggle sold overlay
    const containerSold = document.querySelector('.container-sold-slider');
    if (containerSold) {
        if (account.status === true) {
            containerSold.style.display = 'none';
        } else {
            containerSold.style.display = 'grid';
            containerSold.style.placeItems = 'center';
        }
    }

    // SLIDER logic (expose prev/next to window for onclick in HTML)
    (function sliderInit() {
        const slider = document.querySelector('.slider');
        const sliderImagesWrapper = document.querySelector('.slider-images');
        if (!slider || !sliderImagesWrapper) {
            // nothing to do
            window.prevSlide = window.nextSlide = () => { };
            return;
        }

        // ensure proper CSS behavior
        sliderImagesWrapper.style.display = 'flex';
        sliderImagesWrapper.style.transition = 'transform 300ms ease';
        sliderImagesWrapper.style.willChange = 'transform';

        let slides = sliderImagesWrapper.querySelectorAll('.slide');
        let slideIndex = 0;
        let sliderWidth = Math.max(0, slider.clientWidth || slider.getBoundingClientRect().width || 0);
        let rafPending = false;

        function setSlideWidths() {
            slides = sliderImagesWrapper.querySelectorAll('.slide');
            sliderWidth = Math.max(0, slider.clientWidth || slider.getBoundingClientRect().width || 0);
            slides.forEach(s => {
                s.style.minWidth = `${sliderWidth}px`;
                s.style.maxWidth = `${sliderWidth}px`;
                s.style.objectFit = 'cover';
                s.style.display = 'block';
            });
        }

        function updateSliderPosition() {
            if (rafPending) return;
            rafPending = true;
            window.requestAnimationFrame(() => {
                const offset = -slideIndex * sliderWidth;
                sliderImagesWrapper.style.transform = `translateX(${offset}px)`;
                rafPending = false;
            });
        }

        function recalc() {
            setSlideWidths();
            if (slides.length === 0) slideIndex = 0;
            else slideIndex = Math.min(slideIndex, slides.length - 1);
            updateSliderPosition();
        }

        function prevSlide() {
            slides = sliderImagesWrapper.querySelectorAll('.slide');
            if (slides.length === 0) return;
            slideIndex = (slideIndex > 0) ? slideIndex - 1 : slides.length - 1;
            updateSliderPosition();
        }

        function nextSlide() {
            slides = sliderImagesWrapper.querySelectorAll('.slide');
            if (slides.length === 0) return;
            slideIndex = (slideIndex < slides.length - 1) ? slideIndex + 1 : 0;
            updateSliderPosition();
        }

        // expose globally for existing HTML onclick handlers
        window.prevSlide = prevSlide;
        window.nextSlide = nextSlide;

        // observe resize
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(recalc);
            ro.observe(slider);
        } else {
            let t = null;
            window.addEventListener('resize', () => {
                clearTimeout(t);
                t = setTimeout(recalc, 120);
            });
        }

        // recalc after images / DOM inserted
        setTimeout(recalc, 30);

        // also recalc when each image loads
        sliderImagesWrapper.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', () => setTimeout(recalc, 20));
            }
        });

        // expose for debug
        window._accountSlider = { recalc };
    })();

    // gallery toggle (safe attach)
    const trigger = document.querySelector('.trigger-gallery-2');
    const gallery = document.querySelector('.gallery-2');
    if (trigger && gallery) {
        let isGalleryOpen = false;
        trigger.addEventListener('click', () => {
            isGalleryOpen = !isGalleryOpen;
            gallery.style.display = isGalleryOpen ? 'block' : 'none';
        });
    }
})();
