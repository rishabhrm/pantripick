const express = require('express')
const router = express.Router()
const passController = require('../controllers/passController')

router.post('/req-reset', passController.requestPasswordReset)
router.post('/pass-reset', passController.resetPassword)
router.post('/validate-otp', passController.validateOTP)

module.exports = router