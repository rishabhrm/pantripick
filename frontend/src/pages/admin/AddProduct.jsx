import React, { useState } from 'react'
import { toast } from 'react-toastify'
import AdminNavbar from '../../components/AdminNavbar'

const AddProduct = () => {
	const [formData, setFormData] = useState({
		name: '',
		quantity: '',
		price: '',
		description: '',
		image: null,
		category: '',
	})

	const categories = [
		'Dairy and Bread',
		'Fruits and Vegetables',
		'Cold Drinks and Juice',
		'Snacks and Munchies',
		'Bakery and Biscuits',
		'Sauces and Spreads',
		'Pharma and Wellness',
		'Personal Care',
		'Cleaning Essentials',
		'Home and Offices',
	]

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const data = new FormData()
		data.append('name', formData.name)
		data.append('quantity', formData.quantity)
		data.append('price', formData.price)
		data.append('description', formData.description)
		data.append('category', formData.category)
		if (formData.image) data.append('image', formData.image)

		try {
			const response = await fetch(
				'http://localhost:4567/api/products/add-product',
				{
					method: 'POST',
					body: data,
				}
			)

			if (response.ok) {
				const result = await response.json()
				console.log('Product added:', result)
				toast.success('Product added successfully!', {
					autoClose: 500,
					hideProgressBar: true,
				})
				setFormData({
					name: '',
					quantity: '',
					price: '',
					description: '',
					image: null,
					category: '',
				})
			} else {
				toast.error('Error adding product', {
					autoClose: 500,
					hideProgressBar: true,
				})
			}
		} catch (error) {
			console.error('Error:', error)
			toast.error('Error adding product', {
				autoClose: 500,
				hideProgressBar: true,
			})
		}
	}

	return (
		<>
			<AdminNavbar />
			<div className='flex flex-col items-center justify-center h-screen px-6'>
				<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-xl'>
					<h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>
						Add Product
					</h2>
					<p className='text-sm text-gray-500 text-center mb-6'>
						Enter product details below.
					</p>

					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<input
								type='text'
								name='name'
								placeholder='Product Name'
								value={formData.name}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
							<input
								type='number'
								name='quantity'
								placeholder='Quantity'
								value={formData.quantity}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<input
								type='number'
								name='price'
								placeholder='Price'
								value={formData.price}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
							<select
								name='category'
								value={formData.category}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							>
								<option value=''>Select Category</option>
								{categories.map((category, i) => (
									<option key={i} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>

						<textarea
							name='description'
							placeholder='Product Description'
							rows='3'
							value={formData.description}
							onChange={handleChange}
							className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
							required
						></textarea>

						<label className='flex flex-col items-center justify-center border-2 border-gray-400 py-6 rounded cursor-pointer hover:border-blue-500 transition'>
							<span className='text-gray-700'>📸 Upload Image</span>
							<input
								type='file'
								name='image'
								accept='image/*'
								className='hidden'
								onChange={handleFileChange}
							/>
						</label>

						<button
							type='submit'
							className='w-full bg-gray-700 text-white py-2 rounded-md hover:bg-blue-800 transition'
						>
							Add Product
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default AddProduct