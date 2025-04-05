import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiChevronLeft, FiMinus, FiPlus } from 'react-icons/fi';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4567/api/products/${id}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!product?.id) return;

    try {
      await axios.post(
        'http://localhost:4567/api/cart/add',
        {
          productId: product.id,
          quantity: quantity,
        },
        {
          withCredentials: true,
        }
      );
      navigate('/cart');
    } catch (err) {
      console.error('Error adding to cart:', err.response?.data || err.message);
      alert('Something went wrong while adding to cart.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="px-6 sm:px-16 lg:px-24 py-15 flex justify-center">
      <div className="bg-white border border-gray-200 rounded-lg p-10 w-full max-w-5xl min-h-[550px] flex flex-col">
        <Link to="/products" className="text-black flex items-center text-sm mb-6">
          <FiChevronLeft className="mr-2 text-lg" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center flex-grow">
          <div className="flex justify-center">
            <img src={product.image} alt={product.name} className="w-60 sm:w-80" />
          </div>

          <div>
            <h2 className="text-black text-2xl sm:text-3xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm mt-2">Category: {product.category}</p>
            <p className="text-gray-700 mt-4 line-clamp-4">{product.description}</p>

            <div className="flex items-center space-x-54 mt-4">
              <p className="text-black font-bold text-lg">₹{product.price}</p>
              <p className="text-black font-bold text-lg">Quantity</p>
            </div>
            <div className="flex items-center space-x-29">
              <p className="text-gray-500 text-sm">(Inclusive of all taxes)</p>
              <p className="text-gray-500 text-sm">6 Packets</p>
            </div>

            <div className="flex items-center mt-6 space-x-32">
              <div className="flex items-center border border-gray-300 rounded">
                <button onClick={decreaseQuantity} className="px-3 py-2">
                  <FiMinus />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button onClick={increaseQuantity} className="px-3 py-2">
                  <FiPlus />
                </button>
              </div>

              <button
                className="px-5 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
