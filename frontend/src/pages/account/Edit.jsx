import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import { toast } from 'react-toastify'

const EditProfile = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState({
		u_name: '',
		u_email: '',
		u_phone: '',
		u_address: '',
		u_city: '',
	})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios
			.get('http://localhost:4567/api/users/session-user', {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data.user) {
					const { firstName, email, phone, address, city } = res.data.user
					setUser({
						u_name: firstName,
						u_email: email,
						u_phone: phone,
						u_address: address,
						u_city: city,
					})
					setLoading(false)
				} else {
					toast.error('Please login first.')
					navigate('/')
				}
			})
			.catch((err) => {
				console.error('Error fetching user data:', err)
				navigate('/')
			})
	}, [navigate])

	const handleChange = (e) => {
		const { name, value } = e.target
		setUser((prevUser) => ({ ...prevUser, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			await axios.put('http://localhost:4567/api/users/update-user', user, {
				withCredentials: true,
			})
			toast.success('Profile Updated Successfully!')
			navigate('/profile')
		} catch (err) {
			console.error('Update failed:', err)
			toast.error('Something went wrong.')
		}
	}

	if (loading) return <div className='text-center mt-10'>Loading...</div>

	return (
		<>
			<Navbar />
			<div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-8'>
				<h2 className='text-2xl font-bold mb-4'>Edit Profile</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium'>Name</label>
						<input
							type='text'
							name='u_name'
							value={user.u_name}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium'>Email</label>
						<input
							type='email'
							name='u_email'
							value={user.u_email}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium'>Phone</label>
						<input
							type='text'
							name='u_phone'
							value={user.u_phone}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium'>Address</label>
						<textarea
							name='u_address'
							value={user.u_address}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded'
						></textarea>
					</div>
					<div>
						<label className='block text-sm font-medium'>City</label>
						<input
							type='text'
							name='u_city'
							value={user.u_city}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded'
						/>
					</div>
					<button
						type='submit'
						className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
					>
						Save Changes
					</button>
				</form>
			</div>
		</>
	)
}

export default EditProfile