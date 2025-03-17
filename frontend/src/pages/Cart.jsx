import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const cartItems = [
        { id: 1, name: 'Amul Taaza Milk', price: 27, quantity: 2, image: '/images/milk.png' },
        { id: 2, name: 'Aashirvaad Atta', price: 246, quantity: 1, image: '/images/atta.png' },
        { id: 3, name: 'Parle Poppins Candy', price: 23, quantity: 1, image: '/images/candy.png' },
    ];

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className='px-6 sm:px-16 lg:px-24 py-10 flex justify-center'>
            <div className='bg-white border border-gray-200 rounded-lg p-10 w-full max-w-4xl'>
                <Link to='/products' className='text-black flex items-center text-sm mb-6'>
                    <span className='mr-4'>&#8592;</span> Continue Shopping
                </Link>
                <h2 className='text-black text-xl font-bold mb-4'>YOUR CART</h2>
                <div className='border border-gray-200 rounded-lg'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='border-b border-gray-200'>
                                <th className='p-3'>Product</th>
                                <th className='p-3'>Price</th>
                                <th className='p-3'>Quantity</th>
                                <th className='p-3'>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id} className='border-b border-gray-200'>
                                    <td className='p-3 flex items-center'>
                                        <img src={item.image} alt={item.name} className='w-12 h-12 mr-4' />
                                        {item.name}
                                    </td>
                                    <td className='p-3'>₹{item.price}</td>
                                    <td className='p-3'>
                                        <button className='px-2 border border-gray-300 rounded'>-</button>
                                        <span className='mx-2'>{item.quantity}</span>
                                        <button className='px-2 border border-gray-300 rounded'>+</button>
                                    </td>
                                    <td className='p-3'>₹{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mt-4 text-right text-lg font-semibold'>
                    Total Amount: ₹{totalAmount}
                </div>
                <div className='text-right mt-4'>
                    <button className='bg-green-500 text-white px-4 py-2 rounded'>Proceed to check out</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
