import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { FiUser, FiShoppingCart, FiSearch } from 'react-icons/fi'
import { assets } from '../assets/assets'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:4567/api/users/session-user', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setLoggedIn(!!data.user))
  }, [])

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/search?q=${search.trim()}`)
    }
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <img src={assets.logo} className='w-36' />

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
                  onClick={() => {
                    fetch('http://localhost:4567/api/users/logout', {
                      method: 'POST',
                      credentials: 'include',
                    }).then(() => {
                      navigate('/')
                      window.location.reload()
                    })
                  }}
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
