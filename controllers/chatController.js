const Chat = require('../services/Chat.js')
const io = require('../server.js')
const moment = require('moment')

const chat = new Chat()

io.on('connection', async (socket) => {
  const messages = await chat.getAll()

  socket.emit('messages', messages)

  socket.on('new-message', async (data) => {

    data.date = moment().format('DD-MM-YYYY HH:mm:ss')

    await chat.save(data)
    io.sockets.emit('messages', await chat.getAll())
  })
})
