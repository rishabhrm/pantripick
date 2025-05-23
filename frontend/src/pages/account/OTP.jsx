import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OTP = () => {
	const [otp, setOtp] = useState('')
	const [error, setError] = useState('')
	const [email, setEmail] = useState(null)
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const emailFromState = location.state?.email
		if (emailFromState) {
			setEmail(emailFromState)
		}
	}, [location.state])

	const handleChange = (e) => {
		setOtp(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!otp.trim()) {
			setError('OTP is required.')
			toast.error('OTP is required.', {
				autoClose: 500,
				hideProgressBar: true,
			})
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
				toast.error(data.message || 'Invalid OTP. Please try again.', {
					autoClose: 500,
					hideProgressBar: true,
				})
			} else {
				toast.success('OTP validated successfully!', {
					autoClose: 500,
					hideProgressBar: true,
				})
				navigate('/change-password', { state: { otp, email } })
			}
		} catch (err) {
			setError('Server error. Please try again later.')
			toast.error('Server error. Please try again later.', {
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
						Enter OTP
					</h2>
					<p className='text-sm text-gray-500 text-center mb-6'>
						OTP has been sent to your mail.
					</p>

					<form onSubmit={handleSubmit} className='flex flex-col'>
						<label className='text-gray-600 text-sm font-medium'>OTP</label>
						<input
							type='text'
							placeholder='Enter your OTP'
							value={otp}
							onChange={handleChange}
							required
							className='mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
						/>
						<button
							type='submit'
							className='mt-4 bg-gray-700 text-white py-2 rounded hover:bg-blue-800 transition'
						>
							Validate OTP
						</button>
					</form>

					<div className='text-center mt-4'>
						<a
							href='/reset-password'
							className='text-sm text-gray-500 hover:underline'
						>
							Back to Reset Password
						</a>
					</div>
				</div>
			</div>
		</>
	)
}

export default OTP