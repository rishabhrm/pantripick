import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

import Login from './pages/Login'

import Checkout from './components/Cart/Checkout'
import OrderConfirmation from './components/Cart/OrderConfirmation'
import ProductDetails from './components/Products/ProductDetails'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import AdminLogin from './pages/adminpages/AdminLogin';

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
          <Route path='/login' element={<Login />} />
          <Route path='/checkout/:total' element={<Checkout />} />
          <Route path='/order-confirmation' element={<OrderConfirmation />} />
                {/* Admin Routes */}
                <Route path='/admin' element={<AdminLogin />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
