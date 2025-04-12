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
        'SELECT name FROM products WHERE id = $1',
        [item.product_id]
      )
      const productName = productRes.rows[0]?.name || 'Unknown'

      await db.query(
        `INSERT INTO order_history (
          order_id, user_id, recipient_name, phone, email, address,
          product_id, product_name, quantity
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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
        ]
      )
    }

    await db.query('DELETE FROM cart_table WHERE user_email = $1', [userEmail])

    res.json({ message: 'Order placed successfully', orderId })
  } catch (err) {
    console.error('Error placing order:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  placeOrder
}
