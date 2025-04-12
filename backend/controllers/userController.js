const { ConnectionObj } = require('../config/db')
const db = ConnectionObj()

const FetchUser = async (req, res) => {
	const result = await db.query('SELECT * FROM users_table;')
	res.json({ users: result.rows })
}

const RegisterUser = async (req, res) => {
	const { u_name, u_email, u_password, u_phone, u_address, u_city } = req.body
	const result = await db.query(
		`INSERT INTO users_table (u_name, u_email, u_password, u_phone, u_address, u_city) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
		[u_name, u_email, u_password, u_phone, u_address, u_city]
	)
	res.json({ user: result.rows[0] })
}

const UpdateUser = async (req, res) => {
	const userEmail = req.session.user?.email
	if (!userEmail) return res.status(401).json({ error: 'Not logged in' })

	const { u_name, u_email, u_phone, u_address, u_city } = req.body
	try {
		const { rows } = await db.query(
			'SELECT u_id FROM users_table WHERE u_email = $1',
			[userEmail]
		)
		const userId = rows[0]?.u_id
		if (!userId) return res.status(404).json({ error: 'User not found' })

		const result = await db.query(
			`UPDATE users_table SET u_name = $1, u_email = $2, u_phone = $3, u_address = $4, u_city = $5 
       WHERE u_id = $6 RETURNING *;`,
			[u_name, u_email, u_phone, u_address, u_city, userId]
		)

		req.session.user = {
			firstName: result.rows[0].u_name,
			email: result.rows[0].u_email,
			phone: result.rows[0].u_phone,
			address: result.rows[0].u_address,
			city: result.rows[0].u_city,
		}

		res.json({
			updatedUser: result.rows[0],
			message: 'Profile updated successfully',
		})
	} catch {
		res.status(500).json({ error: 'Failed to update profile' })
	}
}

const AdminDeleteUser = async (req, res) => {
	const { id: userId } = req.body

	if (!userId) return res.status(400).json({ error: 'No user ID provided' })

	try {
		await db.query('DELETE FROM order_history WHERE user_id = $1', [userId])
		const result = await db.query(
			'DELETE FROM users_table WHERE u_id = $1 RETURNING *;',
			[userId]
		)

		if (!result.rows.length)
			return res.status(404).json({ error: 'User not found' })

		const deletedUser = result.rows[0]

		if (req.session.user?.email === deletedUser.u_email) {
			req.session.destroy(() => {
				res.clearCookie('connect.sid')
				res.json({ message: 'Profile deleted successfully', deletedUser })
			})
		} else {
			res.json({ message: 'User deleted successfully', deletedUser })
		}
	} catch (err) {
		console.error('DeleteUser error:', err)
		res.status(500).json({ error: 'Failed to delete user' })
	}
}

const LoginUser = async (req, res) => {
	const { email, password } = req.body
	const result = await db.query(
		'SELECT * FROM users_table WHERE u_email = $1;',
		[email]
	)
	const user = result.rows[0]

	if (!user || user.u_password !== password)
		return res
			.status(401)
			.json({ error: !user ? 'User not found' : 'Invalid password' })

	req.session.user = {
		firstName: user.u_name,
		email: user.u_email,
		phone: user.u_phone,
		address: user.u_address,
		city: user.u_city,
	}
	res.json({ message: 'Login successful', user: req.session.user })
}

const SessionUser = (req, res) => {
	req.session.user
		? res.json({ user: req.session.user })
		: res.status(401).json({ message: 'Not logged in' })
}

const LogoutUser = (req, res) => {
	req.session.destroy(() => {
		res.clearCookie('connect.sid')
		res.json({ message: 'Logged out successfully' })
	})
}

const DeleteUser = async (req, res) => {
	const userEmail = req.session.user?.email
	if (!userEmail) return res.status(401).json({ error: 'Not logged in' })
	try {
		const { rows } = await db.query(
			'SELECT u_id FROM users_table WHERE u_email = $1',
			[userEmail]
		)
		const userId = rows[0]?.u_id
		if (!userId) return res.status(404).json({ error: 'User not found' })
		await db.query('DELETE FROM order_history WHERE user_id = $1', [userId])
		const result = await db.query(
			'DELETE FROM users_table WHERE u_id = $1 RETURNING *;',
			[userId]
		)
		req.session.destroy(() => {
			res.clearCookie('connect.sid')
			res.json({
				message: 'Profile deleted successfully',
				deletedUser: result.rows[0],
			})
		})
	} catch {
		res.status(500).json({ error: 'Failed to delete profile' })
	}
}

const GetOrderHistory = async (req, res) => {
	const userEmail = req.session.user?.email
	if (!userEmail) return res.status(401).json({ error: 'Not logged in' })

	try {
		const orders = await db.query(
			`SELECT order_id, recipient_name, phone, email, address, product_id, product_name, quantity, created_at
       FROM order_history
       WHERE user_id = (SELECT u_id FROM users_table WHERE u_email = $1)
       ORDER BY created_at DESC`,
			[userEmail]
		)
		res.json({ orders: orders.rows })
	} catch {
		res.status(500).json({ error: 'Failed to fetch orders' })
	}
}

module.exports = {
	FetchUser,
	RegisterUser,
	UpdateUser,
	DeleteUser,
	AdminDeleteUser,
	SessionUser,
	LoginUser,
	LogoutUser,
	GetOrderHistory,
}
