const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);

const socketIO = require('socket.io');

const io = socketIO(server);


const mongoose = require('mongoose');


app.use(express.static(path.join(__dirname,"src")));
const PORT = process.env.PORT || 5000;

io.on("connection",(socket)=>{
    socket.on("chatting", (message)=>{
        io.emit("chatting",message);
    })
})


server.listen(PORT,()=>{
    console.log(`서버시작 ${PORT}`);
})
