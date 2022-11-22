const { normalize, denormalize, schema } = require('normalizr')
const util = require('util')

const arrayMensajeDB = [
  {
    author: {
      id: 'test1@gmail.com',
      nombre: 'asdas',
      apellido: 'weqwe',
      edad: '11',
      alias: 'asdada',
      avatar: 'asdasda',
    },
    text: 'qqqqqq',
  },
  {
    author: {
      id: 'test2@gmail.com',
      nombre: 'asdas',
      apellido: 'rtrts',
      edad: '44',
      alias: 'asdada',
      avatar: 'asdasda',
    },
    text: 'eeeee',
  },
]

const schemaAuthor = new schema.Entity('author', { idAttribute: 'id' })
const schemaMensajes = new schema.Entity('mensajes', 
  {author: schemaAuthor}
)

const schemaTexto = [schemaMensajes]
console.log('==================================OBJETO NORMALIZADO===================================')
const normalizedChat = normalize(arrayMensajeDB, schemaTexto)
console.log(util.inspect(normalizedChat, false, Infinity))

console.log('==================================LONGITUDES===================================')
const longitudNormalizado = JSON.stringify(normalizedChat).length
const longitudOriginal = JSON.stringify(arrayMensajeDB).length



console.log(longitudNormalizado)
console.log(longitudOriginal)
