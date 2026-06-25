const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/health') {
    res.end(JSON.stringify({ status: 'healthy', service: 'auth' }));
    return;
  }

  if (req.url === '/api/auth/verify') {
    res.end(JSON.stringify({
      service: 'auth',
      message: 'Token verified successfully',
      userId: 'user-123'
    }));
    return;
  }

  res.end(JSON.stringify({ service: 'auth', status: 'running' }));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
