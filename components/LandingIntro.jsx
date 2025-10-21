import React from 'react'
import Link from 'next/link'
import Login from './Login'
export default function LandingIntro() {
  return (
    <div className='flex bg-slate-100'>
        <div className='p-50'>
            <div className='text-2xl font-bold'>Separate Your Music Into Individual  Stems</div>
            <div className='mt-5 mb-5'>Upload any song and get clean, isolated stems for vocals, drums, bass, and other instruments using advanced AI technology.</div>
            <div className='flex'>
                <Link href="#Upload"><div className='p-3 border-black border-2 rounded-xl hover:bg-black hover:text-white transition-all ease-in-out'>
                    Start Separating</div></Link>
               <Link href="#Upload"> <div className='p-3 ml-3 border-black border-2 rounded-xl hover:bg-black hover:text-white transition-all ease-in-out'>
                    Learn More</div></Link>
            </div>
        </div>
        <div className='flex-col justify-center items-center mr-30 mt-10 mb-15 bg-white'>
            <div className='bg-slate-100 hidden'>1</div>
            <div>
                <Login></Login>
            </div>
        </div>
    </div>
    
    
  )
}
