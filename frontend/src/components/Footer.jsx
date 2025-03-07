import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

function Footer() {
    return (
        <footer className='bg-black text-white py-6 text-center'>
            <p className='text-sm'>You can also reach us from:</p>

            {/* Social Media Icons */}
            <div className='flex justify-center gap-6 my-4'>
                <FaFacebook className='text-2xl cursor-pointer hover:opacity-80' />
                <FaInstagram className='text-2xl cursor-pointer hover:opacity-80' />
                <FaXTwitter className='text-2xl cursor-pointer hover:opacity-80' />
            </div>

            <p className='text-xs'>© 2025. PantriPick. All rights reserved.</p>
        </footer>
    )
}

export default Footer