import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Checkout = () => {
  const { total } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pinCode: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Order Placed:', formData)
  }

  return (
    <div className='px-4 sm:px-12 lg:px-16 py-8 flex justify-center'>
      <div className='bg-white border border-gray-200 rounded-lg p-6 w-full max-w-3xl'>
        <Link to='/cart' className='text-black flex items-center text-sm mb-6'>
          <img src={assets.dropup_icon} width={9} alt='Back' className='mr-4' />
          Back to cart
        </Link>
        <div className='relative inline-block mb-6 py-3'>
          <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
            CHECK <span className='font-bold'>OUT</span>
          </h2>
          <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
        </div>
        <p className='text-md font-semibold mb-4'>
          Total Amount to be paid: ₹{total}
        </p>
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 sm:grid-cols-2 gap-4'
        >
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleChange}
            className='border border-gray-400 p-2 rounded'
          />
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleChange}
            className='border border-gray-400 p-2 rounded'
          />
          <input
            type='text'
            name='phone'
            placeholder='Phone number'
            value={formData.phone}
            onChange={handleChange}
            className='border border-gray-400 p-2 rounded'
          />
          <input
            type='email'
            name='email'
            placeholder='Email address'
            value={formData.email}
            onChange={handleChange}
            className='border border-gray-400 p-2 rounded'
          />
          <input
            type='text'
            name='address1'
            placeholder='Address Line 1'
            value={formData.address1}
            onChange={handleChange}
            className='border border-gray-400 p-2 rounded col-span-2'
          />
          <input
            type='text'
            name='address2'
            placeholder='Address Line 2'
            value={formData.address2}
            onChange={handleChange}
            className='border border-gray-400 p-2 rounded col-span-2'
          />
          <input
            type='text'
            name='city'
            placeholder='City'
            value={formData.city}
            onChange={handleChange}
            className='border border-gray-400 p-2 rounded'
          />
          <input
            type='text'
            name='state'
            placeholder='State'
            value={formData.state}
            onChange={handleChange}
            className='border border-gray-400 p-2 rounded'
          />
          <input
            type='text'
            name='pinCode'
            placeholder='PIN Code'
            value={formData.pinCode}
            onChange={handleChange}
            className='border border-gray-400 p-2 rounded col-span-2'
          />
          <button
            type='submit'
            className='col-span-2 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition'
            onClick={() => navigate(`/order-confirmation`)}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout
