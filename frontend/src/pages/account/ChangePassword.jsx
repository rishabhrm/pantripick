import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import axios from 'axios'

function ChangePassword() {
	const navigate = useNavigate()
	const location = useLocation()

	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)
	const otp = location?.state?.otp
	const email = location?.state?.email

	console.log('Location state:', location.state) // Debugging log to check if email is passed correctly

	useEffect(() => {
		if (!otp) {
			navigate('/otp') // Redirect to OTP page if OTP is not available
		}
	}, [otp, navigate])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (newPassword !== confirmPassword) {
			setError('Passwords do not match!')
			return
		}

		setError('')

		try {
			console.log('Sending data to backend:', { otp, newPassword, email })

			const response = await axios.post(
				'http://localhost:4567/api/pass/pass-reset',
				{
					otp,
					newPassword,
					email, // Send OTP, new password, and email to backend
				}
			)

			if (response.status !== 200) {
				setError(response.data.message || 'Failed to change password.')
			} else {
				setSuccess(true)
				setTimeout(() => navigate('/login'), 0) // Redirect to login after a short delay
			}
		} catch (err) {
			console.error('Error in password change:', err)
			setError('Server error. Please try again later.')
		}
	}

	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center h-screen'>
				<div className='bg-white p-8 rounded-lg shadow-md w-96'>
					<h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>
						Change Password
					</h2>
					<p className='text-sm text-gray-500 text-center mb-6'>
						Enter your new password below.
					</p>

					{success && (
						<p className='text-green-500 text-sm text-center mb-4'>
							Password changed successfully!
						</p>
					)}

					{error && (
						<p className='text-red-500 text-sm text-center mb-4'>{error}</p>
					)}

					<form onSubmit={handleSubmit} className='flex flex-col'>
						<label className='text-gray-600 text-sm font-medium'>
							New Password
						</label>
						<input
							type='password'
							placeholder='Enter new password'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className='mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
							required
						/>

						<label className='text-gray-600 text-sm font-medium mt-4'>
							Confirm New Password
						</label>
						<input
							type='password'
							placeholder='Confirm new password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className='mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
							required
						/>

						<button
							type='submit'
							className='mt-4 bg-gray-700 text-white py-2 rounded hover:bg-blue-800 transition'
						>
							Change Password
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

export default ChangePassword
