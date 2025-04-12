import React from 'react'
import Hero from '../../components/public/Home/Hero'
import ProductCategories from '../../components/public/Home/HomeCategories'
import HomeAbout from '../../components/public/Home/HomeAbout'
import Navbar from '../../components/Navbar'

function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <ProductCategories />
            <HomeAbout />
        </div>
    )
}

export default Home