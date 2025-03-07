import React from 'react'
import Hero from '../components/Hero'
import ProductCategories from '../components/HomeCategories'
import HomeAbout from '../components/HomeAbout'

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