import React,{useState,useEffect} from 'react'

const Navbar = () => {
    return (
        <div className='container mx-auto py-4'>
            <div className="flex justify-between items-center mx-6 gap-5">
                <h2 className='text-lg italic'>Eudaimonia</h2>
                <div className="flex justify-center lg:justify-between items-center gap-5">
                    <a href='#services' className='hover:bg-dark hover:text-white hover:rounded hover:py-1 hover:px-1'>Our Services</a>
                    <a href='#team' className='hover:bg-dark hover:text-white hover:rounded hover:py-1 hover:px-1'>Our team </a>
                    <a href='#cta' className='hover:bg-dark hover:text-white hover:rounded hover:py-1 hover:px-1'>Contact us</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar
