import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import { assets } from '../../assets/assets'
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
			const response = await axios.post(
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

			toast.success('Registration successful!')  // Show success toast after successful registration
			navigate('/login')
		} catch (error) {
			console.error('Registration error:', error)
			toast.error(
				error.response?.data?.error ||
					'Failed to register user. Please try again.'  // Show error toast on failure
			)
		}
	}

	return (
		<>
			<Navbar />
			<div className='flex justify-center items-center min-h-screen bg-white'>
				{/* Main Container */}
				<div className='flex w-full sm:w-11/12 lg:w-9/12 bg-white rounded-lg shadow-lg'>
					
					{/* Image Section */}
					<div className='w-1/2 h-[500px]'>
						<img
							src={assets.hero_img}
							alt='Signup'
							className='w-full h-full object-cover rounded-l-lg'
						/>
					</div>

					{/* Form Section */}
					<div className='w-1/2 h-[500px] p-8 flex flex-col justify-center'>
						<h2 className='text-2xl font-bold text-center mb-6'>
							SIGN UP <span className='font-bold-500'>HERE</span>
						</h2>
						<form
							onSubmit={handleSubmit}
							className='grid grid-cols-1 sm:grid-cols-2 gap-6'
						>
							<input
								type='text'
								name='firstName'
								placeholder='Name'
								value={formData.firstName}
								onChange={handleChange}
								className='border border-orange-400 p-3 rounded col-span-2 focus:outline-none'
								required
							/>
							<input
								type='email'
								name='email'
								placeholder='Email address'
								value={formData.email}
								onChange={handleChange}
								className='border border-orange-400 p-3 rounded focus:outline-none'
								required
							/>
							<input
								type='text'
								name='phone'
								placeholder='Phone number'
								value={formData.phone}
								onChange={handleChange}
								className='border border-orange-400 p-3 rounded focus:outline-none'
								required
							/>
							<input
								type='text'
								name='address'
								placeholder='Address Line'
								value={formData.address}
								onChange={handleChange}
								className='border border-orange-400 p-3 rounded col-span-2 focus:outline-none'
								required
							/>
							<input
								type='text'
								name='city'
								placeholder='City'
								value={formData.city}
								onChange={handleChange}
								className='border border-orange-400 p-3 rounded col-span-2 focus:outline-none'
								required
							/>
							<input
								type='password'
								name='password'
								placeholder='Password'
								value={formData.password}
								onChange={handleChange}
								className='w-full p-3 border border-orange-400 rounded-md focus:outline-none'
								required
							/>
							<input
								type='password'
								name='confirmPassword'
								placeholder='Confirm Password'
								value={formData.confirmPassword}
								onChange={handleChange}
								className='w-full p-3 border border-orange-400 rounded-md focus:outline-none'
								required
							/>
							<button
								type='submit'
								className='bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition col-span-2'
							>
								Signup
							</button>
						</form>
						<p className='text-center mt-4 text-gray-600'>
							Already a member?{' '}
							<button
								onClick={() => navigate('/login')}
								className='text-blue-500 underline'
							>
								Login
							</button>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUp