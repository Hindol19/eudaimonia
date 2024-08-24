import React,{useState,useEffect} from 'react'

const Navbar = () => {
    return (
        <div className='container mx-auto py-4'>
            <div className="flex justify-between items-center mx-6 gap-5">
                <img src="/assets/logo.svg" alt="logo" />
                <div className="flex justify-center lg:justify-between items-center gap-5">
                    <a href='#services'>Our Services</a>
                    <a href='#team'>Our team </a>
                    <a href='#cta'>Contact us</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar
