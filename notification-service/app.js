const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/health') {
    res.end(JSON.stringify({ status: 'healthy', service: 'notifications' }));
    return;
  }

  if (req.url === '/api/notify') {
    res.end(JSON.stringify({
      service: 'notifications',
      message: 'Notification sent successfully',
      recipient: 'user@example.com',
      type: 'order_update'
    }));
    return;
  }

  res.end(JSON.stringify({ service: 'notifications', status: 'running' }));
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Notifications service running on port ${PORT}`);
});
