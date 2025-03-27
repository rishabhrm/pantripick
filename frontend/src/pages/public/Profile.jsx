import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'

const UserProfile = () => {
  const navigate = useNavigate()
  // Dummy user data
  const user = {
    name: 'Shailendra',
    email: 'yayaya@example.com',
    phone: '+91 9876543210',
    address: '123, Green Street, Mumbai, India',
    orders: [
      {
        id: 'ORD12345',
        date: 'March 15, 2025',
        total: 1599,
        status: 'Delivered',
      },
      {
        id: 'ORD67890',
        date: 'April 2, 2025',
        total: 2499,
        status: 'Shipped',
      },
      {
        id: 'ORD12345',
        date: 'March 15, 2025',
        total: 1599,
        status: 'Delivered',
      },
      {
        id: 'ORD67890',
        date: 'April 2, 2025',
        total: 2499,
        status: 'Shipped',
      },
    ],
  }

  return (
    <div className='px-6 sm:px-16 lg:px-24 py-12'>
      {/* Back to Home */}
      <Link
        to='/'
        className='text-black flex items-center text-sm mb-4'
      >
        <FiChevronLeft className='mr-2 text-lg' />
        Back to Home
      </Link>
      <div className='relative inline-block mb-5'>
        <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
          USER <span className='font-bold'>PROFILE</span>
        </h2>
        <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
      </div>

      <p className='text-gray-700'>
        <strong>Name:</strong> {user.name}
      </p>
      <p className='text-gray-700'>
        <strong>Email:</strong> {user.email}
      </p>
      <p className='text-gray-700'>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p className='text-gray-700'>
        <strong>Address:</strong> {user.address}
      </p>

      <h3 className='text-black text-xl font-semibold mt-8'>Past Orders</h3>
      <div className='mt-4'>
        {user.orders.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {user.orders.map((order) => (
              <div
                key={order.id}
                className='border-gray-300 border rounded-lg p-4 shadow-md'
              >
                <p className='text-black font-medium'>Order ID: {order.id}</p>
                <p className='text-gray-600'>Date: {order.date}</p>
                <p className='text-gray-600'>Total: ₹{order.total}</p>
                <p
                  className={`text-sm font-semibold ${
                    order.status === 'Delivered'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`}
                >
                  Status: {order.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-600'>No past orders found.</p>
        )}
      </div>
    </div>
  )
}

export default UserProfile
