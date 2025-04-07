import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiCheckCircle } from 'react-icons/fi'
import axios from 'axios'

const OrderConfirmation = () => {
	const [orderDetails, setOrderDetails] = useState({ cart: [], address: {} })
	const [total, setTotal] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get('http://localhost:4567/api/cart', {
				withCredentials: true,
			})

			const cart = res.data.cart
			const address = JSON.parse(localStorage.getItem('checkoutForm'))

			setOrderDetails({ cart, address })
			setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))
		}

		fetchData()
	}, [])

	const handlePlaceOrder = async () => {
		const f = orderDetails.address
		const fullAddress = `${f.address1}, ${f.address2}, ${f.city}, ${f.state} - ${f.pinCode}`

		const payload = {
			recipient_name: `${f.firstName} ${f.lastName}`,
			phone: f.phone,
			email: f.email,
			address: fullAddress,
		}

		const res = await fetch('http://localhost:4567/api/cart/place-order', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})

		await res.json()
		alert('Order placed successfully!')
		window.location.href = '/'
	}

	const { cart, address: f } = orderDetails

	return (
		<div className='px-4 sm:px-12 lg:px-16 py-10 flex justify-center'>
			<div className='bg-white border border-gray-200 rounded-lg p-8 w-full max-w-3xl shadow-md'>
				<Link
					to={`/checkout/${total}`}
					className='text-black flex items-center text-sm mb-6'
				>
					<FiChevronLeft className='mr-2 text-lg' />
					Back to checkout
				</Link>

				<div className='text-center mb-6'>
					<FiCheckCircle className='text-green-600 text-4xl mx-auto mb-3' />
					<h2 className='text-2xl font-bold text-black'>Order Confirmed!</h2>
					<p className='text-gray-600'>Thank you for your purchase.</p>
				</div>

				<h3 className='text-lg font-semibold mb-3'>Order Summary</h3>
				<div className='border border-gray-200 rounded-lg mb-6 overflow-x-auto'>
					<table className='w-full text-left border-collapse'>
						<thead>
							<tr className='border-b border-gray-200'>
								<th className='p-3'>Product</th>
								<th className='p-3'>Price</th>
								<th className='p-3'>Qty</th>
								<th className='p-3'>Total</th>
							</tr>
						</thead>
						<tbody>
							{cart.map(({ id, image, name, price, quantity }) => (
								<tr key={id} className='border-b border-gray-200'>
									<td className='p-3 flex items-center'>
										<img
											src={`http://localhost:4567/${image}`}
											alt={name}
											className='w-12 h-12 mr-4 object-cover rounded'
										/>
										{name}
									</td>
									<td className='p-3'>₹{price}</td>
									<td className='p-3'>{quantity}</td>
									<td className='p-3'>₹{(price * quantity).toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<h3 className='text-lg font-semibold mb-3'>Shipping Details</h3>
				<div className='border border-gray-200 rounded-lg p-4'>
					<p className='text-gray-700'>
						<strong>Name:</strong> {f.firstName} {f.lastName}
					</p>
					<p className='text-gray-700'>
						<strong>Phone:</strong> {f.phone}
					</p>
					<p className='text-gray-700'>
						<strong>Email:</strong> {f.email}
					</p>
					<p className='text-gray-700'>
						<strong>Address:</strong> {f.address1}, {f.address2}
					</p>
					<p className='text-gray-700'>
						<strong>City:</strong> {f.city}, {f.state} - {f.pinCode}
					</p>
				</div>

				<div className='mt-6 flex justify-between items-center'>
					<div className='text-lg font-semibold'>
						Total: <span className='text-green-600'>₹{total.toFixed(2)}</span>
					</div>
					<button
						onClick={handlePlaceOrder}
						className='bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition'
					>
						Proceed to Payment
					</button>
				</div>
			</div>
		</div>
	)
}

export default OrderConfirmation