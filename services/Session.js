const mongoose = require('mongoose')
const { db } = require('../models/UsuariosModel.js')
const UsuariosModel = require('../models/UsuariosModel.js')
const UtilsSession = require('./UtilsSession.js')

module.exports = class SessionService {
  constructor() {
    this.url =
      'mongodb+srv://coderBackend:coderBackendPW@clustercoderbackend.tct9by1.mongodb.net/cursobackend2022?retryWrites=true&w=majority'
    this.mongodb = mongoose.connect
  }

  //funciones
  async conectarDB() {
    await this.mongodb(this.url)
  }

  async buscarUsuarioPorEmail(email) {
    await this.conectarDB()
    const usuario = await UsuariosModel.findOne({ email })
    return usuario
  }

  async registrarUsuario(usuario) {
    await this.conectarDB()
    const userExist = await UsuariosModel.findOne({ email: usuario.email })
    if (userExist) return false
    usuario.password = UtilsSession.createHash(usuario.password)
    const newUser = new UsuariosModel(usuario)
    await newUser.save()
    return true
  }
}
