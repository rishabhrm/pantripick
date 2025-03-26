import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cartItems as initialCart } from '../../assets/assets'
import { FiChevronLeft } from 'react-icons/fi'

const CartItems = () => {
  const [cart, setCart] = useState(initialCart)
  const navigate = useNavigate()

  const changeQuantity = (id, amount) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='px-6 sm:px-16 lg:px-24 py-10 flex justify-center'>
      <div className='bg-white border border-gray-200 rounded-lg p-10 w-full max-w-4xl'>
        <Link
          to='/products'
          className='text-black flex items-center text-sm mb-6'
        >
          <FiChevronLeft className='mr-2 text-lg' />
          Continue Shopping
        </Link>
        <div className='relative inline-block mb-6'>
          <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
            YOUR <span className='font-bold'>CART</span>
          </h2>
          <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
        </div>
        <div className='border border-gray-200 rounded-lg'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-gray-200'>
                <th className='p-3'>Product</th>
                <th className='p-3'>Price</th>
                <th className='p-3'>Quantity</th>
                <th className='p-3'>Cost</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ id, image, name, price, quantity }) => (
                <tr key={id} className='border-b border-gray-200'>
                  <td className='p-3 flex items-center'>
                    <img src={image} alt={name} className='w-12 h-12 mr-4' />
                    {name}
                  </td>
                  <td className='p-3'>₹{price}</td>
                  <td className='p-3'>
                    <button
                      onClick={() => changeQuantity(id, -1)}
                      className='px-2 border border-gray-300 rounded'
                    >
                      -
                    </button>
                    <span className='mx-2'>{quantity}</span>
                    <button
                      onClick={() => changeQuantity(id, 1)}
                      className='px-2 border border-gray-300 rounded'
                    >
                      +
                    </button>
                  </td>
                  <td className='p-3'>₹{price * quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-4 text-right text-lg font-semibold'>
          Total Amount: ₹{total}
        </div>
        <div className='text-right mt-4'>
          <button
            onClick={() => navigate(`/checkout/${total}`)}
            className='mt-6 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition'
          >
            Proceed to check out
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItems
