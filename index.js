const express = require('express');
const socket = require('socket.io');
const app = express();
const port = 4000;

const server = app.listen(port, () => {
    console.log(`The server is listening on port ${port}!`)
});

// static files
app.use(express.static('public'));

// socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log('Made socket connection!', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    });
});