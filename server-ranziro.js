const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apps = express();

// Tambah semua header keamanan di sini
apps.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "geolocation=(), microphone=()");
    res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    next();
});

apps.use(bodyParser.json());
apps.use(express.static(path.join(__dirname, 'public')));

const router = [
    { path: '/mobile-legends', file: 'index.html' },
    { path: '/free-fire', file: 'ff.html' },
    { path: '/akun', file: 'akun.html' },
    { path: '/terms', file: 'terms.html' },
    { path: '/privacy-policy', file: 'privacy-policy.html' }
];

router.forEach(route => {
    apps.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', route.file));
    });
});

const port = process.env.PORT || 4003;
apps.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
