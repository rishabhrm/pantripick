import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { assets } from '../../assets/assets'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Hardcoded credentials
    if (email === 'admin@gmail.com' && password === '1234') {
      navigate('/admin-users')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div
      className='relative w-full h-screen flex items-center justify-center overflow-hidden bg-cover bg-center'
      style={{ backgroundImage: "url('/Image/home.png')" }}
    >
      {/* Overlay */}
      <div className='flex flex-col items-center justify-center h-screen'></div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className='absolute w-2 h-2 bg-white bg-opacity-70 rounded-full animate-[float_5s_infinite_ease-in-out]'
          style={{
            top: `${20 + i * 10}%`,
            left: `${10 + i * 15}%`,
            animationDelay: `${i}s`,
          }}
        />
      ))}

      <motion.div
        className='flex w-1/2 max-w-3xl shadow-lg rounded-lg overflow-hidden bg-white bg-opacity-95 backdrop-blur-md relative z-10 animate-[fadeInSlide_1.2s_ease-in-out]'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <div className='flex-1 flex items-center justify-center p-5'>
          <img
            src={assets.SignupImage}
            alt='Admin Illustration'
            className='w-full max-w-xs max-h-80 object-contain transition-transform duration-500 hover:scale-110'
          />
        </div>
        <div className='flex-1 p-10 text-center'>
          <h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>ADMIN LOGIN</h2>
          <p className='text-sm text-gray-500 text-center mb-6'>Enter your email and password to login.</p>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <input
                type='email'
                className='w-full p-1 rounded border focus:border-blue-500 focus:ring-2 focus:ring-blue-230 transition-all'
                name='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mb-3'>
              <input
                type='password'
                className='w-full p-1 rounded border focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all'
                name='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className='text-red-500 mb-3'>{error}</p>}
            <motion.button
              type='submit'
              className='w-full p-3 rounded-md bg-gray-700 text-white font-bold transition-transform hover:bg-blue-500 active:bg-gray-500 hover:scale-105 shadow-lg'
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
