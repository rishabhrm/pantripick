import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'
import Navbar from '../../Navbar'

const Checkout = () => {
	const { total } = useParams()
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		pinCode: '',
	})

	const [errors, setErrors] = useState({})

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const validateForm = () => {
		const newErrors = {}
		if (!formData.firstName.trim())
			newErrors.firstName = 'First name is required'
		if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
		if (!/^\d{10}$/.test(formData.phone))
			newErrors.phone = 'Enter a valid 10-digit phone number'
		if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = 'Enter a valid email'
		if (!formData.address1.trim()) newErrors.address1 = 'Address is required'
		if (!formData.city.trim()) newErrors.city = 'City is required'
		if (!formData.state.trim()) newErrors.state = 'State is required'
		if (!/^\d{6}$/.test(formData.pinCode))
			newErrors.pinCode = 'Enter a valid 6-digit PIN Code'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validateForm()) {
			navigate('/order-confirmation', { state: { formData } })
		}
	}

	return (
		<>
			<Navbar />
			<div className='px-4 sm:px-12 lg:px-16 py-8 flex justify-center'>
				<div className='bg-white border border-gray-200 rounded-lg p-6 w-full max-w-3xl shadow-md'>
					<Link
						to='/cart'
						className='text-black flex items-center text-sm mb-6'
					>
						<FiChevronLeft className='mr-2 text-lg' />
						Back to cart
					</Link>

					<div className='relative inline-block mb-6 py-3'>
						<h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
							CHECK <span className='font-bold'>OUT</span>
						</h2>
						<span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
					</div>

					<p className='text-md font-semibold mb-4'>
						Total Amount: <span className='text-green-600'>₹{total}</span>
					</p>

					<form
						onSubmit={handleSubmit}
						className='grid grid-cols-1 sm:grid-cols-2 gap-4'
					>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							value={formData.firstName}
							onChange={handleChange}
							className={`border p-2 rounded w-full ${
								errors.firstName ? 'border-red-500' : 'border-gray-400'
							}`}
						/>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							value={formData.lastName}
							onChange={handleChange}
							className={`border p-2 rounded w-full ${
								errors.lastName ? 'border-red-500' : 'border-gray-400'
							}`}
						/>
						<input
							type='text'
							name='phone'
							placeholder='Phone Number'
							value={formData.phone}
							onChange={handleChange}
							className={`border p-2 rounded w-full ${
								errors.phone ? 'border-red-500' : 'border-gray-400'
							}`}
						/>
						<input
							type='email'
							name='email'
							placeholder='Email Address'
							value={formData.email}
							onChange={handleChange}
							className={`border p-2 rounded w-full ${
								errors.email ? 'border-red-500' : 'border-gray-400'
							}`}
						/>

						<div className='sm:col-span-2'>
							<input
								type='text'
								name='address1'
								placeholder='Address Line 1'
								value={formData.address1}
								onChange={handleChange}
								className={`border p-2 rounded w-full ${
									errors.address1 ? 'border-red-500' : 'border-gray-400'
								}`}
							/>
						</div>

						<input
							type='text'
							name='address2'
							placeholder='Address Line 2 (Optional)'
							value={formData.address2}
							onChange={handleChange}
							className='border border-gray-400 p-2 rounded w-full sm:col-span-2'
						/>

						<input
							type='text'
							name='city'
							placeholder='City'
							value={formData.city}
							onChange={handleChange}
							className={`border p-2 rounded w-full ${
								errors.city ? 'border-red-500' : 'border-gray-400'
							}`}
						/>
						<input
							type='text'
							name='state'
							placeholder='State'
							value={formData.state}
							onChange={handleChange}
							className={`border p-2 rounded w-full ${
								errors.state ? 'border-red-500' : 'border-gray-400'
							}`}
						/>
						<input
							type='text'
							name='pinCode'
							placeholder='PIN Code'
							value={formData.pinCode}
							onChange={handleChange}
							className={`border p-2 rounded w-full sm:col-span-2 ${
								errors.pinCode ? 'border-red-500' : 'border-gray-400'
							}`}
						/>

						<button
							type='submit'
							className='col-span-2 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition'
						>
							Place Order
						</button>
					</form>

					<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2'>
						{Object.entries(errors).map(([field, message]) => (
							<p key={field} className='text-red-500 text-sm col-span-2'>
								{message}
							</p>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Checkout