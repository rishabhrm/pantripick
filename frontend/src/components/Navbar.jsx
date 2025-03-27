import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { FiUser, FiShoppingCart, FiSearch } from 'react-icons/fi'

function Navbar() {
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/search?q=${search.trim()}`)
    }
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <img src={assets.logo} className='w-36' />
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/products' className='flex flex-col items-center gap-1'>
          <p>PRODUCTS</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
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
          <FiUser className='w-6 h-6 cursor-pointer' />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
          <FiShoppingCart className='w-6 h-6 min-w-6' />
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className='flex flex-col text-gray-600'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3 cursor-pointer'
          >
            <img className='h-4 rotate-180' src={assets.dropdown_icon} />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 border'
            to='/'
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 border'
            to='/products'
          >
            PRODUCTS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 border'
            to='/about'
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 border'
            to='/contact'
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
