class Repositorio {
  constructor(config, tableName) {
    this.knex = require('knex')(config)
    this.tableName = tableName
  }

  async getAllDB() {
    try {
      const data = await this.knex.from(this.tableName).select('*')
      // console.log("mensajes", data)
      return data
    } catch (error) {
      //console.log('error getAllDB', error)
      throw error
    }
  }

  async saveDB(obj) {
    try {
      await this.knex(this.tableName).insert(obj)
      //console.log('Data inserted.')
    } catch (e) {
      //console.log(e)
    }
  }

  async getByIdDB(id) {
    let obj
    try {
      const data = await this.knex.from(this.tableName).select('title', 'price', 'thumbnail').where({ id: id })
      obj = data[0]
      //console.log('testing', obj)
    } catch (e) {
      //console.log(e)
    }
    return obj
  }

  async deleteByIdDB(id) {
    try {
      await this.knex(this.tableName).where({ id: id }).del()
      //console.log('Data deleted by ID.')
    } catch (e) {
      //console.log(e)
    }
  }

  async updateItem(obj, id) {
    try {
      await this.knex.from(this.tableName).where({ id: id }).update(obj)
      //console.log('Data updated by ID.')
    } catch (e) {
      //console.log(e)
    }
  }
  async destroyConnection() {
    await this.knex.destroy()
  }
}

module.exports = Repositorio
