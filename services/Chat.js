const mongoose = require('mongoose')
const { schema } = require('../models/MensajesModel.js')
const MensajesModel = require('../models/MensajesModel.js')

module.exports = class Chat {
  constructor() {
    this.url =
      'mongodb+srv://coderBackend:coderBackendPW@clustercoderbackend.tct9by1.mongodb.net/cursobackend2022?retryWrites=true&w=majority'
    this.mongodb = mongoose.connect
  }

  async conectarDB() {
    await this.mongodb(this.url)
  }

  async getAll() {
    await this.conectarDB()
    const mensajeDB = await MensajesModel.find({}, { _id: false, __v: false })
    return mensajeDB
  }

  async save(mensaje) {
    await this.conectarDB()
    const nuevoMensaje = new MensajesModel(mensaje)
    return await nuevoMensaje.save()
  }

  async normalizarMensaje(mensaje) {
    const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' })
    const schemaComment = new schema.Entity('comments', {
      commenter: schemaAuthor,
    })
    const schemaText = new schema.Entity('mensajes', { text: text })
  }
}
