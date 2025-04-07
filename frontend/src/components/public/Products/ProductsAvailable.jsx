import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../../../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProductList = () => {
	const [products, setProducts] = useState([])
	const [showLeft, setShowLeft] = useState({})
	const scrollRefs = useRef({})
	const navigate = useNavigate()

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
			.then((res) => setProducts(res.data.products || []))
	}, [])

	const grouped = products.reduce((acc, p) => {
		acc[p.category] = [...(acc[p.category] || []), p]
		return acc
	}, {})

	const scroll = (category, dir) => {
		scrollRefs.current[category]?.scrollBy({
			left: dir * 300,
			behavior: 'smooth',
		})
	}

	const handleScroll = (category) => {
		const el = scrollRefs.current[category]
		if (el) setShowLeft((prev) => ({ ...prev, [category]: el.scrollLeft > 0 }))
	}

	return (
		<div className='px-6 sm:px-16 lg:px-24 py-12'>
			<div className='relative inline-block mb-6'>
				<h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
					PRODUCTS <span className='font-bold'>AVAILABLE</span>
				</h2>
				<span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
			</div>

			{Object.entries(grouped).map(([cat, items]) => (
				<div key={cat} className='mb-8'>
					<h3 className='text-black text-base sm:text-lg font-medium mt-5 mb-4'>
						{cat}
					</h3>
					<div className='relative'>
						{showLeft[cat] && (
							<button
								onClick={() => scroll(cat, -1)}
								className='absolute left-0 top-1/2 -translate-y-1/2 p-1 z-10'
							>
								<img src={assets.dropup_icon} alt='scroll-left' />
							</button>
						)}

						<div
							ref={(el) => (scrollRefs.current[cat] = el)}
							onScroll={() => handleScroll(cat)}
							className='overflow-x-auto flex space-x-4 scrollbar-hide scroll-smooth'
							style={{
								scrollbarWidth: 'none',
								msOverflowStyle: 'none',
								overflowX: 'hidden',
							}}
						>
							{items.map((p) => (
								<div
									key={p.id}
									onClick={() => navigate(`/product-details/${p.id}`)}
									className='border-gray-300 border rounded-lg p-4 shadow-md w-40 sm:w-48 flex-shrink-0 cursor-pointer'
								>
									<div className='w-full h-36 sm:h-40 rounded-lg flex items-center justify-center'>
										<img
											className='max-h-32 sm:max-h-36 object-contain'
											src={p.image}
											alt={p.name}
										/>
									</div>
									<p className='text-black text-xs sm:text-sm font-medium mt-3 text-left'>
										{p.name}
									</p>
									<p className='text-gray-500 text-xs sm:text-sm text-left'>
										₹{p.price}
									</p>
								</div>
							))}
						</div>

						<button
							onClick={() => scroll(cat, 1)}
							className='absolute right-0 top-1/2 -translate-y-1/2 p-1 z-10'
						>
							<img src={assets.dropdown_icon} alt='scroll-right' />
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProductList