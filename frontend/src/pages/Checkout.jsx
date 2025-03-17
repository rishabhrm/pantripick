import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        pinCode: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order Placed:', formData);
    };

    return (
        <div className='px-6 sm:px-16 lg:px-24 py-10 flex justify-center'>
            <div className='bg-white border border-gray-200 rounded-lg p-10 w-full max-w-4xl'>
                <Link to='/cart' className='text-black flex items-center text-sm mb-6'>
                    <span className='mr-4'>&#8592;</span> Go Back to Cart
                </Link>
                <h2 className='text-black text-xl font-bold mb-4'>CHECK <span className='font-extrabold'>OUT</span></h2>
                <p className='text-lg font-semibold mb-4'>Total Amount to be paid: ₹323</p>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <input type='text' name='firstName' placeholder='First Name' value={formData.firstName} onChange={handleChange} className='border border-yellow-400 p-2 rounded'/>
                    <input type='text' name='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange} className='border border-yellow-400 p-2 rounded'/>
                    <input type='text' name='phone' placeholder='Phone number' value={formData.phone} onChange={handleChange} className='border border-yellow-400 p-2 rounded'/>
                    <input type='email' name='email' placeholder='Email address' value={formData.email} onChange={handleChange} className='border border-yellow-400 p-2 rounded'/>
                    <input type='text' name='address1' placeholder='Address Line 1' value={formData.address1} onChange={handleChange} className='border border-yellow-400 p-2 rounded col-span-2'/>
                    <input type='text' name='address2' placeholder='Address Line 2' value={formData.address2} onChange={handleChange} className='border border-yellow-400 p-2 rounded col-span-2'/>
                    <input type='text' name='city' placeholder='City' value={formData.city} onChange={handleChange} className='border border-yellow-400 p-2 rounded'/>
                    <input type='text' name='state' placeholder='State' value={formData.state} onChange={handleChange} className='border border-yellow-400 p-2 rounded'/>
                    <input type='text' name='pinCode' placeholder='PIN Code' value={formData.pinCode} onChange={handleChange} className='border border-yellow-400 p-2 rounded col-span-2'/>
                    <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded col-span-2'>Place Order</button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
