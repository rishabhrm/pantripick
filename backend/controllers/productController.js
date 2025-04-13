const { ConnectionObj } = require('../config/db')
const db = ConnectionObj()

const fetchProduct = async (req, res) => {
	try {
		const result = await db.query('SELECT * FROM products;')
		const products = result.rows.map((product) => ({
			...product,
			image: `${req.protocol}://${req.get('host')}/images/${product.image}`,
		}))
		res.json({ products })
	} catch (error) {
		console.error('Error fetching products:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

const fetchProductById = async (req, res) => {
	const { id } = req.params
	try {
		const result = await db.query('SELECT * FROM products WHERE id = $1;', [id])

		if (result.rows.length > 0) {
			const product = {
				...result.rows[0],
				image: `${req.protocol}://${req.get('host')}/images/${
					result.rows[0].image
				}`,
			}
			res.json({ product })
		} else {
			res.status(404).json({ error: 'Product not found' })
		}
	} catch (error) {
		console.error('Error fetching product by ID:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

const addProduct = async (req, res) => {
	const { name, category, price, description, quantity } = req.body
	const image = req.file ? req.file.filename : null

	try {
		const result = await db.query(
			`INSERT INTO products (name, category, price, description, image, quantity, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *;`,
			[name, category, price, description, image, quantity]
		)

		const newProduct = result.rows[0]
		res
			.status(201)
			.json({ message: 'Product added successfully', product: newProduct })
	} catch (error) {
		console.error('Error adding product:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

const deleteProduct = async (req, res) => {
	const { id } = req.params

	try {
		const result = await db.query(
			'DELETE FROM products WHERE id = $1 RETURNING *;',
			[id]
		)

		if (result.rowCount > 0) {
			res.status(200).json({ message: 'Product removed successfully' })
		} else {
			res.status(404).json({ error: 'Product not found' })
		}
	} catch (error) {
		console.error(`Error deleting product with id ${id}:`, error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

const updateQuantity = async (req, res) => {
	const { id, change } = req.body
	try {
		const checkProduct = await db.query(
			'SELECT * FROM products WHERE id = $1;',
			[id]
		)

		if (checkProduct.rows.length === 0) {
			return res.status(404).json({ error: 'Product not found' })
		}

		const currentQuantity = checkProduct.rows[0].quantity

		const newQuantity = currentQuantity + change

		if (newQuantity < 0) {
			return res.status(400).json({ error: 'Quantity cannot be negative' })
		}

		const result = await db.query(
			'UPDATE products SET quantity = $1 WHERE id = $2 RETURNING *;',
			[newQuantity, id]
		)

		const updatedProduct = result.rows[0]

		res.json({
			message: 'Quantity updated successfully',
			product: updatedProduct,
		})
	} catch (error) {
		console.error('Error updating product quantity:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

module.exports = {
	fetchProduct,
	fetchProductById,
	addProduct,
	deleteProduct,
	updateQuantity
}