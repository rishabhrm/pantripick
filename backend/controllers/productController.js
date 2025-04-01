// productController.js
const { ConnectionObj } = require('../config/db');
const o1 = ConnectionObj();

// Existing function to fetch all products
const FetchProduct = async (req, res) => {
  try {
    const result = await o1.query('SELECT * FROM products;');
    if (result && Array.isArray(result.rows)) {
      const products = result.rows.map((product) => ({
        ...product,
        image: `${req.protocol}://${req.get('host')}/images/${product.image}`
      }));
      res.json({ products });
    } else {
      throw new Error('Expected an array of products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


// New function to fetch a single product by its ID
const FetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await o1.query('SELECT * FROM products WHERE id = $1;', [id]);
    if (result && result.rows.length > 0) {
      res.json({ product: result.rows[0] });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({
      error: 'Failed to fetch product',
      details: error.message || 'Unknown error'
    });
  }
};

module.exports = {
  FetchProduct,
  FetchProductById,
};
