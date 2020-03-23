
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg=>{
            console.log(msg)
            // io.emit('chat addMsg', msg) // (Emit to all sockets)
            // emits only to sockets in the same room
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('chat typing', userName=>{
            socket.broadcast.to(socket.myTopic).emit('chat userTyping', userName)
        })
        socket.on('chat topic', topic=>{
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
    })
}