// server.js
import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'dist' directory
app.use(express.static("dist"));

// Proxy Vite dev server (if needed)
app.use(
  "/api",
  createProxyMiddleware({ target: "http://localhost:5173", changeOrigin: true })
);

// Handle fallback for HTML5 history API
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
