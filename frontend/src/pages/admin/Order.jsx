import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminNavbar from '../../components/AdminNavbar'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AllOrders = () => {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)
	const [statuses, setStatuses] = useState({})

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const res = await axios.get(
					'http://localhost:4567/api/orders/all-orders'
				)
				if (res.data.orders) {
					setOrders(res.data.orders)

					const initialStatuses = {}
					res.data.orders.forEach(order => {
						initialStatuses[order.order_id] = order.status
					})
					setStatuses(initialStatuses)
				}
			} catch (error) {
				console.error('Error fetching orders:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchOrders()
	}, [])

	const groupedOrders = orders.reduce((acc, order) => {
		if (!acc[order.order_id]) acc[order.order_id] = []
		acc[order.order_id].push(order)
		return acc
	}, {})

	const removeOrder = async (orderId) => {
		try {
			const response = await fetch(
				`http://localhost:4567/api/orders/delete-order/${orderId}`,
				{
					method: 'DELETE',
				}
			)

			if (response.ok) {
				setOrders((prev) =>
					prev.filter((order) => order.order_id !== orderId)
				)
				toast.success('Order removed successfully', {
					autoClose: 500,
					hideProgressBar: true,
				})
			} else {
				toast.error('Failed to remove order', {
					autoClose: 500,
					hideProgressBar: true,
				})
			}
		} catch (error) {
			console.error('Error:', error)
			toast.error('Error removing order', {
				autoClose: 500,
				hideProgressBar: true,
			})
		}
	}

	const confirmRemoveOrder = (orderId) => {
		toast.info(
			<div>
				<p>
					Are you sure you want to remove order <strong>{orderId}</strong>?
				</p>
				<div className="flex gap-3 mt-2">
					<button
						onClick={() => {
							removeOrder(orderId)
							toast.dismiss()
						}}
						className="bg-red-600 text-white text-xs px-3 py-1 rounded"
					>
						Remove
					</button>
					<button
						onClick={() => toast.dismiss()}
						className="bg-gray-300 text-black text-xs px-3 py-1 rounded"
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

	const handleStatusChange = async (orderId, newStatus) => {
		setStatuses((prev) => ({
			...prev,
			[orderId]: newStatus,
		}))
		try {
			await axios.put(
				`http://localhost:4567/api/orders/update-status/${orderId}`,
				{ status: newStatus }
			)
			toast.success(`Order status updated to ${newStatus}.`, {
				autoClose: 500,
				hideProgressBar: true,
			})
		} catch (error) {
			console.error('Error updating order status:', error)
			toast.error('Failed to update order status.', {
				autoClose: 500,
				hideProgressBar: true,
			})
		}
	}

	if (loading) return null

	return (
		<>
			<AdminNavbar />
			<div className="px-6 sm:px-16 lg:px-24 py-10 flex justify-center">
				<div className="bg-white border border-gray-200 rounded-lg p-10 w-full max-w-4xl">
					<div className="relative inline-block mb-6">
						<h2 className="text-black text-2xl sm:text-3xl font-normal inline-block">
							ALL <span className="font-bold">ORDERS</span>
						</h2>
						<span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black"></span>
					</div>

					{Object.keys(groupedOrders).length === 0 ? (
						<p className="text-gray-500 text-center">No past orders found.</p>
					) : (
						Object.entries(groupedOrders).map(([orderId, items]) => (
							<div
								key={orderId}
								className="border border-gray-200 rounded-lg mb-6 overflow-x-auto"
							>
								<div className="p-4 border-b border-gray-200 bg-gray-50">
									<p className="text-sm text-gray-700">
										<span className="font-semibold">User:</span>{' '}
										{items[0].user_name}
									</p>
									<p className="text-sm text-gray-700">
										<span className="font-semibold">Order ID:</span> {orderId}
									</p>
									<p className="text-sm text-gray-700">
										<span className="font-semibold">Date:</span>{' '}
										{new Date(items[0].created_at).toLocaleDateString()}
									</p>
									<p className="text-sm text-gray-700">
										<span className="font-semibold">Address:</span>{' '}
										{items[0].address}
									</p>
								</div>

								<table className="w-full text-left">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="p-3">Product</th>
											<th className="p-3">Quantity</th>
										</tr>
									</thead>
									<tbody>
										{items.map((item, index) => (
											<tr key={index} className="border-b border-gray-100">
												<td className="p-3">{item.product_name}</td>
												<td className="p-3">{item.quantity}</td>
											</tr>
										))}
									</tbody>
								</table>

								<div className="flex justify-between items-center px-4 py-3">
									<div className="flex items-center gap-4">
										<p
											className={`font-semibold ${
												statuses[orderId] === 'Confirmed'
													? 'text-green-600'
													: statuses[orderId] === 'Rejected'
													? 'text-red-600'
													: statuses[orderId] === 'Delivered'
													? 'text-blue-600'
													: 'text-gray-600'
											}`}
										>
											Status: {statuses[orderId]}
										</p>
										<select
											value={statuses[orderId]}
											onChange={(e) =>
												handleStatusChange(orderId, e.target.value)
											}
											className="border p-1 rounded"
										>
											<option value="Confirmed">Confirmed</option>
											<option value="Rejected">Rejected</option>
											<option value="Delivered">Delivered</option>
											<option value="Cancelled">Cancelled</option>
										</select>
									</div>

									<button
										onClick={() => confirmRemoveOrder(orderId)}
										className="text-red-600 hover:underline"
									>
										Remove Order
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	)
}

export default AllOrders
