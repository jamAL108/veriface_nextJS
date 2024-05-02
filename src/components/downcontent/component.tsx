import React from 'react'
import Beam from './beam'
import Image from 'next/image'
import { FaCheck } from "react-icons/fa";
import Meter from './meterComponent/meter'
const Component = () => {
  return (
    <div className='min-w-[min(1200px,90%)] w-[min(1200px , 90vw)] relative  base:max-w-[90vw] bl:max-w-[1700px] flex flex-col items-center py-[20px]  base:mt-[30px] bl:mt-[60px] overflow-hidden gap-[50px] mb-[100px]'>
      <div className='bg-[#2a2a2a] base:w-full tab:w-[94%] rounded-xl  flex base:flex-col tab:flex-row tab:justify-between ' >
        <div className='base:w-full tab:w-[50%] base:p-8 tab:p-14  h-full flex flex-col'>
          <Image src='/images/importBeam.png' alt='dwscv' className='mb-[20px]' width={60} height={60} />
          <h1 className='text-3xl font-[570] mb-[15px]'>Verify social media videos</h1>
          <p className="mb-2 flex text-muted-foreground items-center gap-2"><FaCheck size={17} color='white' /> No need to download and verify, just send the URL.</p>
          <p className="mb-2 flex text-muted-foreground items-center gap-2"><FaCheck size={17} color='white' /> Can Verify Instagram's reels (public)</p>
          <p className="mb-2 flex text-muted-foreground items-center gap-2"><FaCheck size={17} color='white' /> Can verify Any Youtube Videos</p>
          <p className="mb-2 flex text-muted-foreground items-center gap-2"><FaCheck size={17} color='white' /> Upto to 1 minute video and not more than 50mb.</p>
        </div>
        <Beam />
      </div>
      <div className='w-full flex base:flex-col tab:flex-row justify-center items-center gap-[50px]'>
        <div className='bg-[#2a2a2a] base:w-full tab:w-[45%] tab:h-[200px] rounded-xl flex base:flex-col tab:flex-row  tab:justify-between items-center'>
          <div className='p-7 base:w-full tab:w-[50%] flex gap-[10px] flex-col'>
            <h1 className='text-3xl font-[560] !leading-[35px]'>Our AI Model's Accuracy</h1>
            <h2 className='text-muted-foreground'>Can be Truth in 93% of the cases</h2>
          </div>
          <Meter />
        </div>
        <div className='bg-[#2a2a2a] base:hidden tab:flex tab:w-[45%] h-[200px] rounded-xl'>

        </div>
      </div>
    </div>
  )
}

export default Component