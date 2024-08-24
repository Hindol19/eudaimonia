import React from 'react'

const Team = () => {
  return (
    <div className="flex flex-col items-center container mx-auto py-20" id="team">
      <p className="text-3xl lg:text-5xl font-semibold text-gray-500  mt-3">
      Meet our team
      </p>
      <div className="grid sm:grid-cols-1 grid-cols-4 gap-6 lg:gap-16 py-10 lg:py-20">
        <div className="flex flex-col items-center mx-6 gap-5 ">
          <img className="rounded-3xl" src="/assets/Hindol.jpeg" alt="v1" />
          <p className="text-2xl font-semibold">Hindol Banerjee</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">
            Fullstack Developer
            </p>
          </div>
        </div>
      
        <div className="flex flex-col items-center mx-6 gap-5 ">
          <img className="rounded-3xl" src="/assets/Diya.jpg" alt="v1" />
          <p className="text-2xl font-semibold">Diya Chakraborty</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">
              Fullstack Developer
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mx-6 gap-5 ">
          <img className="rounded-3xl" src="/assets/t3.svg" alt="v1" />
          <p className="text-2xl font-semibold">Arnab Charit</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">
            Machine Learning Developer
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mx-6 gap-5 ">
          <img className="rounded-3xl" src="/assets/t3.svg" alt="v1" />
          <p className="text-2xl font-semibold">Ananya Sadhukhan</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">
            Machine Learning Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team