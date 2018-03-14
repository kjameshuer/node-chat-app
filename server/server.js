const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users;

app.use(express.static(publicPath))

io.on('connection', (socket) => {

    socket.on('join', (data, callback) => {
        if (!isRealString(data.name) || !isRealString(data.room)) {
            return callback('Name and room name are required')
        }

        socket.join(data.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, data.name, data.room);

        io.to(data.room).emit('updateUserList', users.getUserList(data.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(data.room).emit('newMessage', generateMessage('Admin', data.name + ' has joined the room'))

        callback();
    })

    socket.on('createMessage', (data, callback) => {
        const user = users.getUser(socket.id);
        if (user && isRealString(data.text)) {
            const message = generateMessage(user.name, data.text);
            io.to(user.room).emit('newMessage', message)
        
        }

       callback();
    })

    socket.on('createLocationMessage', coords => {
        const user = users.getUser(socket.id);

        if (user){
            io.emit('newLocationMessage', generateLocationMessage(user, coords.latitude, coords.longitude))

        }
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', user.name + ' has left the room'));
        }
        console.log('client disconnected')
    })

})

server.listen(port, () => {
    console.log(`waiting for connections on port ${port}`)
});