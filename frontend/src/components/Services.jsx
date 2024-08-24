import React from 'react'

const Services = () => {
  return (
    <div className="container mx-auto py-20" id='services'>
        <p className="text-base lg:text-xl font-medium text-gray-500 text-center">
            WHY CHOOSE websitename
        </p>
        <p className="text-3xl lg:text-5xl font-semibold text-gray-500 text-center mt-3">
            Our Services
        </p>
        <div className="grid sm:grid-cols-1 grid-cols-3 gap-6 lg:gap-16 py-20">
        <div className="flex flex-col gap-5 items-center">
          <img width="92" height="92" viewBox="0 0 92 92" src="/assets/safespace.png" alt="s1" />
          <p className="text-2xl font-semibold">Safe Space</p>
          <p className="text-gray-500 text-center">
           Have doubts regarding how you feel? <br /> Ask away, our doctors are ready to help.
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <img width="92" height="92" viewBox="0 0 92 92" src="/assets/chatbot.png" alt="v1" />
          <p className="text-2xl font-semibold">ChatBot</p>
          <p className="text-gray-500 text-center">
            Not confident speaking publicly? <br /> chatbotname will be here whenever you need a friend.
          </p>
        </div> <div className="flex flex-col gap-5 items-center">
          <img width="92" height="92" viewBox="0 0 92 92" src="/assets/smile.png" alt="v1" />
          <p className="text-2xl font-semibold">Happiness Tracker</p>
          <p className="text-gray-500 text-center">
            Your smile is important. <br /> Keep a track of your progress with our happiness tracker.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Services