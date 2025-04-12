import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'
import axios from 'axios'

const CartItems = () => {
	const navigate = useNavigate()
	const [cartItems, setCartItems] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchSessionAndCart = async () => {
			try {
				const res = await axios.get('http://localhost:4567/api/users/session-user', {
					withCredentials: true,
				})

				if (!res.data.user) {
					navigate('/')
				} else {
					const cartRes = await axios.get('http://localhost:4567/api/cart', {
						withCredentials: true,
					})
					setCartItems(cartRes.data.cart)
				}
			} catch (error) {
				console.error(error)
				navigate('/')
			} finally {
				setLoading(false)
			}
		}

		fetchSessionAndCart()
	}, [navigate])

	const updateQuantity = async (productId, change) => {
		try {
			await axios.post(
				'http://localhost:4567/api/cart/update',
				{ productId, change },
				{ withCredentials: true }
			)
			const res = await axios.get('http://localhost:4567/api/cart', {
				withCredentials: true,
			})
			setCartItems(res.data.cart)
		} catch (err) {
			console.error(err)
		}
	}

	const removeItem = async (productId) => {
		try {
			await axios.post(
				'http://localhost:4567/api/cart/remove',
				{ productId },
				{ withCredentials: true }
			)
			const res = await axios.get('http://localhost:4567/api/cart', {
				withCredentials: true,
			})
			setCartItems(res.data.cart)
		} catch (err) {
			console.error(err)
		}
	}

	if (loading) return null

	const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

	return (
		<div className='px-6 sm:px-16 lg:px-24 py-10 flex justify-center'>
			<div className='bg-white border border-gray-200 rounded-lg p-10 w-full max-w-4xl'>
				<Link to='/products' className='text-black flex items-center text-sm mb-6'>
					<FiChevronLeft className='mr-2 text-lg' />
					Continue Shopping
				</Link>

				<div className='relative inline-block mb-6'>
					<h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
						YOUR <span className='font-bold'>CART</span>
					</h2>
					<span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
				</div>

				{cartItems.length === 0 ? (
					<p className='text-gray-500 text-center'>Your cart is empty.</p>
				) : (
					<div>
						<div className='border border-gray-200 rounded-lg overflow-x-auto'>
							<table className='w-full text-left border-collapse'>
								<thead>
									<tr className='border-b border-gray-200'>
										<th className='p-3'>Product</th>
										<th className='p-3'>Price</th>
										<th className='p-3'>Quantity</th>
										<th className='p-3'>Cost</th>
										<th className='p-3'>Remove</th>
									</tr>
								</thead>
								<tbody>
									{cartItems.map(({ id, image, name, price, quantity }) => (
										<tr key={id} className='border-b border-gray-200'>
											<td className='p-3 flex items-center'>
												<img
													src={`http://localhost:4567/images/${image}`}
													alt={name}
													className='w-12 h-12 mr-4 object-cover rounded'
												/>
												{name}
											</td>
											<td className='p-3'>₹{price}</td>
											<td className='p-3'>
												<button
													onClick={() => updateQuantity(id, -1)}
													className='px-2 border border-gray-300 rounded'
												>
													-
												</button>
												<span className='mx-2'>{quantity}</span>
												<button
													onClick={() => updateQuantity(id, 1)}
													className='px-2 border border-gray-300 rounded'
												>
													+
												</button>
											</td>
											<td className='p-3'>₹{(price * quantity).toFixed(2)}</td>
											<td className='p-3'>
												<button
													onClick={() => removeItem(id)}
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

						<div className='mt-4 text-right text-lg font-semibold'>
							Total Amount: ₹{total.toFixed(2)}
						</div>

						<div className='text-right mt-4'>
							<button
								onClick={() => navigate(`/checkout/${total.toFixed(2)}`)}
								className='mt-6 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded transition'
							>
								Proceed to Checkout
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default CartItems