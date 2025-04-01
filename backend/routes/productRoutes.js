const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/fetch-product', productController.FetchProduct)
router.get('/:id', productController.FetchProductById)

module.exports = router
