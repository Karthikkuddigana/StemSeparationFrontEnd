import React from 'react'
import Link from 'next/link'

export default function LandingIntro() {
  return (
    <div className='flex p-50 bg-slate-100'>
    <div className=''>
        <div className='text-2xl font-bold'>Separate Your Music Into Individual  Stems</div>
        <div className='mt-5 mb-5'>Upload any song and get clean, isolated stems for vocals, drums, bass, and other instruments using advanced AI technology.</div>
        <div className='flex'>
            <div className='p-3 border-black border-2 rounded-xl hover:bg-black hover:text-white transition-all ease-in-out'>
                <Link href="#Upload">Start Separating</Link></div>
            <div className='p-3 ml-3 border-black border-2 rounded-xl hover:bg-black hover:text-white transition-all ease-in-out'>
                <Link href="#Upload">Learn More</Link></div>
        </div>
    </div>
    {/* <Login></Login> */}
    </div>
    
    
  )
}
