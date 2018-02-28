const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection',(socket) =>{
    console.log("ive connected with someone")

    socket
    .on('disconnect',()=>{
     //   console.log('client disconnected')
    })
    .on('createMessage', (data) => {
        const message =  {
            ...data,
            createdAt:new Date().getTime
        };

        io.emit('newMessage', message)
    })

  

})

server.listen(port, () => {
    console.log(`waiting for connections on port ${port}`)
});