import React from 'react'

const Started = () => {
  return (
    <div>
        <div className='h-[300px] w-[50%] flex flex-col justify-center items-center mt-20'>
            <p className='text-3xl mb-5'>Journey Beyond The Ordinary</p>
            <button className="hero-button z-[-10] rounded py-2 px-6 bg-dark text-white text-xl">
                Get Started
            </button>
        </div>
        
        <img src="landing.png" className='absolute w-full top-[-300px] left-0 z-0'/>
    </div>
  )
}

export default Started