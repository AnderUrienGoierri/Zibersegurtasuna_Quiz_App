const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

const PORT = 3000;
const DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  const fullPath = path.join(DIR, reqPath);

  // Segurtasuna: saihestu direktorio-traversal
  if (!fullPath.startsWith(DIR)) {
    res.writeHead(403);
    res.end('Debekatua');
    return;
  }

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Ez da aurkitu');
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(fullPath);
    stream.pipe(res);
  });
});

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  console.log('====================================================');
  console.log('   KRIPTOQUIZ 2026 - ZIBERSEGURTASUNA (2MG3)');
  console.log('====================================================');
  console.log(` Ordenagailuan ikusteko:  http://localhost:${PORT}`);
  console.log(` Mugikorrean irekitzeko:  http://${localIp}:${PORT}`);
  console.log('   (Ziurtatu mugikorra eta PCa WiFi berean daudela)');
  console.log('====================================================');
  console.log(' Zerbitzaria martxan dago. Gelditzeko sakatu Ctrl+C.');

  // Nabigatzailea automatikoki ireki ordenagailuan
  const startUrl = `http://localhost:${PORT}`;
  const startCmd = process.platform === 'win32' ? `start ${startUrl}` :
                   process.platform === 'darwin' ? `open ${startUrl}` : `xdg-open ${startUrl}`;
  exec(startCmd);
});
