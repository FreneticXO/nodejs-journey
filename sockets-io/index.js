const express = require('express')
const app = express();
require('dotenv').config();


const server = require('http').createServer(app);

const io = require('socket.io')(server, {cors: {origin: "*"}});
const port = 3000;  

users = ['aman', 'john', 'mark']; // verified users --


const isValidToken = (header) => {
    const token = header.split(' ')[1];
    if (token === SECRET_TOKEN) {
        return true;
    } else {
        return false;
    }
};



server.listen(port, () => {
console.log('Listening on port: ' + port);
})

app.get('/', (req, res) => {
res.sendFile(__dirname + '/public/index.html')
})



// middleware -- 

io.use((socket, next) => {
    const header = socket.handshake.headers['authorization'] 
    console.log(header);
    
    if( isValidToken(header)) {
        return next();
    } else {
        socket.emit('user authentication failed')
        return next(new Error("Authentication error"));
    }
    
})

io.on('connection', (socket) => {
    // console.log("User connected with ID: " + socket.id);

    socket.on('disconnect', () => {
        console.log("A User disconnected with ID: " + socket.id);
    })

    socket.on("connect_error", (err) => {
        if (err.message === "invalid credentials") {
            socket.auth.token = "efgh";
            socket.connect();
        }
    })

    socket.on('join room', (data) => {
        const {room, user} = data;
        // console.log(user)
        if(room != '') {
            socket.join(room);
            socket.emit('user authenticated');
        } else {
            console.log(`User ${user} failed to join room ${room}`)
        }

    })

    socket.on('leave room', (room) => {
        socket.leave(room);
    })

    socket.on('chatMessage', (data) => {
        // console.log(data)
        if(data.room == '') io.emit('new message', data.message)
        io.to(data.room).emit('new message', data.message)
    })

    socket.on('send message', msg => {
        io.emit('new message', msg);
    })

})