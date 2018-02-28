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

    //socket.emit from admin - Welcome to the chat app

    socket.emit('newMessage',{
        from: 'admin',
        text: 'Welcome to the chat app'
    });

    socket.broadcast.emit('newMessage',{
        from: 'admin',
        text: 'new user joined chat',
        createdAt: new Date().getTime()
    })
    
    socket.on('createMessage', (data) => {
        const message =  {
            ...data,
            createdAt:new Date().getTime()
        };

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