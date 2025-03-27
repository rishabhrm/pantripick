import React, { useState } from 'react'
import { products } from '../../../assets/assets'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiChevronLeft, FiMinus, FiPlus } from 'react-icons/fi'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === Number(id))

  {
    /* Quantity Value */
  }
  const [quantity, setQuantity] = useState(1)
  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className='px-6 sm:px-16 lg:px-24 py-15 flex justify-center'>
      <div className='bg-white border border-gray-200 rounded-lg p-10 w-full max-w-5xl min-h-[550px] flex flex-col'>
        {/* Back to Shopping */}
        <Link
          to='/products'
          className='text-black flex items-center text-sm mb-6'
        >
          <FiChevronLeft className='mr-2 text-lg' />
          Continue Shopping
        </Link>

        {/* Product Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center flex-grow'>
          {/* Product Image */}
          <div className='flex justify-center'>
            <img
              src={product.image}
              alt={product.name}
              className='w-60 sm:w-80'
            />
          </div>

          {/* Product Info */}
          <div>
            <h2 className='text-black text-2xl sm:text-3xl font-semibold'>
              {product.name}
            </h2>
            <p className='text-gray-600 text-sm mt-2'>
              Category: {product.category}
            </p>
            <p className='text-gray-700 mt-4 line-clamp-4'>
              {product.description}
            </p>

            {/* Price and Quantity */}
            <div className='flex items-center space-x-54 mt-4'>
              <p className='text-black font-bold text-lg'>₹{product.price}</p>
              <p className='text-black font-bold text-lg'>Quantity</p>
            </div>
            <div className='flex items-center space-x-29 '>
              <p className='text-gray-500 text-sm'>(Inclusive of all taxes)</p>
              <p className='text-gray-500 text-sm'>6 Packets</p>
            </div>

            {/* Quantity Selector + Add to Cart */}
            <div className='flex items-center mt-6 space-x-32'>
              {/* Quantity Selector */}
              <div className='flex items-center border border-gray-300 rounded'>
                <button onClick={decreaseQuantity} className='px-3 py-2'>
                  <FiMinus />
                </button>
                <span className='px-4 py-2'>{quantity}</span>
                <button onClick={increaseQuantity} className='px-3 py-2'>
                  <FiPlus />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className='px-5 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition'
                onClick={() => navigate('/cart')}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
