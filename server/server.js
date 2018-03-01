const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection',(socket) =>{


    socket.emit('newMessage',generateMessage('admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('admin','New user joined the chat'))
   
    
    socket.on('createMessage', (data) => {
        const message =  generateMessage({...data});

     //   socket.broadcast.emit('newMessage',message)

        io.emit('newMessage', message)
    })

    socket.on('disconnect',()=>{
        //   console.log('client disconnected')
       })

})

server.listen(port, () => {
    console.log(`waiting for connections on port ${port}`)
});