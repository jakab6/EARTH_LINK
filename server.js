// server.js
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'dist' directory
app.use(express.static('dist'));

// Proxy Vite dev server (if needed)
app.use('/api', createProxyMiddleware({ target: 'http://localhost:5173', changeOrigin: true }));

// Handle fallback for HTML5 history API
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
