const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

router.get('/fetch-product', productController.fetchProduct)
router.get('/:id', productController.fetchProductById)
router.delete('/:id', productController.deleteProduct)
router.post('/add-product', upload.single('image'), productController.addProduct)
router.post('/update-quantity', productController.updateQuantity)

module.exports = router