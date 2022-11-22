const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
//NUEVOS IMPORTS DESAFIO INICIO SESION
const passport = require('passport')
const { Strategy } = require('passport-local')
const localStrategy = Strategy

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

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(cookieParser())
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://coderBackend:coderBackendPW@clustercoderbackend.tct9by1.mongodb.net/cursobackend2022?retryWrites=true&w=majority',
      mongoOptions: advancedOptions,
      ttl: 60,
      collectionName: 'sessions',
    }),
    secret: 'sh21501295asdjk',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
)

// SESSIONS

const sessions = require('./controllers/sessionController.js')
app.use('/api/sessions', sessions)

let urlValidation = {
  "/register": true,
  "/register-error": true,
  "/login-error": true
}

app.use((req, res, next) => {
  //console.log('originalURL', req.originalUrl)
  if (req.session.email || urlValidation[req.originalUrl] ) {
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
