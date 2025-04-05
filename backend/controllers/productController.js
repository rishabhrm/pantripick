const { ConnectionObj } = require('../config/db')
const o1 = ConnectionObj()

const FetchProduct = async (req, res) => {
  const result = await o1.query('SELECT * FROM products;')
  const products = result.rows.map((product) => ({
    ...product,
    image: `${req.protocol}://${req.get('host')}/${product.image}`, // <- fixed
  }))
  res.json({ products })
}

const FetchProductById = async (req, res) => {
  const { id } = req.params
  const result = await o1.query('SELECT * FROM products WHERE id = $1;', [id])

  if (result.rows.length > 0) {
    const product = {
      ...result.rows[0],
      image: `${req.protocol}://${req.get('host')}/${result.rows[0].image}`, // <- fixed
    }
    res.json({ product })
  } else {
    res.status(404).json({ error: 'Product not found' })
  }
}

module.exports = {
  FetchProduct,
  FetchProductById
}