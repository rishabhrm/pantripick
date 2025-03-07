import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'

import ProductDetails from './components/ProductDetails'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<Login />} />
                <Route path='/place-orders' element={<PlaceOrder />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/productdetails/:id' element={<ProductDetails />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
