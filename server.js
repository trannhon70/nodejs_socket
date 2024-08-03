const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
// const mysql = require('mysql2');

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

// // Cấu hình kết nối MySQL
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '', // Sử dụng mật khẩu trống
//     database: 'chat_socket', // Tên cơ sở dữ liệu
//     port: 3307 // Cổng MySQL
// });

// // Kết nối tới cơ sở dữ liệu MySQL
// db.connect((err) => {
//     if (err) {
//         console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
//     } else {
//         console.log('Đã kết nối tới cơ sở dữ liệu MySQL');
//     }
// });

// Sử dụng cors middleware
app.use(cors());

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

        // Lưu tin nhắn vào cơ sở dữ liệu
        // const { user_id, username, message } = data;
        // const query = `INSERT INTO messages (user_id, username, message) VALUES ("${user_id}", "${username}", "${message}")`;
        // db.query(query, [user_id, username, message], (err, results) => {
        //     if (err) {
        //         console.error('Lỗi khi lưu tin nhắn:', err);
        //     } else {
        //         console.log('Tin nhắn đã được lưu vào cơ sở dữ liệu');
        //     }
        // });

        // Phát lại tin nhắn cho tất cả clients
        socket.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Một client đã ngắt kết nối');
    });
});

// const host = 'socket1.botngu.pro';
const host = 'nodejs-socket-flame.vercel.app';
// const port = 5001;
const port = 1337;

server.listen(port, () => {
    console.log(`Server đang lắng nghe trên ${host}:${port}`);
});
