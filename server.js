const express = require('express')
const cookieParser = require('cookie-parser')
const UtilsSession = require('./services/UtilsSession.js')
//NUEVOS IMPORTS DESAFIO INICIO SESION
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Usuarios = require('./services/Session.js')
const usuariosCollection = new Usuarios()

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

// LOGIN STRATEGY

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'emailUser',
      passwordField: 'passwordUser',
      passReqToCallback: true,
    },
    async (req, emailUser, passwordUser, done) => {
      const usuario = await usuariosCollection.buscarUsuarioPorEmail(emailUser)
      if (!usuario) return done(null, false)
      if (!UtilsSession.isValidPassword(usuario, passwordUser))
        return done(null, false)
      return done(null, usuario)
    }
  )
)

/* passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await usuariosCollection.buscarPorId(id)
  done(null, user)
}) */

passport.serializeUser((user, done) => {
  done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
  const user = await usuariosCollection.buscarUsuarioPorEmail(email)
  done(null, user)
})

app.post(
  '/api/sessions/login',
  passport.authenticate('login', {
    successRedirect: '/main',
    failureRedirect: '/login-error',
    passReqToCallback: true,
  })
)

// SESSIONS

const sessions = require('./controllers/sessionController.js')
app.use('/api/sessions', sessions)

let urlValidation = {
  '/logout': true,
  '/register': true,
  '/register-error': true,
  '/login-error': true,
}

app.use((req, res, next) => {
  if(req.session?.passport)
  res.cookie('userEmail', req.session.passport.user)
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
