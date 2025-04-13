const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/fetch-user', userController.fetchUser)
router.post('/register-user', userController.registerUser)
router.put('/update-user', userController.updateUser)
router.delete('/delete-user', userController.deleteUser)
router.delete('/admin-delete-user', userController.adminDeleteUser)
router.post('/login-user', userController.loginUser)
router.get('/session-user', userController.sessionUser)
router.post('/logout', userController.logoutUser)

module.exports = router