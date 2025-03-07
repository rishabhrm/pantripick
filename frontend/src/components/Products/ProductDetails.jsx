import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { assets, products } from '../../assets/assets'

const ProductDetails = () => {
    const { id } = useParams()
    const product = products.find((item) => item.id === Number(id))

    if (!product) {
        return (
            <div className='text-center text-red-500 mt-10'>
                Product not found.
            </div>
        )
    }

    return (
        <div className='px-6 sm:px-16 lg:px-24 py-15 flex justify-center'>
            <div className='bg-white shadow-lg rounded-lg p-10 w-full max-w-5xl'>
                {/* Back to Shopping */}
                <Link
                    to='/products'
                    className='text-black flex items-center text-sm mb-6'
                >
                    <span className='mr-2'>
                        <img src={assets.dropup_icon} width={9} alt='Back' />
                    </span>
                    Continue Shopping
                </Link>

                {/* Product Details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
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
                        <p className='text-gray-700 mt-4'>
                            {product.description}
                        </p>
                        <p className='text-black font-bold text-lg mt-4'>
                            ₹{product.price}
                        </p>
                        <p className='text-gray-500 text-sm'>
                            (Inclusive of all taxes)
                        </p>

                        <button className='mt-6 px-5 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition'>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
