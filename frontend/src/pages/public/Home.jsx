import React from 'react'
import Hero from '../../components/public/Home/Hero'
import ProductCategories from '../../components/public/Home/HomeCategories'
import HomeAbout from '../../components/public/Home/HomeAbout'

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