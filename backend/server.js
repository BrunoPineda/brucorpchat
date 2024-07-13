const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  ws.send(JSON.stringify({ type: 'text', data: 'Welcome to the chat!' }));
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});