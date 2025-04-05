import React from 'react'
import { Link } from 'react-router-dom'
import { homeCategories } from '../../../assets/assets'

const ProductCategories = () => (
  <div className='px-6 sm:px-16 lg:px-24 py-8'>
    <div className='relative inline-block mb-6'>
      <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
        PRODUCTS <span className='font-bold'>CATEGORIES</span>
      </h2>
      <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
    </div>

    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 py-4'>
      {homeCategories.map((category, index) => (
        <Link
          to='/products'
          key={index}
          className='flex flex-col items-center cursor-pointer'
        >
          <div className='w-28 h-28 sm:w-32 sm:h-32 bg-blue-50 rounded-xl flex items-center justify-center shadow'>
            <img src={category.image} alt={category.name} />
          </div>
          <p className='text-black text-xs sm:text-sm mt-2 font-normal text-center'>
            {category.name}
          </p>
        </Link>
      ))}
    </div>
  </div>
)

export default ProductCategories