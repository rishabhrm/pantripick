const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.post('/place-order', orderController.placeOrder)
router.get('/order-history', orderController.getOrderHistory)
router.get('/all-orders', orderController.getAllOrders)
router.delete('/delete-orders/:orderId', orderController.deleteOrders)

module.exports = router