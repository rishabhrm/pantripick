import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import axios from 'axios';

const CartItems = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:4567/api/cart', {
        withCredentials: true,
      });
      setCartItems(response.data.cart || []);
    } catch (err) {
      console.error('Failed to load cart:', err.response?.data || err.message);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, change) => {
    const item = cartItems.find((item) => item.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) return; // Don't allow less than 1

    try {
      await axios.post(
        'http://localhost:4567/api/cart/add',
        {
          productId,
          quantity: change, // Just send the delta
        },
        { withCredentials: true }
      );
      fetchCartItems(); // Refresh after update
    } catch (err) {
      console.error('Failed to update quantity:', err.response?.data || err.message);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.post(
        'http://localhost:4567/api/cart/remove',
        { productId },
        { withCredentials: true }
      );
      fetchCartItems(); // Refresh after remove
    } catch (err) {
      console.error('Failed to remove item:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <div className="text-center py-20">Loading cart...</div>;

  return (
    <div className='px-6 sm:px-16 lg:px-24 py-10 flex justify-center'>
      <div className='bg-white border border-gray-200 rounded-lg p-10 w-full max-w-4xl'>
        <Link to='/products' className='text-black flex items-center text-sm mb-6'>
          <FiChevronLeft className='mr-2 text-lg' />
          Continue Shopping
        </Link>

        <div className='relative inline-block mb-6'>
          <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
            YOUR <span className='font-bold'>CART</span>
          </h2>
          <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className='border border-gray-200 rounded-lg overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='border-b border-gray-200'>
                    <th className='p-3'>Product</th>
                    <th className='p-3'>Price</th>
                    <th className='p-3'>Quantity</th>
                    <th className='p-3'>Cost</th>
                    <th className='p-3'>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(({ id, image, name, price, quantity }) => (
                    <tr key={id} className='border-b border-gray-200'>
                      <td className='p-3 flex items-center'>
                        <img src={image} alt={name} className='w-12 h-12 mr-4 object-cover rounded' />
                        {name}
                      </td>
                      <td className='p-3'>₹{price}</td>
                      <td className='p-3'>
                        <button
                          onClick={() => updateQuantity(id, -1)}
                          className='px-2 border border-gray-300 rounded'
                        >
                          -
                        </button>
                        <span className='mx-2'>{quantity}</span>
                        <button
                          onClick={() => updateQuantity(id, 1)}
                          className='px-2 border border-gray-300 rounded'
                        >
                          +
                        </button>
                      </td>
                      <td className='p-3'>₹{(price * quantity).toFixed(2)}</td>
                      <td className='p-3'>
                        <button
                          onClick={() => removeItem(id)}
                          className='text-red-600 hover:underline'
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='mt-4 text-right text-lg font-semibold'>
              Total Amount: ₹{total.toFixed(2)}
            </div>

            <div className='text-right mt-4'>
              <button
                onClick={() => navigate(`/checkout/${total.toFixed(2)}`)}
                className='mt-6 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition'
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItems;
