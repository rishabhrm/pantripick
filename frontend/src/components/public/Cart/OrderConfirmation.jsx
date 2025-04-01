import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheckCircle } from 'react-icons/fi';

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedAddress = JSON.parse(localStorage.getItem('checkoutForm')) || {};

    const totalPrice = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setOrderDetails({ cart: storedCart, address: storedAddress });
    setTotal(totalPrice);
  }, []);

  return (
    <div className="px-4 sm:px-12 lg:px-16 py-10 flex justify-center">
      <div className="bg-white border border-gray-200 rounded-lg p-8 w-full max-w-3xl shadow-md">
        <Link to="/" className="text-black flex items-center text-sm mb-6">
          <FiChevronLeft className="mr-2 text-lg" />
          Continue Shopping
        </Link>

        <div className="text-center mb-6">
          <FiCheckCircle className="text-green-600 text-4xl mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-black">Order Confirmed!</h2>
          <p className="text-gray-600">Thank you for your purchase.</p>
        </div>

        {orderDetails && (
          <>
            <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
            <div className="border border-gray-200 rounded-lg mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3">Product</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.cart.map(({ id, image, name, price, quantity }) => (
                    <tr key={id} className="border-b border-gray-200">
                      <td className="p-3 flex items-center">
                        <img src={image} alt={name} className="w-12 h-12 mr-4" />
                        {name}
                      </td>
                      <td className="p-3">₹{price}</td>
                      <td className="p-3">{quantity}</td>
                      <td className="p-3">₹{price * quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mb-3">Shipping Details</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700"><strong>Name:</strong> {orderDetails.address.firstName} {orderDetails.address.lastName}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {orderDetails.address.phone}</p>
              <p className="text-gray-700"><strong>Email:</strong> {orderDetails.address.email}</p>
              <p className="text-gray-700"><strong>Address:</strong> {orderDetails.address.address1}, {orderDetails.address.address2}</p>
              <p className="text-gray-700"><strong>City:</strong> {orderDetails.address.city}, {orderDetails.address.state} - {orderDetails.address.pinCode}</p>
            </div>

            <div className="mt-6 text-lg font-semibold text-right">
              Total Paid: <span className="text-green-600">₹{total}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
