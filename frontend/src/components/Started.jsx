import React from 'react'
import Link from 'next/link'

const Started = () => {
  return (
    <div>
        <div className='h-[300px] w-[50%] flex flex-col justify-center items-center mt-[200px]'>
            <p className='text-3xl mb-5'>Journey Beyond The Ordinary</p>
            <button className="hero-button rounded py-2 px-6 bg-dark text-white text-xl">
               <Link href='/register'>Get Started</Link> 
            </button>
        </div>
        
        <img src="landing.png" className='absolute w-full top-[-300px] left-0 z-[-10]'/>
    </div>
  )
}

export default Started