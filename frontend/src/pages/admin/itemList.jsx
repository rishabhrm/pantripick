import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { assets } from '../../assets/assets'
import AdminNavbar from '../../components/AdminNavbar'

const ItemList = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [items, setItems] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'http://localhost:4567/api/products/fetch-product'
				)
				const data = await response.json()
				setItems(data.products)
			} catch (error) {
				toast.error('Failed to fetch products', {
					autoClose: 500,
					hideProgressBar: true,
				})
			}
		}

		fetchData()
	}, [])

	const handleSearch = (e) => {
		setSearchTerm(e.target.value.toLowerCase())
	}

	const updateQuantity = async (id, change) => {
		try {
			const response = await fetch(
				'http://localhost:4567/api/products/update-quantity',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id, change }),
				}
			)

			const result = await response.json()

			if (response.ok) {
				setItems(
					items.map((item) =>
						item.id === id
							? { ...item, quantity: item.quantity + change }
							: item
					)
				)
				toast.success('Quantity updated successfully', {
					autoClose: 500,
					hideProgressBar: true,
				})
			} else {
				toast.error('Failed to update quantity', {
					autoClose: 500,
					hideProgressBar: true,
				})
			}
		} catch (error) {
			toast.error('Error updating quantity', {
				autoClose: 500,
				hideProgressBar: true,
			})
		}
	}

	const removeProduct = async (id) => {
		try {
			const response = await fetch(`http://localhost:4567/api/products/${id}`, {
				method: 'DELETE',
			})

			if (response.ok) {
				setItems(items.filter((item) => item.id !== id))
				toast.success('Product removed successfully', {
					autoClose: 500,
					hideProgressBar: true,
				})
			} else {
				toast.error('Failed to remove product', {
					autoClose: 500,
					hideProgressBar: true,
				})
			}
		} catch (error) {
			toast.error('Error removing product', {
				autoClose: 500,
				hideProgressBar: true,
			})
		}
	}

	const confirmRemoveProduct = (id) => {
		toast.info(
			<div>
				<p>Are you sure you want to remove this product?</p>
				<div className='flex gap-3 mt-2'>
					<button
						onClick={() => {
							removeProduct(id)
							toast.dismiss()
						}}
						className='bg-red-600 text-white text-xs px-3 py-1 rounded'
					>
						Remove
					</button>
					<button
						onClick={() => toast.dismiss()}
						className='bg-gray-300 text-black text-xs px-3 py-1 rounded'
					>
						Cancel
					</button>
				</div>
			</div>,
			{
				position: 'top-center',
				autoClose: false,
				closeOnClick: false,
				draggable: false,
				closeButton: false,
			}
		)
	}

	return (
		<>
			<AdminNavbar />
			<div className='px-6 sm:px-16 lg:px-24 py-10 flex justify-center'>
				<div className='bg-white border border-gray-200 rounded-lg p-10 w-full max-w-4xl'>
					<div className='relative inline-block mb-6'>
						<h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
							MANAGE <span className='font-bold'>PRODUCTS</span>
						</h2>
						<span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
					</div>

					<input
						type='text'
						placeholder='Search...'
						className='p-2 border border-gray-300 rounded w-full mb-6'
						onChange={handleSearch}
					/>

					<div className='border border-gray-200 rounded-lg overflow-x-auto'>
						<table className='w-full text-left border-collapse'>
							<thead>
								<tr className='border-b border-gray-200'>
									<th className='p-3'>Product</th>
									<th className='p-3'>Price</th>
									<th className='p-3'>Quantity</th>
									<th className='p-3'>Remove</th>
								</tr>
							</thead>
							<tbody>
								{items
									.filter((item) =>
										item.name.toLowerCase().includes(searchTerm)
									)
									.map((item) => (
										<tr key={item.id} className='border-b border-gray-200'>
											<td className='p-3 flex items-center'>
												<img
													src={item.image || assets[item.img]}
													alt={item.name}
													className='w-12 h-12 mr-4 object-cover rounded'
												/>
												{item.name}
											</td>
											<td className='p-3'>₹{item.price}</td>
											<td className='p-3'>
												<button
													onClick={() => updateQuantity(item.id, -1)}
													className='px-2 border border-gray-300 rounded'
												>
													-
												</button>
												<span className='mx-2'>{item.quantity}</span>
												<button
													onClick={() => updateQuantity(item.id, 1)}
													className='px-2 border border-gray-300 rounded'
												>
													+
												</button>
											</td>
											<td className='p-3'>
												<button
													onClick={() => confirmRemoveProduct(item.id)}
													className='text-red-600 hover:underline'
												>
													Remove
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
}

export default ItemList