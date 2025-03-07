import React from 'react'
import Hero from '../components/Home/Hero'
import ProductCategories from '../components/Home/HomeCategories'
import HomeAbout from '../components/Home/HomeAbout'

function Home() {
    return (
        <div>
            <Hero />
            <ProductCategories />
            <HomeAbout />
        </div>
    )
}

export default Home