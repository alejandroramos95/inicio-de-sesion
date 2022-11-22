const { faker } = require('@faker-js/faker')

module.exports = class FakeProducts {
  constructor() {}

  generarProducto(cantidad) {
    let productos = []
    for (let i = 0; i < cantidad; i++) {
      productos.push({
        title: faker.commerce.productName(),
        price: faker.commerce.price(1, 5000),
        thumbnail: faker.image.imageUrl(),
      })
    }
    return productos
  }
}
