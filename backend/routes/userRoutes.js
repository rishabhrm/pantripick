const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/fetch-user', userController.FetchUser)
router.post('/register-user', userController.RegisterUser)
router.post('/update-user', userController.UpdateUser)
router.post('/delete-user', userController.DeleteUser)
router.post('/login-user', userController.LoginUser)
router.get('/session-user', userController.SessionUser)
router.post('/logout', userController.LogoutUser)
router.get('/order-history', userController.GetOrderHistory)

module.exports = router