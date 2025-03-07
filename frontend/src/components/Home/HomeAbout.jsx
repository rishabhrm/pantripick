import React from 'react'
import { assets } from '../../assets/assets'

const HomeAbout = () => {
    return (
        <div className='flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 lg:px-24 py-15'>
            {/* Left Side - Text Content */}
            <div className='w-full sm:w-1/2 text-center sm:text-left'>
                <div className='relative inline-block'>
                    <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
                        ABOUT <span className='font-bold'>US</span>
                    </h2>
                    <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
                </div>

                <p className='text-black mt-4 leading-relaxed'>
                    Your trusted neighborhood grocery shop, dedicated to
                    providing high-quality products that meet every shopper's
                    needs.
                </p>
                <p className='text-black mt-2'>
                    From fresh produce to daily essentials, we offer a wide
                    selection of items.
                </p>

                {/* Button */}
                <div className='mt-6'>
                    <button className='border border-green-600 text-green-600 px-6 py-2 rounded-md transition hover:bg-green-600 hover:text-white shadow-sm'>
                        Know More →
                    </button>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className='w-full sm:w-1/2 flex justify-center sm:justify-end mt-8 sm:mt-0'>
                <img
                    className='w-56 sm:w-72 lg:w-88 rounded-lg object-cover shadow-md'
                    src={assets.about_us_img}
                    alt='Grocery Store Aisle'
                />
            </div>
        </div>
    )
}

export default HomeAbout
