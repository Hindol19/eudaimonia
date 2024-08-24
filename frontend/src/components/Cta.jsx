import React from 'react'

const Cta = () => {
  return (
    <div className='container mx-auto flex flex-col gap-5 items-center justify-center py-20' id='cta'>
        <p className=' text-xl md:text-2xl lg:text-4xl font-medium text-center'>Start with websitename today.</p>
        <p className='text-base sm:text-lg lg:text-2xl font-medium text-center'>Choose to live a happier tomorrow.</p>
        <div className="flex flex-row sm:flex-col gap-3 sm:gap-5 lg:gap-10 items-center mt-5">
            <input type="text" className='px-5 py-5 rounded-full w-72 lg:w-96 outline-none bg-[#f8fafe]' placeholder='Send us a message' />
            <button className='btn btn-sm lg:btn-lg bg-[#524fd5] text-white btn-lg rounded-full border-none px-10 py-2'>Send</button>
        </div>
    </div>
  )
}

export default Cta