// server.js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', socket => {
  clients.add(socket);
  console.log('Client connected');

  socket.on('message', message => {
    // Broadcast the message to all clients
    for (let client of clients) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
