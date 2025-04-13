import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import axios from 'axios'

function ResetPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Email is required.')
      return
    } else {
      setError('')
    }

    try {
      const res = await axios.post('http://localhost:4567/api/pass/req-reset', { email })

      if (res.status === 200) {
        setSuccess('A password reset link has been sent to your email.')
        setTimeout(() => {
          // Pass the email to the OTP page through state
          navigate('/otp', { state: { email } })
        }, 2000)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to send password reset link.')
      } else {
        setError('Server error, please try again later.')
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center h-screen '>
        <div className='bg-white p-8 rounded-lg shadow-md w-96'>
          <h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>
            Reset Password
          </h2>
          <p className='text-sm text-gray-500 text-center mb-6'>
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label className='text-gray-600 text-sm font-medium'>
              Email Address
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
              required
            />
            {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
            {success && <p className='text-green-500 text-sm mt-1'>{success}</p>}

            <button
              type='submit'
              className='mt-4 bg-gray-700 text-white py-2 rounded hover:bg-blue-800 transition'
            >
              Send Reset Link
            </button>
          </form>

          <div className='text-center mt-4'>
            <a href='/login' className='text-sm text-gray-500 hover:underline'>
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
