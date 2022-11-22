const mongoose = require('mongoose')
const { db } = require('../models/UsuariosModel.js')
const UsuariosModel = require('../models/UsuariosModel.js')

module.exports = class Usuarios {
  constructor() {
    this.url =
      'mongodb+srv://coderBackend:coderBackendPW@clustercoderbackend.tct9by1.mongodb.net/cursobackend2022?retryWrites=true&w=majority'
    this.mongodb = mongoose.connect
  }

  //funciones
  async conectarDB() {
    await this.mongodb(this.url)
  }

  async guardarUsuario(dataUsuario) {
    console.log('asd', dataUsuario)
    await this.conectarDB()
    const newUser = new UsuariosModel(dataUsuario)
    await newUser.save()
  }

  async buscarUsuarioPorEmail(email) {
    await this.conectarDB()
    const usuario = await UsuariosModel.findOne({ email: email })
    return usuario
  }

  async getById(id){
    await this.conectarDB()
    const usuario = await UsuariosModel.findById(id)
    return usuario
  }
}
