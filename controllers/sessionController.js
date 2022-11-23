// USO DE EXPRESS-SESSION
const express = require('express')
const router = express.Router()
const SessionService = require('../services/Session.js')
const UtilsSession = require('../services/UtilsSession.js')
const sessionService = new SessionService()

// REGISTRO
router.post('/register', async (req, res) => {
  const registerData = { email: req.body.registerEmail, password: req.body.registerPassword }
  const usuario = await sessionService.buscarUsuarioPorEmail(registerData.email)
  if (!usuario) {
    registerData.password = UtilsSession.createHash(registerData.password)
    await sessionService.guardarUsuario(registerData)
    res.redirect('/login')
  } else {
    res.redirect('/register-error')
  }
})

// ELIMINAR SESSION
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: 'Logout ERROR', body: err })
    }
  })
  res.redirect('/login')
})

module.exports = router
