import React from 'react'

const Services = () => {
  return (
    <div className="container mt-[300px] mx-auto py-20" id='services'>
        <p className="text-base lg:text-xl font-medium text-gray-500 text-center">
            Why choose EUDAIMONIA
        </p>
        <p className="text-3xl lg:text-5xl font-semibold text-gray-500 text-center mt-3">
            Our Services
        </p>
        <div className="grid grid-cols-3 gap-6 lg:gap-16 py-20">
        <div className="flex flex-col gap-5 items-center">
          <img width="92" height="92" viewBox="0 0 92 92" src="safe_space.png" alt="s1" />
          <p className="text-2xl font-semibold">Safe Space</p>
          <p className="text-gray-500 text-center">
           Have doubts regarding how you feel? <br /> Ask away, our doctors are ready to help.
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <img width="92" height="92" viewBox="0 0 92 92" src="survey.png" alt="v1" />
          <p className="text-2xl font-semibold">Survey</p>
          <p className="text-gray-500 text-center">
            Not confident speaking publicly? <br /> Take our survey and let our AI answer your queries.
          </p>
        </div> <div className="flex flex-col gap-5 items-center">
          <img width="92" height="92" viewBox="0 0 92 92" src="appointment.png" alt="v1" />
          <p className="text-2xl font-semibold">Appointment Booking</p>
          <p className="text-gray-500 text-center">
            Want a personal session? <br /> Our built-in appointment booking system makes it easier.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Services