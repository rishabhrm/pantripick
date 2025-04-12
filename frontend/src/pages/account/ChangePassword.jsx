import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function ChangePassword() {
	const navigate = useNavigate()

	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		if (newPassword !== confirmPassword) {
			setError('Passwords do not match!')
			return
		}

		setError('')
		alert('Password changed successfully!')
	}

	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center h-screen bg-yellow-100'>
				<div className='bg-white p-8 rounded-lg shadow-md w-96'>
					<h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>
						Change Password
					</h2>
					<p className='text-sm text-gray-500 text-center mb-6'>
						Enter your new password below.
					</p>

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

						{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

						<button
							type='submit'
							className='mt-4 bg-gray-700 text-white py-2 rounded hover:bg-blue-800 transition'
							onClick={() => navigate(`/login`)}
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