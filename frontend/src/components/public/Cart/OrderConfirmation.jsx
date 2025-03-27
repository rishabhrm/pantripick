import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../../assets/assets'

const OrderConfirmation = () => {
  return (
    <div className='flex items-center justify-center min-h-screen px-4 sm:px-14 lg:px-22'>
      <div className='bg-white border border-gray-200 rounded-lg p-12 w-full max-w-lg text-center'>
        <div className='flex justify-center mb-10'>
          <img
            src={assets.success_icon}
            alt='Order Confirmed'
            className='w-20 h-20'
          />
        </div>
        <h2 className='text-gray-800 text-3xl font-bold mb-10'>
          Thank You for Your Order!
        </h2>
        <p className='text-gray-600 text-md mb-7'>
          Your order has been successfully received.
        </p>
        <Link
          to='/products'
          className='mt-6 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition'
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation
