import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ResetPassword() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!email.trim()) {
			toast.error('Email is required.', {
				autoClose: 500,
				hideProgressBar: true,
			})
			return
		}

		try {
			const res = await axios.post('http://localhost:4567/api/pass/req-reset', {
				email,
			})

			if (res.status === 200) {
				toast.success('A password reset link has been sent to your email.', {
					autoClose: 500,
					hideProgressBar: true,
				})
				setTimeout(() => {
					navigate('/otp', { state: { email } })
				}, 500)
			}
		} catch (err) {
			if (err.response && err.response.data) {
				toast.error(
					err.response.data.message || 'Failed to send password reset link.', {
						autoClose: 500,
						hideProgressBar: true,
					}
				)
			} else {
				toast.error('Server error, please try again later.'), {
					autoClose: 500,
					hideProgressBar: true,
				}
			}
		}
	}

	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center h-screen'>
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