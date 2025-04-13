import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllOrders = () => {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const res = await axios.get(
					'http://localhost:4567/api/orders/all-orders'
				) // Update with your API endpoint
				if (res.data.orders) {
					setOrders(res.data.orders)
				}
			} catch (error) {
				console.error('Error fetching orders:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchOrders()
	}, [])

	if (loading) return <p>Loading...</p>

	// Group orders by order_id
	const groupedOrders = orders.reduce((acc, order) => {
		if (!acc[order.order_id]) acc[order.order_id] = []
		acc[order.order_id].push(order)
		return acc
	}, {})

	const handleRemoveOrder = async (orderId) => {
		try {
			// Send DELETE request to backend
			const response = await axios.delete(
				`http://localhost:4567/api/orders/delete-orders/${orderId}`
			)

			// Check if the deletion was successful
			if (response.status === 200) {
				// Filter out the removed orders from the state
				setOrders((prevOrders) =>
					prevOrders.filter((order) => order.order_id !== orderId)
				)
			}
		} catch (error) {
			console.error('Error removing orders:', error)
		}
	}

	return (
		<div
			className='min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative p-6'
			style={{ backgroundImage: "url('/Image/orders-bg.jpg')" }}
		>
			{/* Overlay */}
			<div className='absolute inset-0 bg-black opacity-60'></div>

			{/* Orders Container */}
			<div className='relative z-10 bg-white bg-opacity-90 p-8 rounded-3xl shadow-lg w-full max-w-5xl'>
				<h3 className='text-black text-xl font-semibold mt-8'>Past Orders</h3>

				<div className='mt-4'>
					{Object.keys(groupedOrders).length > 0 &&
						Object.entries(groupedOrders).map(([orderId, items]) => (
							<div
								key={orderId}
								className='border-gray-300 border rounded-lg p-4 shadow-md mt-4'
							>
								<p className='text-black font-medium'>
									User: {items[0].user_name}
								</p>{' '}
								{/* Display user's name */}
								<p className='text-black font-medium'>Order ID: {orderId}</p>
								<p className='text-gray-600'>
									Date: {new Date(items[0].created_at).toLocaleDateString()}
								</p>
								<p className='text-gray-600'>
									Items:{' '}
									{items
										.map((item) => `${item.product_name} (x${item.quantity})`)
										.join(', ')}
								</p>
								<p className='text-gray-600'>Address: {items[0].address}</p>
								<p className='text-blue-600 font-semibold text-sm'>
									Status: Confirmed
								</p>
								{/* Remove Button */}
								<div className='mt-4 text-right'>
									<button
										className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition'
										onClick={() => handleRemoveOrder(orderId)}
									>
										Remove All
									</button>
								</div>
							</div>
						))}

					{Object.keys(groupedOrders).length === 0 && (
						<p className='text-gray-500'>No past orders found.</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default AllOrders
