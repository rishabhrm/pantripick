const nodemailer = require('nodemailer')
const { ConnectionObj } = require('../config/db')

// Nodemailer transporter setup (Gmail SMTP)
const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
})

const generateOTP = () => {
	return Math.floor(100000 + Math.random() * 900000).toString() // Generate a 6-digit OTP
}

const requestPasswordReset = async (req, res) => {
	const db = ConnectionObj()
	const { email } = req.body

	try {
		const userQuery = await db.query(
			'SELECT * FROM users_table WHERE u_email = $1',
			[email]
		)

		if (userQuery.rows.length === 0) {
			return res.status(404).json({ message: 'User not found' })
		}

		// Generate OTP
		const otp = generateOTP()

		// Store OTP and its expiry time in the database (5 minutes expiry)
		const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)
		await db.query(
			'UPDATE users_table SET reset_otp = $1, otp_expiry = $2 WHERE u_email = $3',
			[otp, otpExpiry, email]
		)

		// Send OTP via email
		await transporter.sendMail({
			to: email,
			subject: 'Password Reset OTP',
			html: `
        <h3>Password Reset OTP</h3>
        <p>Your OTP for resetting your password is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
      `,
		})

		res.status(200).json({ message: 'OTP sent to your email.' })
	} catch (err) {
		console.error('Error in RequestPasswordReset:', err)
		res.status(500).json({ error: 'Server error' })
	}
}

const validateOTP = async (req, res) => {
	const db = ConnectionObj()
	const { otp } = req.body

	try {
		const result = await db.query(
			'SELECT u_email FROM users_table WHERE reset_otp = $1 AND otp_expiry > NOW()',
			[otp]
		)

		if (result.rows.length === 0) {
			return res.status(400).json({ message: 'Invalid or expired OTP' })
		}

		res
			.status(200)
			.json({ message: 'OTP is valid', email: result.rows[0].u_email })
	} catch (err) {
		console.error('Error in ValidateOtp:', err)
		res.status(500).json({ message: 'Server error' })
	}
}

const resetPassword = async (req, res) => {
	const db = ConnectionObj()
	const { email, otp, newPassword } = req.body

	try {
		// Verify the OTP
		const otpQuery = await db.query(
			'SELECT * FROM users_table WHERE u_email = $1 AND reset_otp = $2 AND otp_expiry > NOW()',
			[email, otp]
		)

		if (otpQuery.rows.length === 0) {
			return res.status(400).json({ message: 'Invalid or expired OTP' })
		}

		// Directly store the entered password (no hashing)
		await db.query(
			'UPDATE users_table SET u_password = $1, reset_otp = NULL, otp_expiry = NULL WHERE u_email = $2',
			[newPassword, email]
		)

		res.status(200).json({ message: 'Password reset successful' })
	} catch (err) {
		console.error('Error in ResetPassword:', err)
		res.status(500).json({ error: 'Server error' })
	}
}

module.exports = {
	requestPasswordReset,
	validateOTP,
	resetPassword
}
