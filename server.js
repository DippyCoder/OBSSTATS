const http = require("http");
const fs = require("fs");
const path = require("path");
const { WebSocketServer } = require("ws");

const PORT = 3000;
const SAVE_FILE = path.join(__dirname, "state.json");

// ── Load saved state or use defaults ──
let stats = { SubTo: 0, DippyCoder: 0 };
let style = {};

if (fs.existsSync(SAVE_FILE)) {
  try {
    const saved = JSON.parse(fs.readFileSync(SAVE_FILE, "utf8"));
    if (saved.stats) stats = saved.stats;
    if (saved.style) style = saved.style;
    console.log("Loaded saved state from state.json");
  } catch (e) {
    console.warn("Could not load state.json, using defaults:", e.message);
  }
}

let saveTimer = null;
function saveState() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.writeFile(SAVE_FILE, JSON.stringify({ stats, style }, null, 2), err => {
      if (err) console.error("Failed to save state:", err.message);
    });
  }, 500); // debounce — wait 500ms after last change before writing
}

// ── HTTP server (serves HTML files so Streamlabs can load them) ──
const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  const routes = {
    "/":        "index.html",
    "/overlay": "index.html",
    "/control": "index.html",
  };

  const file = routes[url];
  if (!file) { res.writeHead(404); res.end("Not found"); return; }

  const filePath = path.join(__dirname, file);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(500); res.end("Error reading file"); return; }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

// ── WebSocket server (attached to same HTTP server) ──
const wss = new WebSocketServer({ server });

wss.on("connection", ws => {
  // Send current state immediately
  ws.send(JSON.stringify({ stats, style }));

  ws.on("message", msg => {
    try {
      const data = JSON.parse(msg);
      if (data.stats !== undefined) stats = data.stats;
      if (data.style !== undefined) style = data.style;

      saveState();

      // Broadcast to all clients
      const payload = JSON.stringify({ stats, style });
      wss.clients.forEach(client => {
        if (client.readyState === 1) client.send(payload);
      });
    } catch {}
  });
});

server.listen(PORT, () => {
  console.log(`Server running:`);
  console.log(`  Overlay  → http://localhost:${PORT}/`);
  console.log(`  Control  → http://localhost:${PORT}/?control`);
});