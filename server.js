const express = require('express')
const cookieParser = require('cookie-parser')
const UtilsSession = require('./services/UtilsSession.js')
//NUEVOS IMPORTS DESAFIO INICIO SESION
const passport = require('passport')
const { Strategy } = require('passport-local')
const localStrategy = Strategy
const bCrypt = require('bcrypt')
const Usuarios = require('./services/Session.js')
const usuarios = new Usuarios()

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

// STRATEGIES

passport.use(
  'register',
  new localStrategy({ passReqToCallback: true }, async (registerEmail, registerPassword, done) => {
    try {
      const registerData = { email: registerEmail, password: registerPassword }
      const usuario = await usuarios.buscarUsuarioPorEmail(registerData.email)
      if (!usuario) {
        registerData.password = UtilsSession.createHash(registerPassword)
        await usuarios.guardarUsuario(registerData)

        done(null, registerData)
      } else {
        done(null, false)
      }
    } catch {}
  })
)

passport.use(
  'login',
  new localStrategy(async (emailUser, passwordUser, done) => {
    try {
      const usuario = await usuarios.buscarUsuarioPorEmail(emailUser)

      if (!usuario) {
        return done(null, false, { message: 'El usuario no existe.' })
      }

      const passwordMatch = UtilsSession.isValidPassword(usuario, passwordUser)

      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta.' })
      }

      done(null, usuario)
    } catch (err) {
      done(err)
    }
  })
)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  const { email } = await usuarios.getById(id)
  done(null, {
    email,
  })
})

//serializar y deserializar
/* 
passport.serializeUser((usuario, done) => {
  console.log('SERIALIZAR', usuario)
  done(null, usuario._id)
})

passport.deserializeUser((id, done) => {
  UsuariosSchema.findById(id, done)
}) */

app.use(
  '/api/sessions/register',
  passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register-error',
  })
)

app.use(
  '/api/sessions/login',
  passport.authenticate('login', {
    successRedirect: '/main',
    failureRedirect: '/login-error',
  })
)

// SESSIONS

/* const sessions = require('./controllers/sessionController.js')
app.use('/api/sessions', sessions) */

let urlValidation = {
  '/register': true,
  '/register-error': true,
  '/login-error': true,
}

app.use((req, res, next) => {
  //console.log('originalURL', req.originalUrl)
  if (req.session.email || urlValidation[req.originalUrl]) {
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
