"use client"
import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <>
      <nav className='bg-black text-white py-5'>
                <div className='flex justify-between'>
                    <div className='px-5 flex'>
                        <img src="musical-note-music-and-multimedia-svgrepo-com.svg" className='bg-slate-50' width={50} alt="Music Icon" />
                        <div className='flex justify-center items-center font-extrabold'>StemSeparation</div>
                    </div>
                    <div className='flex justify-end mr-3'>
                        <Link href="/"><div className='px-5 hover:bg-slate-400 rounded py-2 flex justify-center items-center'>Home</div></Link>
                        <Link href='/howitworks'><div className='px-5 hover:bg-slate-400 rounded py-2 flex justify-center items-center'>How it works</div></Link>
                        <Link href='/about'><div className='px-5 hover:bg-slate-400 rounded py-2 flex justify-center items-center'>About</div> </Link>  
                        <Link href="/login"><div className='px-5 hover:bg-slate-400 rounded py-2 flex justify-center items-center'>Login</div></Link>
                    </div>
                </div>
        </nav>
    </>
      
  )
}
