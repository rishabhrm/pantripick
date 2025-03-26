import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Hero = () => {
  return (
    <section className='flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 lg:px-24 py-20 sm:py-24'>
      {/* Left Side - Text Content */}
      <div className='w-full sm:w-1/2 text-center sm:text-left'>
        <h1 className='text-green-600 text-4xl sm:text-6xl font-bold leading-tight'>
          Fresh Groceries
        </h1>
        <h2 className='text-black text-xl sm:text-3xl font-medium mt-2'>
          Delivered straight to your door
        </h2>

        {/* Buttons */}
        <div className='mt-6 flex gap-4 justify-center sm:justify-start'>
          <Link
            to='/login'
            className='bg-green-600 text-white px-6 py-2 rounded-md transition hover:bg-green-700'
          >
            Get Started →
          </Link>
          <Link
            to='/products'
            className='border border-green-600 text-green-600 px-6 py-2 rounded-md transition hover:bg-green-100'
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className='w-full sm:w-1/2 flex justify-center sm:justify-end mt-8 sm:mt-0'>
        <img
          className='max-w-xs sm:max-w-md lg:max-w-lg object-cover rounded-xl shadow-md'
          src={assets.hero_img}
          alt='Fresh groceries delivered'
        />
      </div>
    </section>
  )
}

export default Hero
