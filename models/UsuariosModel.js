const mongoose = require('mongoose')

const usuariosSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model('usuarios', usuariosSchema)