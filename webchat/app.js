const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const PORT = process.env.PORT || 4000;

// Create an HTTP server
const server = http.createServer(app);
const io = socketIo(server); // Attach Socket.io to the server

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize an empty set to store connected sockets
let socketsConnected = new Set();

// Handle connection events
io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    socketsConnected.add(socket.id);

    // Emit total number of connected clients
    io.emit('clients-total', socketsConnected.size);

    // Handle disconnection events
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        socketsConnected.delete(socket.id);
        io.emit('clients-total', socketsConnected.size);
    });

    // Handle incoming messages
    socket.on('message', (data) => {
        // console.log(data);
        socket.broadcast.emit('chat-message', data); // Broadcast message to other clients
    });
    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`💬 Server running on port ${PORT}`);
});