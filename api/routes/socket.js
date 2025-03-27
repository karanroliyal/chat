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


    const connectedUsers = {};
    
    io.on('connection', (socket) => {

        connectedUsers[socket.id] = `User-${socket.id.slice(-2)}`;

        console.log('user connected', socket.id);

        // Disconnected users
        socket.on('disconnect', function () {
            delete connectedUsers[socket.id];
            io.emit('user-disconnect',`User-${socket.id.slice(-2)}`)
        });
        socket.broadcast.emit('user-joined', `User-${socket.id.slice(-2)}`);
        socket.emit('connected-users', Object.values(connectedUsers));

        
        socket.on('message', (msg) => {
            console.log('user sended this message : ', msg)
            socket.broadcast.emit('message', `User-${socket.id.slice(-2)}: ${msg}`);
        })

    })

    server.listen(8000, () => console.log('Socket Server running on http://localhost:8000'));

})