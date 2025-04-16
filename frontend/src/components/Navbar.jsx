import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { FiUser, FiShoppingCart, FiSearch } from 'react-icons/fi'
import { BsCart3 } from 'react-icons/bs'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Navbar = () => {
	const [search, setSearch] = useState('')
	const [loggedIn, setLoggedIn] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get('http://localhost:4567/api/users/session-user', {
				withCredentials: true,
			})
			.then((res) => setLoggedIn(!!res.data.user))
			.catch(() => setLoggedIn(false))
	}, [])

	const handleSearch = (e) => {
		if (e.key === 'Enter' && search.trim()) {
			navigate(`/search?q=${search.trim()}`)
		}
	}

	const handleLogout = async () => {
		try {
			await axios.post(
				'http://localhost:4567/api/users/logout',
				{},
				{
					withCredentials: true,
				}
			)
			toast.success('Logged out successfully!', {
				autoClose: 500,
				hideProgressBar: true,
			  })
			setTimeout(() => {
				navigate('/')
				window.location.reload()
			}, 500)
		} catch (error) {
			toast.error('Failed to logout. Try again.', {
				autoClose: 500,
				hideProgressBar: true,
			  })
		}
	}

	return (
		<div className='flex items-center justify-between py-5 font-medium'>
			<Link
				to='/'
				className='flex items-center gap-2 text-2xl sm:text-3xl font-semibold text-gray-800'
			>
				pantripick.
				<BsCart3 className='w-7 h-7 sm:w-8 sm:h-8' />
			</Link>

			<ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
				{['/', '/products', '/about', '/contact'].map((path, i) => (
					<NavLink
						key={path}
						to={path}
						className='flex flex-col items-center gap-1'
					>
						<p>{['HOME', 'PRODUCTS', 'ABOUT', 'CONTACT'][i]}</p>
						<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>
				))}
			</ul>

			<div className='flex items-center gap-6'>
				<div className='relative flex items-center'>
					<FiSearch className='absolute left-3 text-gray-500' />
					<input
						type='text'
						placeholder='Search products here'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onKeyDown={handleSearch}
						className='pl-10 pr-4 py-2 w-60 rounded-full border border-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
					/>
				</div>

				<div className='group relative'>
					<FiUser
						className='w-6 h-6 cursor-pointer'
						onClick={() => {
							if (!loggedIn) navigate('/login')
						}}
					/>
					{loggedIn && (
						<div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
							<div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
								<a href='/profile' className='hover:text-black'>
									Profile
								</a>
								<a
									onClick={handleLogout}
									className='hover:text-black cursor-pointer'
								>
									Logout
								</a>
							</div>
						</div>
					)}
				</div>

				{loggedIn && (
					<Link to='/cart'>
						<FiShoppingCart className='w-6 h-6 min-w-6' />
					</Link>
				)}
			</div>
		</div>
	)
}

export default Navbar