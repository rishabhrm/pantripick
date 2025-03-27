import React, { useRef, useState, useEffect } from 'react'
import { assets, products } from '../../../assets/assets'
import { useNavigate } from 'react-router-dom'

const ProductList = () => {
    const navigate = useNavigate()
    const groupedProducts = products.reduce((acc, product) => {
        acc[product.category] = [...(acc[product.category] || []), product]
        return acc
    }, {})

    return (
        <div className='px-6 sm:px-16 lg:px-24 py-12'>
            {/* Heading */}
            <div className='relative inline-block mb-6'>
                <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
                    PRODUCTS <span className='font-bold'>AVAILABLE</span>
                </h2>
                <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
            </div>

            {/* Products by Category */}
            {Object.entries(groupedProducts).map(([category, items]) => {
                const scrollRef = useRef(null)
                const [showLeftButton, setShowLeftButton] = useState(false)

                useEffect(() => {
                    const handleScroll = () => {
                        setShowLeftButton(scrollRef.current?.scrollLeft > 0)
                    }
                    const scrollElement = scrollRef.current
                    if (scrollElement) {
                        scrollElement.addEventListener('scroll', handleScroll)
                    }
                    return () =>
                        scrollElement?.removeEventListener(
                            'scroll',
                            handleScroll
                        )
                }, [])

                const scroll = (direction) => {
                    scrollRef.current?.scrollBy({
                        left: direction * 300,
                        behavior: 'smooth',
                    })
                }

                return (
                    <div key={category} className='mb-8'>
                        <h3 className='text-black text-base sm:text-lg font-medium mt-5 mb-4'>
                            {category}
                        </h3>
                        <div className='relative'>
                            {showLeftButton && (
                                <button
                                    onClick={() => scroll(-1)}
                                    className='absolute left-0 top-1/2 transform -translate-y-1/2 p-1 z-10 text-xs sm:text-sm'
                                >
                                    <img
                                        src={assets.dropup_icon}
                                        alt='scroll-left'
                                    />
                                </button>
                            )}

                            <div
                                ref={scrollRef}
                                className='overflow-x-auto flex space-x-4 scrollbar-hide scroll-smooth'
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    overflowX: 'hidden',
                                }}
                            >
                                {items.map((product, index) => (
                                    <div
                                        key={index}
                                        className='border-gray-300 border rounded-lg p-4 shadow-md w-40 sm:w-48 flex-shrink-0 cursor-pointer'
                                        onClick={() =>
                                            navigate(
                                                `/product-details/${product.id}`
                                            )
                                        }
                                    >
                                        <div className='w-full h-36 sm:h-40 rounded-lg flex items-center justify-center'>
                                            <img
                                                className='max-h-32 sm:max-h-36 object-contain'
                                                src={product.image}
                                                alt={product.name}
                                            />
                                        </div>
                                        <p className='text-black text-xs sm:text-sm font-medium mt-3 text-left'>
                                            {product.name}
                                        </p>
                                        <p className='text-gray-500 text-xs sm:text-sm text-left'>
                                            ₹{product.price}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => scroll(1)}
                                className='absolute right-0 top-1/2 transform -translate-y-1/2 p-1 z-10 text-xs sm:text-sm'
                            >
                                <img
                                    src={assets.dropdown_icon}
                                    alt='scroll-right'
                                />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductList
