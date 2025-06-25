"use client"
import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <div className='p-8 bg-slate-600 flex justify-start'>
      <div className='p-2 items-start w-3/4'>Spleeter Frontend</div>
      {/* <div className='w-250'></div> */}
      <div className='justify-around flex gap-5'>
        <Link href="/"><div className='p-2 px-5 hover:bg-slate-900 hover:scale-125 rounded-xl transition-all delay-50 text-blue-50 active:scale-125 transition-all duration-150 ease-in-out'>Home</div></Link>
        <Link href="/login"><div className='p-2 px-5 hover:bg-slate-900 hover:scale-125 rounded-xl transition-all delay-50 text-blue-50 active:scale-125 duration-150'>Login</div></Link>
        <div className='p-2 px-5 hover:bg-slate-900 rounded-xl transition-all delay-50 text-blue-50'>My files</div>
        <div className='p-2 px-5 hover:bg-slate-900 rounded-xl transition-all delay-50 text-blue-50'>About</div>
      </div>
      </div>
      
  )
}
