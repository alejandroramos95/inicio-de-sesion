const { options } = require('../optionsDB.js')

const knexMySql = require('knex')(options.mysql)

function crearTablaProductos(knex) {
  knex.schema
    .createTable('productos', (table) => {
      table.increments('id')
      table.string('title')
      table.double('price')
      table.string('thumbnail')
    })
    .then(() => {
      console.log('Products table created')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      knex.destroy()
    })
}

// Creo tabla Productos en BD MySql
crearTablaProductos(knexMySql)
