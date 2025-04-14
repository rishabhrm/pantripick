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
			<div className='flex flex-col items-center justify-center h-screen px-20'>
				<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-xl'>
					<h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>
						Edit Profile
					</h2>
					<p className='text-sm text-gray-500 text-center mb-6'>
						Update your account details below.
					</p>
					<form onSubmit={handleSubmit} className='space-y-4'>

						<div>
							<label className='block text-sm font-medium text-gray-600 mb-1'>
								Full Name
							</label>
							<input
								type='text'
								name='u_name'
								value={user.u_name}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Email Address
								</label>
								<input
									type='email'
									name='u_email'
									value={user.u_email}
									onChange={handleChange}
									className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
									required
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-600 mb-1'>
									Phone Number
								</label>
								<input
									type='text'
									name='u_phone'
									value={user.u_phone}
									onChange={handleChange}
									className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
									required
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-600 mb-1'>
								Address
							</label>
							<input
								type='text'
								name='u_address'
								value={user.u_address}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-600 mb-1'>
								City
							</label>
							<input
								type='text'
								name='u_city'
								value={user.u_city}
								onChange={handleChange}
								className='p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
								required
							/>
						</div>

						<button
							type='submit'
							className='w-full bg-gray-700 text-white py-2 rounded-md hover:bg-blue-800 transition'
						>
							Save Changes
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default EditProfile