'use client'
import React from 'react'
import MeterBar from './ReviewsBar'
const Meter = () => {
  return (
    <div className='w-[50%] h-full flex justify-center  items-center'>
      <div className='w-[100%] h-[90%] flex justify-center  items-center'>
        <MeterBar className="borv" score={93} />
      </div>
    </div>
  )
}

export default Meter