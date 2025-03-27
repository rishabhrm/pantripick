import React from 'react'
import { Routes, Route } from 'react-router-dom'

//Basic Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Public Pages
import Home from './pages/public/Home'
import Products from './pages/public/Products'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Cart from './pages/public/Cart'
import Profile from './pages/public/Profile'

//Public Components
import Checkout from './components/public/Cart/Checkout'
import OrderConfirmation from './components/public/Cart/OrderConfirmation'
import ProductDetails from './components/public/Products/ProductDetails'
import SearchResults from './components/public/Products/SearchResults'

//Account Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import OTP from './pages/OTP'
import ResetPassword from './pages/Reset'
import ChangePassword from './pages/ChangePassword'

// Admin Pages
import AdminLogin from './pages/adminpages/AdminLogin'

function App() {
  return (
    <>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
		      <Route path='/checkout/:total' element={<Checkout />} />
          <Route path='/order-confirmation' element={<OrderConfirmation />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/otp' element={<OTP />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path='/admin' element={<AdminLogin />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
