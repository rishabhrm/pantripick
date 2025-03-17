import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
    return (
        <div className='px-6 sm:px-16 lg:px-24 py-10 flex justify-center'>
            <div className='bg-white border border-gray-200 rounded-lg p-10 w-full max-w-md text-center'>
                <div className='flex justify-center mb-4'>
                    <span className='bg-green-500 text-white p-4 rounded-full text-3xl'>✔</span>
                </div>
                <h2 className='text-black text-2xl font-bold mb-2'>Thank You for Ordering!</h2>
                <p className='text-gray-600 mb-4'>Your order has been received!</p>
                <Link to='/products' className='bg-green-500 text-white px-4 py-2 rounded'>
                    continue shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
