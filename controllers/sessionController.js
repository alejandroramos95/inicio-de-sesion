// USO DE EXPRESS-SESSION
const express = require('express')
const router = express.Router()
const Usuarios = require('../services/Session.js')

const usuarios = new Usuarios()

// REGISTRO
router.post('/register', async (req, res) => {
  const registerData = { email: req.body.registerEmail, password: req.body.registerPassword }
  const usuario = await usuarios.buscarUsuarioPorEmail(registerData.email)
  if (!usuario) {
    await usuarios.guardarUsuario(registerData)
    res.redirect('/login')
  } else {
    res.redirect('/register-error')
  }
}) */

// VALIDACION, LOGIN Y CREACION DE SESION
router.post('/login', async (req, res) => {
  const emailUsuario = req.body.emailUser
  const validar = await usuarios.buscarUsuarioPorEmail(emailUsuario)
  if (validar) {
    if (validar.email === req.body.emailUser && validar.password === req.body.passwordUser) {
      req.session.email = req.body.emailUser
      res.cookie('userEmail', req.session.email)
      res.redirect('/main')
    }
  } else {
    res.redirect('/login-error')
  }
}) */
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
