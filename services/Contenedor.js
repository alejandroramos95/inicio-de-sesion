const repositorio = require('../repository/Repositorio')
const { options } = require('../repository/optionsDB')

module.exports = class Contenedor {
  constructor() {
    this.repo = new repositorio(options.mysql, 'productos')
  }

  async getAll() {
    return await this.repo.getAllDB()
  }

  async save(itemNuevo) {
    // Chequeo que el producto se haya cargado con un console log
    //console.log('item nuevo contenedor', itemNuevo)
    return await this.repo.saveDB(itemNuevo)
  }

  async getById(id) {
    // Chequeo que producto trae
    const data = await this.repo.getByIdDB(id)
    return data
  }

   async deleteById(id) {
    await this.repo.deleteByIdDB(id)   
  }

  async updateItem(obj, id) {
    await this.repo.updateItem(obj, id)
  }

  
}
