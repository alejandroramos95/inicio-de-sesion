const express = require('express')
const cookieParser = require('cookie-parser')
const UtilsSession = require('./services/UtilsSession.js')
const passport = require('passport')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const PORT = 8080
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
module.exports = io

// Public statement
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(UtilsSession.createOnMongoStore())

// MIDDLEWARE PASSPORT

app.use(passport.initialize())
app.use(passport.session())

// SESSIONS

const sessions = require('./controllers/sessionController.js')
app.use('/api/sessions', sessions)

// Validar sesion o uso de vistas sin restriccion
let urlValidation = {
  '/logout': true,
  '/register': true,
  '/register-error': true,
  '/login-error': true,
}
app.use((req, res, next) => {
  if (req.session?.passport || urlValidation[req.originalUrl]) {
    next()
  } else {
    res.sendFile(__dirname + `/public/login.html`)
  }
})

const productos = require('./controllers/productosController.js')
const testProductos = require('./controllers/testController.js')
require('./controllers/chatController.js')

app.use('/api/productos', productos)
app.use('/api/productos-test', testProductos)

app.get('/:file', (req, res) => {
  res.sendFile(__dirname + `/public/${req.params.file}.html`)
})

// Server up
httpServer.listen(PORT, () => console.log(`SERVER LISTENING IN PORT ${PORT}`))
