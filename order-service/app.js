const http = require('http');

// Auth service URL - هنا هنحط Cloud Map DNS بعدين
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

function callAuthService() {
  return new Promise((resolve, reject) => {
    http.get(`${AUTH_SERVICE_URL}/api/auth/verify`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/health') {
    res.end(JSON.stringify({ status: 'healthy', service: 'orders' }));
    return;
  }

  if (req.url === '/api/orders') {
    try {
      const authResult = await callAuthService();
      res.end(JSON.stringify({
        service: 'orders',
        message: 'Orders fetched successfully',
        authVerification: authResult,
        orders: [
          { id: 'ord-1', item: 'Laptop', status: 'shipped' },
          { id: 'ord-2', item: 'Phone', status: 'processing' }
        ]
      }));
    } catch (err) {
      res.end(JSON.stringify({
        service: 'orders',
        message: 'Orders fetched (auth unreachable)',
        error: err.message,
        orders: []
      }));
    }
    return;
  }

  res.end(JSON.stringify({ service: 'orders', status: 'running' }));
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`);
});
