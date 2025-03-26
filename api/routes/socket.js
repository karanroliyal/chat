const createRouter = require('../services/routing');
const http = require('http');
const { Server } = require('socket.io');

module.exports = createRouter((router) => {

    const server = http.createServer(router);
    // Initialize Socket.IO with custom path
    const io = new Server(server, {
        path: "/sock", // Define the custom WebSocket path
        cors: {
            origin: "http://localhost:4200", // Allow Angular frontend
            methods: ["GET", "POST"]
        }
    });


    router.get('/sock', (req, res) => {
        console.log('lisning')
        res.status(201).json({ name: 'karan rawat' });
    })

    io.on('connection', (socket) => {
        console.log('user connected', socket.id);
        socket.broadcast.emit('user-joined',socket.id)
        socket.on('disconnect', function () {
            console.log('user disconnected', socket.id);
        });
        socket.on('message', (msg) => {
            console.log('user sended this message : ', msg)
            socket.broadcast.emit('message', msg);
        })
    })

    server.listen(8000, () => console.log('Socket Server running on http://localhost:8000'));

})