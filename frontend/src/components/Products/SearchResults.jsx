import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'
import { products } from '../../assets/assets'

const SearchResults = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('q') || ''
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='px-6 sm:px-16 lg:px-24 py-12'>
      {/* Back to Shopping */}
      <Link
        to='/products'
        className='text-black flex items-center text-sm mb-6'
      >
        <FiChevronLeft className='mr-2 text-lg' />
        Back to Products List
      </Link>
      <h2 className='text-black text-2xl sm:text-3xl font-normal'>
        SEARCH RESULTS FOR <span className='font-bold'>"{searchQuery}"</span>
      </h2>

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='border-gray-300 border rounded-lg p-4 shadow-md cursor-pointer'
              onClick={() => navigate(`/product-details/${product.id}`)}
            >
              <div className='w-full h-36 sm:h-40 flex items-center justify-center'>
                <img
                  className='max-h-32 sm:max-h-36 object-contain'
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <p className='text-black text-sm font-medium mt-3'>
                {product.name}
              </p>
              <p className='text-gray-500 text-sm'>₹{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-600 text-lg mt-6'>No products found.</p>
      )}
    </div>
  )
}

export default SearchResults
