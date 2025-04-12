import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'
import axios from 'axios'
import Navbar from '../../Navbar'

const SearchResults = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const searchQuery = new URLSearchParams(location.search).get('q') || ''
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios
			.get('http://localhost:4567/api/users/session-user', {
				withCredentials: true,
			})
			.then((res) => {
				if (!res.data.user) {
					alert('Please login to continue')
					navigate('/')
				}
			})

		axios
			.get('http://localhost:4567/api/products/fetch-product')
			.then((res) => {
				setProducts(res.data.products || [])
			})
	}, [])

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<>
			<Navbar />
			<div className='px-6 sm:px-16 lg:px-24 py-12'>
				<Link
					to='/products'
					className='text-black flex items-center text-sm mb-6'
				>
					<FiChevronLeft className='mr-2 text-lg' />
					Back to Products List
				</Link>

				<h2 className='text-black text-2xl sm:text-3xl font-normal'>
					SEARCH RESULTS FOR <span className='font-bold'>"{searchQuery}"</span>
				</h2>

				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6'>
					{filteredProducts.map((product) => (
						<div
							key={product.id}
							className='border-gray-300 border rounded-lg p-4 shadow-md cursor-pointer'
							onClick={() => navigate(`/product-details/${product.id}`)}
						>
							<div className='w-full h-36 sm:h-40 flex items-center justify-center'>
								<img
									className='max-h-32 sm:max-h-36 object-contain'
									src={product.image}
									alt={product.name}
									onError={(e) => (e.target.src = '/fallback-image.jpg')}
								/>
							</div>
							<p className='text-black text-sm font-medium mt-3'>
								{product.name}
							</p>
							<p className='text-gray-500 text-sm'>₹{product.price}</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default SearchResults