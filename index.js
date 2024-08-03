const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Hoặc cấu hình theo domain cụ thể
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});



app.use(cors({
    origin: ["http://localhost", "https://nodejs-socket-delta.vercel.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
}));

// Cung cấp file HTML cho client
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.send('Chào bạn đến với ứng dụng Socket.IO');
});

// Lắng nghe kết nối Socket.IO
io.on('connection', (socket) => {
    console.log('Một client đã kết nối', socket.id);

    socket.on('message', (data) => {
        console.log('Tin nhắn nhận được:', data);
        socket.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Một client đã ngắt kết nối');
    });
});

// const host = 'socket1.botngu.pro';
const host = 'nodejs-socket-delta.vercel.app';
// const port = 5001;
const port = 1337;

server.listen(port, () => {
    console.log(`Server đang lắng nghe trên ${host}:${port}`);
});
