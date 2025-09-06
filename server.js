const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const apps = express();

const allowedOrigins = [
    'https://ranzirostore.vercel.app',
    'http://localhost:2121'
];

apps.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

apps.use((req, res, next) => {
    res.set('Cache-Control', 'no-store'); // Tidak menyimpan cache
    next();
});

apps.use(bodyParser.json());
apps.use(express.static(path.join(__dirname, 'public')));

// dinamis route
const router = [
    { path: '/mobile-legends', file: 'index.html' },
    { path: '/akun', file: 'akun.html' },
];

// Membuat rute secara dinamis berdasarkan konfigurasi
router.forEach(route => {
    apps.get(route.path, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', route.file));
    });
});

const port = process.env.PORT || 2121;
apps.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
