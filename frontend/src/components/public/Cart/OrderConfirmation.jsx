import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiCheckCircle } from 'react-icons/fi'
import axios from 'axios'

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchCartAndAddress = async () => {
      const res = await axios.get('http://localhost:4567/api/cart', {
        withCredentials: true,
      })

      const cartItems = res.data.cart || []

      const storedAddress =
        JSON.parse(localStorage.getItem('checkoutForm')) || {}

      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      setOrderDetails({ cart: cartItems, address: storedAddress })
      setTotal(totalPrice)
    }

    fetchCartAndAddress()
  }, [])

  return (
    <div className='px-4 sm:px-12 lg:px-16 py-10 flex justify-center'>
      <div className='bg-white border border-gray-200 rounded-lg p-8 w-full max-w-3xl shadow-md'>
        <Link
          to={`/checkout/${total}`}
          className='text-black flex items-center text-sm mb-6'
        >
          <FiChevronLeft className='mr-2 text-lg' />
          Back to checkout
        </Link>

        <div className='text-center mb-6'>
          <FiCheckCircle className='text-green-600 text-4xl mx-auto mb-3' />
          <h2 className='text-2xl font-bold text-black'>Order Confirmed!</h2>
          <p className='text-gray-600'>Thank you for your purchase.</p>
        </div>

        {orderDetails && (
          <>
            <h3 className='text-lg font-semibold mb-3'>Order Summary</h3>
            <div className='border border-gray-200 rounded-lg mb-6 overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='border-b border-gray-200'>
                    <th className='p-3'>Product</th>
                    <th className='p-3'>Price</th>
                    <th className='p-3'>Quantity</th>
                    <th className='p-3'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.cart.length === 0 && (
                    <tr>
                      <td colSpan='4' className='text-center text-gray-500 p-4'>
                        Your cart was empty.
                      </td>
                    </tr>
                  )}
                  {orderDetails.cart.length > 0 &&
                    orderDetails.cart.map(
                      ({ id, image, name, price, quantity }) => (
                        <tr key={id} className='border-b border-gray-200'>
                          <td className='p-3 flex items-center'>
                            <img
                              src={`http://localhost:4567/${image}`}
                              alt={name}
                              className='w-12 h-12 mr-4 object-cover rounded'
                            />
                            {name}
                          </td>
                          <td className='p-3'>₹{price}</td>
                          <td className='p-3'>{quantity}</td>
                          <td className='p-3'>
                            ₹{(price * quantity).toFixed(2)}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>

            <h3 className='text-lg font-semibold mb-3'>Shipping Details</h3>
            <div className='border border-gray-200 rounded-lg p-4'>
              <p className='text-gray-700'>
                <strong>Name:</strong> {orderDetails.address.firstName}{' '}
                {orderDetails.address.lastName}
              </p>
              <p className='text-gray-700'>
                <strong>Phone:</strong> {orderDetails.address.phone}
              </p>
              <p className='text-gray-700'>
                <strong>Email:</strong> {orderDetails.address.email}
              </p>
              <p className='text-gray-700'>
                <strong>Address:</strong> {orderDetails.address.address1},{' '}
                {orderDetails.address.address2}
              </p>
              <p className='text-gray-700'>
                <strong>City:</strong> {orderDetails.address.city},{' '}
                {orderDetails.address.state} - {orderDetails.address.pinCode}
              </p>
            </div>

            <div className='mt-6 flex justify-between items-center'>

            <div className='text-lg font-semibold text-right'>
                Total:{' '}
                <span className='text-green-600'>₹{total.toFixed(2)}</span>
              </div>

              <Link
                to='/'
                className='bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition'
              >
                Proceed to Payment
              </Link>

             
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderConfirmation
