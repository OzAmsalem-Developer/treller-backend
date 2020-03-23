
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        console.log('SOCKET:', socket)
    })
}