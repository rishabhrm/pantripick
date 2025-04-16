import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault()

		if (!email || !password) {
			toast.error('Please fill in both fields.')
			return
		}

		try {
			const response = await axios.post(
				'http://localhost:4567/api/users/login-user',
				{ email, password },
				{ withCredentials: true }
			)

			if (response.data && response.data.user) {
				toast.success('Login successful!', {
					autoClose: 500,
					hideProgressBar: true,
				})
				setTimeout(() => {
					navigate('/')
					window.location.reload()
				}, 500)
			} else {
				toast.error('Invalid Credentials.', {
					autoClose: 500,
					hideProgressBar: true,
				})
			}
		} catch (error) {
			toast.error('Login failed. Please check your credentials.', {
				autoClose: 500,
				hideProgressBar: true,
			})
		}
	}

	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center h-screen '>
				<div className='bg-white p-8 rounded-lg shadow-md w-96'>
					<h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>
						Login Here
					</h2>
					<p className='text-sm text-gray-500 text-center mb-6'>
						Enter your email and password to login.
					</p>
					<form onSubmit={handleLogin}>
						<label className='text-gray-600 text-sm font-medium'>
							Email Address
						</label>
						<input
							type='email'
							placeholder='Enter your email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 mb-2'
							required
						/>
						<label className='text-gray-600 text-sm font-medium'>
							Password
						</label>
						<input
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4'
							required
						/>
						<button
							type='submit'
							className='w-full bg-gray-700 text-white py-2 rounded-md mb-2 hover:bg-blue-800 transition'
						>
							Login
						</button>
					</form>
					<button
						type='button'
						onClick={() => navigate('/admin-login')}
						className='w-full bg-red-500 text-white py-2 rounded-md hover:opacity-80'
					>
						Admin Login
					</button>
					<div className='flex justify-center items-center mt-4 text-sm space-x-2'>
						<a
							href='/reset-password'
							className='text-sm text-gray-500 hover:underline'
						>
							Forgot Password?
						</a>
						<span className='text-black-500'>|</span>
						<a href='/signup' className='text-sm text-gray-500 hover:underline'>
							Sign Up
						</a>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
