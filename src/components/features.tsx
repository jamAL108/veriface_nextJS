import React from 'react'
import Image from 'next/image'
const Features = () => {
  return (
    <div className='feature w-[min(1400px,85%)] flex flex-col items-center py-[20px] mt-[50px]'>
      <div className='flex w-[80%] flex-col gap-[30px] justify-center items-center'>
        <h2 className='text-primary font-[600] text-md'>VERIFACE FEATURES</h2>
        <h1 className='text-[2.5rem] z-[0] text-center font-[650] tracking-wide'>
          Veriface's goal is accurate deepfake detection using AI, achieving
          <span className='snatch w-[50px] h-[30px] relative mx-[5px] text-black text-[2.5rem] text-center'>
            89%
          </span>
          {`     `}
          accuracy with facial expression analysis features.</h1>
      </div>
      <div className='w-full my-[80px] mt-[100px] flex justify-center items-start gap-[35px]'>
        <div className='w-[250px] mt-[-30px] gap-[55px] flex flex-col items-end'>
          <div className='w-full flex flex-col gap-[7px] items-end justify-start '>
            <h1 className='text-2xl text-right font-[600]'>User-friendly Interface</h1>
            <p className='text-right text-sm text-muted-foreground'>Offers an intuitive interface, making it easy for users to navigate and utilize its powerful detection capabilities.</p>
          </div>
          <div className='w-full flex flex-col gap-[7px] items-end justify-start'>
            <h1 className=' text-right text-2xl font-[600]'>Link-based Video Detection</h1>
            <p className='text-right text-sm text-muted-foreground'>Detect deepfakes in videos from YouTube, Instagram, and Drive by simply providing the video link.</p>
          </div>
          <div className='w-full flex flex-col gap-[7px] items-end justify-start' >
            <h1 className='text-2xl text-right font-[600]'>Real-time Monitoring</h1>
            <p className=' text-right text-sm text-muted-foreground'>Users can actively monitor for deepfake content in real-time, ensuring timely detection and response.</p>
          </div>
        </div>
        <Image src='/images/Groupfinal.png' alt="meow" width={600} height={600} />
        <div className='w-[250px] mt-[-30px] gap-[55px] flex flex-col items-end'>
          <div className='w-full flex flex-col gap-[7px] items-start justify-start '>
            <h1 className='text-left text-2xl font-[600]'>Verify Social media videos</h1>
            <p className='text-left text-sm text-muted-foreground'>Detect deepfakes in videos from YouTube, Instagram, and Drive by simply providing the video link.</p>
          </div>
          <div className='w-full flex flex-col gap-[7px] items-start justify-start'>
            <h1 className='text-2xl text-left font-[600]'>Confidence Score</h1>
            <p className='text-left text-sm text-muted-foreground'> The app provides a confidence score for each detection, allowing users to gauge the likelihood of content being a deepfake.</p>
          </div>
          <div className='w-full flex flex-col gap-[7px] items-start justify-start' >
            <h1 className='text-left text-2xl font-[600]'>Facial Expression Analysis</h1>
            <p className=' text-left text-sm text-muted-foreground'>analyzes facial expressions to detect inconsistencies indicative of deepfake manipulation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features