const { Router } = require('express')
const router = Router()

const FakeProducts = require('../services/FakeProducts.js')
const fakeProducts = new FakeProducts()

// TEST, faker product generator
router.get('/', (req, res) => {
    res.json(fakeProducts.generarProducto(5))
  })

module.exports = router;

