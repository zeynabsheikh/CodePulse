// server.js - Final Entry Point with Full Socket.IO Collaboration
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); 
const { Server } = require('socket.io'); 
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    }
});

app.use(cors()); 
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(err => {
        console.error("Database Connection Error:", err.message);
        process.exit(1);
    });

// --- Socket.IO Real-Time Engine ---
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // 1. Typing Indicator
    socket.on('typing', (data) => {
        socket.broadcast.emit('user_typing', data);
    });

    // 2. Real-Time Comments (Part E)
    socket.on('send_comment', (data) => {
        // io.emit use kar rahe hain taake sender ko bhi apna comment nazar aaye
        io.emit('receive_comment', data);
    });

    // 3. System Notifications
    socket.on('new_snippet_analyzed', (data) => {
        socket.broadcast.emit('receive_notification', {
            message: `New snippet: "${data.title}" was just analyzed!`,
            user: data.user
        });
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/snippets', require('./routes/snippets'));

app.get('/', (req, res) => {
    res.send("CodePulse API is live with real-time comments enabled.");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});