// server.js - improved for caching & compression
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const app = express();

// Middlewares
app.use(cors({ origin: '*', credentials: true }));

// Compression - gzip/brotli if supported by environment/edge
app.use(compression());

// parse json bodies
app.use(bodyParser.json());

// Serve static assets from /public with long cache (hashed builds assumed)
app.use(
  express.static(path.join(__dirname, 'public'), {
    // 1 year in ms
    maxAge: '1y',
    immutable: true,
    // let express set ETag for cache validation
    etag: true,
  })
);

/**
 * Helper to send HTML with proper Cache-Control for HTML pages.
 * We prefer short edge cache + stale-while-revalidate:
 * "public, max-age=0, s-maxage=60, stale-while-revalidate=86400"
 *
 * If you later want HTML not cached at all, change header accordingly.
 */
function sendHtmlWithEdgeCache(res, filePath) {
  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=60, stale-while-revalidate=86400'
  );
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('sendFile error:', err);
      if (!res.headersSent) res.status(500).send('Internal Server Error');
    }
  });
}

// dynamic routes mapping
const router = [
  { path: '/mobile-legends', file: 'index.html' },
  { path: '/akun', file: 'akun.html' },
];

// create routes
router.forEach((route) => {
  app.get(route.path, (req, res) => {
    const filePath = path.join(__dirname, 'public', route.file);
    sendHtmlWithEdgeCache(res, filePath);
  });
});

// fallback: serve index (useful if you want SPA fallback)
// comment out if you prefer 404s for unknown routes
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  sendHtmlWithEdgeCache(res, filePath);
});

// port
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
