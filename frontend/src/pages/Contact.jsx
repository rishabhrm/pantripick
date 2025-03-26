import React from 'react'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div className='px-6 sm:px-16 lg:px-24 py-15'>
      {/* Heading */}
      <div className='relative inline-block mb-6 py-3'>
        <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
          CONTACT <span className='font-bold'>US</span>
        </h2>
        <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
      </div>

      {/* Image Section */}
      <div className='flex flex-col sm:flex-row items-center gap-6 mb-6'>
        <img
          className='w-78 h-86 object-cover rounded-lg shadow-lg'
          src={assets.img2}
          alt='Our Store'
        />

        {/* Contact Details */}
        <div className='text-black'>
          <h3 className='text-xl sm:text-2xl font-semibold text-black-700 mb-3'>
            Our Store
          </h3>
          <p className='text-sm sm:text-base'>Address Line 1</p>
          <p className='text-sm sm:text-base'>Address Line 2</p>
          <p className='text-sm sm:text-base mt-4'>
            <span className='font-semibold'>Tel:</span> (Your Phone Number)
          </p>
          <p className='text-sm sm:text-base'>
            <span className='font-semibold'>Email:</span> (Your Email Address)
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact