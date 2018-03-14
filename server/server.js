const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {


    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app'));

    socket.on('join',(data,callback)=>{
        if (!isRealString(data.name) || !isRealString(data.room) ) {
            callback('Name and room name are required')
        }

        callback();
    })

    socket.on('createMessage', (data, callback) => {
        const message = generateMessage(data.from, data.text);
        io.emit('newMessage', message)
        if (callback) callback('NOOOO!!!');
    })

    socket.on('createLocationMessage', coords => {
        console.log('sending coords')
        io.emit('newLocationMessage', generateLocationMessage(coords.from, coords.latitude, coords.longitude))
    })



    socket.on('disconnect', () => {
        console.log('client disconnected')
    })

})

server.listen(port, () => {
    console.log(`waiting for connections on port ${port}`)
});