import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import { toast } from 'react-toastify'

const SignUp = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		firstName: '',
		phone: '',
		email: '',
		address: '',
		city: '',
		password: '',
		confirmPassword: '',
	})

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match!')
			return
		}

		try {
			await axios.post(
				'http://localhost:4567/api/users/register-user',
				{
					u_name: formData.firstName,
					u_email: formData.email,
					u_password: formData.password,
					u_phone: formData.phone,
					u_address: formData.address,
					u_city: formData.city,
				}
			)

			toast.success('Registration successful!', {
				autoClose: 500,
				hideProgressBar: true,
			})
			navigate('/login')
		} catch (error) {
			console.error('Registration error:', error)
			toast.error(
				error.response?.data?.error ||
				'Failed to register user. Please try again.', {
					autoClose: 500,
					hideProgressBar: true,
				}
			)
		}
	}

	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center h-screen px-20'>
				<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-xl'>
					<h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>
						Create Account
					</h2>
					<p className='text-sm text-gray-500 text-center mb-6'>
						Fill in your details to sign up.
					</p>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<input
							type='text'
							name='firstName'
							placeholder='Full Name'
							value={formData.firstName}
							onChange={handleChange}
							className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
							required
						/>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<input
								type='email'
								name='email'
								placeholder='Email address'
								value={formData.email}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
							<input
								type='text'
								name='phone'
								placeholder='Phone number'
								value={formData.phone}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
						</div>
						<input
							type='text'
							name='address'
							placeholder='Address'
							value={formData.address}
							onChange={handleChange}
							className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
							required
						/>
						<input
							type='text'
							name='city'
							placeholder='City'
							value={formData.city}
							onChange={handleChange}
							className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
							required
						/>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<input
								type='password'
								name='password'
								placeholder='Password'
								value={formData.password}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
							<input
								type='password'
								name='confirmPassword'
								placeholder='Confirm Password'
								value={formData.confirmPassword}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
						</div>
						<button
							type='submit'
							className='w-full bg-gray-700 text-white py-2 rounded-md hover:bg-blue-800 transition'
						>
							Sign Up
						</button>
					</form>
					<div className='flex justify-center items-center mt-4 text-sm space-x-2'>
						<span className='text-black'>Already a member?</span>
						<button
							onClick={() => navigate('/login')}
							className='text-sm text-gray-500 hover:underline'
						>
							Login from here
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUp