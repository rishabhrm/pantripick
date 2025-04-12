import React from 'react'
import { assets } from '../../assets/assets'
import Navbar from '../../components/Navbar'

function Contact() {
	return (
		<>
			<Navbar />
			<div className='px-6 sm:px-16 lg:px-24 py-16'>
				{/* Heading */}
				<div className='relative inline-block mb-8 py-3'>
					<h2 className='text-black text-2xl sm:text-3xl font-normal inline-block'>
						CONTACT <span className='font-bold'>US</span>
					</h2>
					<span className='absolute left-full top-1/2 -translate-y-1/2 ml-3 w-16 border-t-2 border-black'></span>
				</div>

				{/* Content Section */}
				<div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-10'>
					{/* Image Section */}
					<img
						className='w-full max-w-sm sm:max-w-md lg:max-w-lg object-cover rounded-lg shadow-lg'
						src={assets.img2}
						alt='Our Store'
					/>

					{/* Contact Details */}
					<div className='bg-gray-100 p-6 rounded-lg shadow-md w-full'>
						<h3 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-4'>
							Our Stores
						</h3>

						<div className='space-y-6'>
							{/* Ahmedabad Store */}
							<div>
								<p className='text-sm sm:text-base font-medium'>C.G. Road</p>
								<p className='text-sm sm:text-base text-gray-600'>
									Ahmedabad, Gujarat 380009
								</p>
								<p className='text-sm sm:text-base'>
									<span className='font-semibold'>Tel:</span> +91 98765 43210
								</p>
								<p className='text-sm sm:text-base'>
									<span className='font-semibold'>Email:</span>{' '}
									ahmedabad@pantripick.com
								</p>
							</div>

							<hr className='border-gray-300' />

							{/* Vadodara Store */}
							<div>
								<p className='text-sm sm:text-base font-medium'>Alkapuri</p>
								<p className='text-sm sm:text-base text-gray-600'>
									Vadodara, Gujarat 390007
								</p>
								<p className='text-sm sm:text-base'>
									<span className='font-semibold'>Tel:</span> +91 99876 54321
								</p>
								<p className='text-sm sm:text-base'>
									<span className='font-semibold'>Email:</span>{' '}
									vadodara@pantripick.com
								</p>
							</div>

							<hr className='border-gray-300' />

							{/* Surat Store */}
							<div>
								<p className='text-sm sm:text-base font-medium'>
									Ghod Dod Road
								</p>
								<p className='text-sm sm:text-base text-gray-600'>
									Surat, Gujarat 395007
								</p>
								<p className='text-sm sm:text-base'>
									<span className='font-semibold'>Tel:</span> +91 91234 56789
								</p>
								<p className='text-sm sm:text-base'>
									<span className='font-semibold'>Email:</span>{' '}
									surat@pantripick.com
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Contact
