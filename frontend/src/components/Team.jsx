import React from 'react'

const Team = () => {
  return (
    <div className="flex flex-col items-center container mx-auto py-20" id="team">
      <p className="text-3xl lg:text-5xl font-semibold text-gray-500  mt-3">
      Meet our team
      </p>
      <div className="grid grid-cols-4 gap-6 lg:gap-16 py-10 lg:py-20">
        <div className="flex flex-col items-center mx-6 gap-5 ">
          <img className="rounded-3xl w-[300px] h-[300px]" src="hindol.jpeg" alt="v1" />
          <p className="text-2xl font-semibold text-center">Hindol Banerjee</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 text-center">
            Fullstack Developer
            </p>
          </div>
        </div>
      
        <div className="flex flex-col items-center mx-6 gap-5 ">
          <img className="rounded-3xl w-[300px] h-[300px]" src="diya.jpeg" alt="v1" />
          <p className="text-2xl font-semibold text-center">Diya Chakraborty</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 text-center">
              Fullstack Developer
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mx-6 gap-5 ">
          <img className="rounded-3xl w-[300px] h-[300px]" src="arnab.jpeg" alt="v1" />
          <p className="text-2xl font-semibold text-center">Arnab Charit</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 text-center">
            Machine Learning Developer
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mx-6 gap-5 ">
          <img className="rounded-3xl w-[300px] h-[300px]" src="ananya.jpeg" alt="v1" />
          <p className="text-2xl font-semibold text-center">Ananya Sadhukhan</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 text-center">
            Machine Learning Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team