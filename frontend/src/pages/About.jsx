import React from 'react'
import { aboutImages } from '../assets/assets'

function About() {
    return (
        <div className='px-6 sm:px-16 lg:px-24 py-15'>
            {/* Heading */}
            <div className='relative inline-block mb-6 py-3'>
                <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
                    ABOUT <span className='font-bold'>US</span>
                </h2>
                <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
            </div>

            {/* Image Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6'>
                {aboutImages.map((item, index) => (
                    <div key={index} className='flex flex-col items-center'>
                        <img
                            className='w-64 h-82 object-cover rounded-lg shadow-lg'
                            src={item.src}
                            alt={item.title}
                        />
                        <p className='text-black text-xs sm:text-sm mt-2 text-center'>
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>

            {/* Description */}
            <p className='text-sm sm:text-base text-justify text-black leading-relaxed px-1 pt-4'>
                Welcome to PantriPick, your trusted neighborhood grocery shop.
                We are dedicated to providing a variety of high-quality products
                to meet the needs of every shopper. From fresh produce to
                everyday essentials, we aim to offer a wide selection of items
                to make your shopping experience convenient and enjoyable.
            </p>
            <p className='text-sm sm:text-base text-justify text-black leading-relaxed px-1 mt-4'>
                Our focus is on quality, service, and making sure you have
                access to the products you love. Whether you're coming in for a
                quick grocery run or preparing for a big meal, we are here to
                support you with friendly service and a great selection.
            </p>
            <p className='text-sm sm:text-base text-justify text-black leading-relaxed px-1 mt-4'>
                Thank you for choosing us. We look forward to serving you!
            </p>
        </div>
    )
}

export default About