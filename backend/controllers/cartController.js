const db = require('../config/db').ConnectionObj()

const getCart = async (req, res) => {
	const userEmail = req.session.user?.email
	if (!userEmail) return res.status(401).json({ error: 'Not logged in' })

	const result = await db.query(
		`
    SELECT 
      p.id,
      p.name,
      p.price,
      p.image,
      c.quantity
    FROM cart_table c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_email = $1
    ORDER BY p.id
    `,
		[userEmail]
	)

	res.json({ cart: result.rows || [] })
}

const addToCart = async (req, res) => {
	const userEmail = req.session.user?.email
	const { productId, quantity } = req.body

	if (!userEmail) return res.status(401).json({ error: 'Not logged in' })
	if (!productId || !Number.isInteger(quantity) || quantity <= 0) {
		return res.status(400).json({ error: 'Invalid product or quantity' })
	}

	// Check if product is available in stock
	const productResult = await db.query(
		'SELECT quantity FROM products WHERE id = $1',
		[productId]
	)
	const productQty = productResult.rows[0]?.quantity

	if (!productQty || productQty === 0) {
		return res.status(400).json({ error: 'Product not available' })
	}

	const existing = await db.query(
		'SELECT quantity FROM cart_table WHERE user_email = $1 AND product_id = $2',
		[userEmail, productId]
	)

	if (existing.rowCount > 0) {
		await db.query(
			'UPDATE cart_table SET quantity = quantity + $1 WHERE user_email = $2 AND product_id = $3',
			[quantity, userEmail, productId]
		)
	} else {
		await db.query(
			'INSERT INTO cart_table (user_email, product_id, quantity) VALUES ($1, $2, $3)',
			[userEmail, productId, quantity]
		)
	}

	res.json({ message: 'Cart updated successfully' })
}

const updateQuantity = async (req, res) => {
	const userEmail = req.session.user?.email
	const { productId, change } = req.body

	if (!userEmail) return res.status(401).json({ error: 'Not logged in' })
	if (!productId || !Number.isInteger(change)) {
		return res.status(400).json({ error: 'Invalid request' })
	}

	const result = await db.query(
		'UPDATE cart_table SET quantity = quantity + $1 WHERE user_email = $2 AND product_id = $3 RETURNING quantity',
		[change, userEmail, productId]
	)

	if (result.rowCount === 0) {
		return res.status(404).json({ error: 'Item not found in cart' })
	}

	const newQty = result.rows[0].quantity

	if (newQty <= 0) {
		await db.query(
			'DELETE FROM cart_table WHERE user_email = $1 AND product_id = $2',
			[userEmail, productId]
		)
	}

	res.json({ message: 'Quantity updated' })
}

const removeFromCart = async (req, res) => {
	const userEmail = req.session.user?.email
	const { productId } = req.body

	if (!userEmail) return res.status(401).json({ error: 'Not logged in' })
	if (!productId)
		return res.status(400).json({ error: 'Product ID is required' })

	await db.query(
		'DELETE FROM cart_table WHERE user_email = $1 AND product_id = $2',
		[userEmail, productId]
	)

	res.json({ message: 'Item removed from cart' })
}

module.exports = {
	getCart,
	addToCart,
	updateQuantity,
	removeFromCart
}