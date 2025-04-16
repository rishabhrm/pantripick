const { ConnectionObj } = require('../config/db')
const db = ConnectionObj()

const placeOrder = async (req, res) => {
	const userEmail = req.session.user?.email
	const { recipient_name, phone, email, address } = req.body

	if (!userEmail) return res.status(401).json({ error: 'Not logged in' })

	try {
		const userResult = await db.query(
			'SELECT u_id FROM users_table WHERE u_email = $1',
			[userEmail]
		)
		if (userResult.rowCount === 0)
			return res.status(404).json({ error: 'User not found' })

		const userId = userResult.rows[0].u_id

		const cartItemsResult = await db.query(
			'SELECT product_id, quantity FROM cart_table WHERE user_email = $1',
			[userEmail]
		)
		const cartItems = cartItemsResult.rows

		if (cartItems.length === 0)
			return res.status(400).json({ error: 'Cart is empty' })

		const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`

		for (const item of cartItems) {
			const productRes = await db.query(
				'SELECT name, quantity FROM products WHERE id = $1',
				[item.product_id]
			)
			const product = productRes.rows[0]

			const productName = product?.name || 'Unknown'
			const availableQty = product?.quantity || 0

			if (item.quantity > availableQty) {
				return res.status(400).json({
					error: `Insufficient stock for ${productName}`,
				})
			}

			await db.query(
				`INSERT INTO order_history (
            order_id, user_id, recipient_name, phone, email, address,
            product_id, product_name, quantity, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
				[
					orderId,
					userId,
					recipient_name,
					phone,
					email,
					address,
					item.product_id,
					productName,
					item.quantity,
					'Confirmed',
				]
			)
			await db.query(
				'UPDATE products SET quantity = quantity - $1 WHERE id = $2',
				[item.quantity, item.product_id]
			)
		}
		await db.query('DELETE FROM cart_table WHERE user_email = $1', [userEmail])
		res.json({ message: 'Order placed successfully', orderId })
	} catch (err) {
		console.error('Error placing order:', err)
		res.status(500).json({ error: 'Internal server error' })
	}
}

const getOrderHistory = async (req, res) => {
	const userEmail = req.session.user?.email
	if (!userEmail) return res.status(401).json({ error: 'Not logged in' })
	try {
		const orders = await db.query(
			`SELECT order_id, recipient_name, phone, email, address, product_id, product_name, quantity, created_at, status
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

const updateStatus = async (req, res) => {
	const { orderId } = req.params
	const { status } = req.body

	if (!['Confirmed', 'Rejected', 'Delivered', 'Cancelled'].includes(status)) {
		return res.status(400).json({ error: 'Invalid status value' })
	}

	try {
		const result = await db.query(
			'UPDATE order_history SET status = $1 WHERE order_id = $2',
			[status, orderId]
		)

		if (result.rowCount > 0) {
			return res.status(200).json({
				message: `Order ${orderId} status updated to ${status}.`,
			})
		} else {
			return res
				.status(404)
				.json({ error: 'Order not found' })
		}
	} catch (error) {
		console.error('Error updating order status:', error)
		return res.status(500).json({ error: 'Failed to update order status' })
	}
}

const getAllOrders = async (req, res) => {
	try {
		const orders = await db.query(
			`SELECT order_id, recipient_name, phone, email, address, product_id, product_name, quantity, created_at, status, 
			(SELECT u_name FROM users_table WHERE u_id = order_history.user_id) AS user_name,
			(SELECT u_address FROM users_table WHERE u_id = order_history.user_id) AS user_address
			FROM order_history
			ORDER BY created_at DESC`
		)
		res.json({ orders: orders.rows })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Failed to fetch orders' })
	}
}

const deleteOrders = async (req, res) => {
	const { orderId } = req.params
	try {
		const result = await db.query(
			'DELETE FROM order_history WHERE order_id = $1',
			[orderId]
		)

		if (result.rowCount > 0) {
			return res.status(200).json({
				message: `All orders with Order ID ${orderId} removed successfully`,
			})
		} else {
			return res
				.status(404)
				.json({ error: 'No orders found with that Order ID' })
		}
	} catch (error) {
		console.error('Error removing orders:', error)
		return res.status(500).json({ error: 'Failed to remove orders' })
	}
}

module.exports = {
	placeOrder,
	getOrderHistory,
	getAllOrders,
	updateStatus,
	deleteOrders
}