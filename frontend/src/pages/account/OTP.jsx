import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import axios from 'axios'

const OTP = () => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Use useEffect to set the email only once when the component mounts
  useEffect(() => {
    const emailFromState = location.state?.email
    if (emailFromState) {
      setEmail(emailFromState)
    }
  }, [location.state]) // Dependency array ensures this runs once when location.state changes

  const handleChange = (e) => {
    setOtp(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!otp.trim()) {
      setError('OTP is required.')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:4567/api/pass/validate-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp }),
        }
      )

      const data = await response.json()

      if (response.status !== 200) {
        setError(data.message || 'Invalid OTP. Please try again.')
      } else {
        // Proceed to change password page with OTP and email from state
        navigate('/change-password', { state: { otp, email } })
      }
    } catch (err) {
      console.error('Error in OTP validation:', err)
      setError('Server error. Please try again later.')
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center min-h-screen bg-yellow-100 p-15'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md border'>
          <h2 className='text-2xl font-bold text-center mb-3'>Enter OTP</h2>
          <p className='text-center text-red-500'>
            OTP has been sent to your email.
          </p>

          {error && <p className='text-red-500 text-center mb-3'>{error}</p>}

          <form onSubmit={handleSubmit} className='mt-4'>
            <input
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={handleChange}
              required
              className='w-full p-3 mb-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-lg'
            />
            <button
              type='submit'
              className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition text-lg'
            >
              Validate OTP
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default OTP
