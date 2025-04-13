import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'
import axios from 'axios'
import Navbar from '../../components/Navbar'

const UserProfile = () => {
	const [user, setUser] = useState(null)
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get('http://localhost:4567/api/users/session-user', {
					withCredentials: true,
				})

				if (res.data.user) {
					setUser(res.data.user)
				} else {
					navigate('/')
				}
			} catch (error) {
				console.error(error)
				navigate('/')
			} finally {
				setLoading(false)
			}
		}

		const fetchOrders = async () => {
			try {
				const res = await axios.get('http://localhost:4567/api/orders/order-history', {
					withCredentials: true,
				})

				if (res.data.orders) {
					setOrders(res.data.orders)
				}
			} catch (error) {
				console.error(error)
			}
		}
		fetchUser()
		fetchOrders()
	}, [navigate])

	const handleEdit = () => {
		navigate('/edit-profile')
	}

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete your profile?')) {
			axios
				.delete('http://localhost:4567/api/users/delete-user', {
					data: { id: user.id },  // Sending the user id for deletion
					withCredentials: true,
				})
				.then(() => {
					alert('Profile deleted successfully')
					navigate('/')
				})
				.catch((err) => {
					console.error(err)
					alert('Error deleting profile')
				})
		}
	}

	if (loading) return null

	const groupedOrders = orders.reduce((acc, order) => {
		if (!acc[order.order_id]) acc[order.order_id] = []
		acc[order.order_id].push(order)
		return acc
	}, {})

	return (
		<>
			<Navbar />
			<div className='px-6 sm:px-16 lg:px-24 py-12'>
				<Link to='/' className='text-black flex items-center text-sm mb-4'>
					<FiChevronLeft className='mr-2 text-lg' />
					Back to Home
				</Link>

				<div className='relative inline-block mb-5'>
					<h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
						USER <span className='font-bold'>PROFILE</span>
					</h2>
					<span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
				</div>

				<p className='text-gray-700'>
					<strong>Name:</strong> {user.firstName}
				</p>
				<p className='text-gray-700'>
					<strong>Email:</strong> {user.email}
				</p>
				<p className='text-gray-700'>
					<strong>Phone:</strong> {user.phone}
				</p>
				<p className='text-gray-700'>
					<strong>Address:</strong> {user.address}
				</p>
				<p className='text-gray-700'>
					<strong>City:</strong> {user.city}
				</p>

				<div className='mt-4 flex gap-4'>
					<button
						onClick={handleEdit}
						className='border border-green-600 text-green-600 px-4 py-2 rounded-md text-sm font-medium transition hover:bg-green-100'
					>
						Edit Profile
					</button>
					<button
						onClick={handleDelete}
						className='border border-red-600 text-red-600 px-4 py-2 rounded-md text-sm font-medium transition hover:bg-red-100'
					>
						Delete Profile
					</button>
				</div>

				<h3 className='text-black text-xl font-semibold mt-8'>Past Orders</h3>
				<div className='mt-4'>
					{Object.keys(groupedOrders).length > 0 &&
						Object.entries(groupedOrders).map(([orderId, items]) => (
							<div
								key={orderId}
								className='border-gray-300 border rounded-lg p-4 shadow-md mt-4'
							>
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
							</div>
						))}

					{Object.keys(groupedOrders).length === 0 && (
						<p className='text-gray-500'>No past orders found.</p>
					)}
				</div>
			</div>
		</>
	)
}

export default UserProfile
