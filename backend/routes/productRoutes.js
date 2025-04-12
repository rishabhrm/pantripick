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

router.get('/fetch-product', productController.FetchProduct)
router.get('/:id', productController.FetchProductById)
router.delete('/:id', productController.DeleteProduct)
router.post('/add-product', upload.single('image'), productController.AddProduct)
router.post('/update-quantity', productController.UpdateQuantity)

module.exports = router