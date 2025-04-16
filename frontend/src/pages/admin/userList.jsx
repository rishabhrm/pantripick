import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminNavbar from '../../components/AdminNavbar'

const UsersList = () => {
	const [users, setUsers] = useState([])
	const [search, setSearch] = useState('')
	const [sortConfig, setSortConfig] = useState(null)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await axios.get(
					'http://localhost:4567/api/users/fetch-user'
				)
				const fetchedUsers = res.data.users.map((user) => ({
					id: user.u_id,
					name: user.u_name,
					email: user.u_email,
					phone: user.u_phone,
					city: user.u_city,
				}))
				setUsers(fetchedUsers)
			} catch (error) {
				console.error('Failed to fetch users:', error)
			}
		}

		fetchUsers()
	}, [])

	const handleSearch = (e) => {
		setSearch(e.target.value)
	}

	const handleSort = (key) => {
		let ascending = true
		if (sortConfig && sortConfig.key === key && sortConfig.ascending) {
			ascending = false
		}
		setSortConfig({ key, ascending })
	}

	const sortedUsers = [...users].sort((a, b) => {
		if (!sortConfig) return 0
		const { key, ascending } = sortConfig
		if (a[key] < b[key]) return ascending ? -1 : 1
		if (a[key] > b[key]) return ascending ? 1 : -1
		return 0
	})

	const filteredUsers = sortedUsers.filter((user) =>
		user.email.toLowerCase().includes(search.toLowerCase())
	)

	const handleDelete = async (userId) => {
		try {
			await axios.delete('http://localhost:4567/api/users/admin-delete-user', {
				data: { id: userId },
			})
			setUsers((prev) => prev.filter((user) => user.id !== userId))
			toast.success('User removed successfully', {
				autoClose: 500,
				hideProgressBar: true,
			})
		} catch (error) {
			toast.error('Failed to delete user', {
				autoClose: 500,
				hideProgressBar: true,
			})
		}
	}

	const confirmDelete = (userId) => {
		toast.info(
			<div>
				<p>Are you sure you want to remove this user?</p>
				<div className='flex gap-3 mt-2'>
					<button
						onClick={() => {
							handleDelete(userId)
							toast.dismiss()
						}}
						className='bg-red-600 text-white text-xs px-3 py-1 rounded'
					>
						Delete
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
							USERS <span className='font-bold'>LIST</span>
						</h2>
						<span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
					</div>

					<input
						type='text'
						placeholder='Search by email...'
						className='mb-4 p-2 w-full border border-gray-300 rounded-md'
						value={search}
						onChange={handleSearch}
					/>

					<div className='border border-gray-200 rounded-lg overflow-x-auto'>
						<table className='w-full text-left border-collapse'>
							<thead>
								<tr className='border-b border-gray-200 bg-gray-100'>
									<th
										className='p-3 cursor-pointer'
										onClick={() => handleSort('name')}
									>
										Name
									</th>
									<th
										className='p-3 cursor-pointer'
										onClick={() => handleSort('email')}
									>
										Email
									</th>
									<th className='p-3'>Phone</th>
									<th className='p-3'>City</th>
									<th className='p-3'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredUsers.length === 0 ? (
									<tr>
										<td colSpan='5' className='text-center p-4 text-gray-500'>
											No users found
										</td>
									</tr>
								) : (
									filteredUsers.map((user) => (
										<tr
											key={user.id}
											className='border-b border-gray-200 hover:bg-gray-50'
										>
											<td className='p-3'>{user.name}</td>
											<td className='p-3'>{user.email}</td>
											<td className='p-3'>{user.phone}</td>
											<td className='p-3'>{user.city}</td>
											<td className='p-3'>
												<button
													onClick={() => confirmDelete(user.id)}
													className='text-red-600 hover:underline'
												>
													Remove
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
}

export default UsersList