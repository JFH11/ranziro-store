const express = require('express')
const path = require('path')
const apps = express()
const bodyParser = require('body-parser')

apps.use(bodyParser.json());

apps.use(express.static(path.join(__dirname, 'public')));

apps.get('/semua_akun', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

apps.get('/akun', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'akun.html'))
});

apps.get('/terms-and-conditions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'terms.html'))
});

apps.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'privacy-policy.html'))
});

port = process.env.PORT || 4003
apps.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})