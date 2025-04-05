import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:4567/api/users/session-user', {
        withCredentials: true, // crucial for session cookies
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error('Error fetching user from session:', err);
        navigate('/login'); // redirect if not logged in
      });
  }, [navigate]);

  return (
    <div className='px-6 sm:px-16 lg:px-24 py-12'>
      {/* Back to Home */}
      <Link to='/' className='text-black flex items-center text-sm mb-4'>
        <FiChevronLeft className='mr-2 text-lg' />
        Back to Home
      </Link>
      <div className='relative inline-block mb-5'>
        <h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
          USER <span className='font-bold'>PROFILE</span>
        </h2>
        <span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
      </div>

      {!user ? (
        <p className='text-gray-500'>Loading user...</p>
      ) : (
        <>
          <p className='text-gray-700'>
            <strong>Name:</strong> {user.firstName}
          </p>
          <p className='text-gray-700'>
            <strong>Email:</strong> {user.email}
          </p>
          <p className='text-gray-700'>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className='text-gray-700'>
            <strong>Address:</strong> {user.address}
          </p>

          <h3 className='text-black text-xl font-semibold mt-8'>
            Past Orders
          </h3>
          <div className='mt-4'>
            {/* Dummy static orders */}
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className='border-gray-300 border rounded-lg p-4 shadow-md mt-4'
              >
                <p className='text-black font-medium'>
                  Order ID: ORD1234{i}
                </p>
                <p className='text-gray-600'>Date: April {i + 1}, 2025</p>
                <p className='text-gray-600'>Total: ₹{1000 + i * 500}</p>
                <p
                  className={`text-sm font-semibold ${
                    i % 2 === 0 ? 'text-green-600' : 'text-blue-600'
                  }`}
                >
                  Status: {i % 2 === 0 ? 'Delivered' : 'Shipped'}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
