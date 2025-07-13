"use client"
import React, { useCallback, useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from './SessionManager'
import { useRouter } from 'next/navigation'
export default function Navbar() {
  const router = useRouter(); 
  const auth = useContext(AuthContext); 
  const user = localStorage.getItem("username")
  const logout =() => { 
    var answer = window.confirm("Do you really want to logout?"); 
    if(answer){
      auth.logout(); 
      router.replace("/"); 
    }
    else{
      return 
    }
    
   }
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
                        <Link href="/StemsDisplay"><div className='px-5 hover:bg-slate-400 rounded py-2 flex justify-center items-center'>Seperated Stems</div></Link>
                        <Link href='/howitworks'><div className='px-5 hover:bg-slate-400 rounded py-2 flex justify-center items-center'>How it works</div></Link>
                        <Link href='/about'><div className='px-5 hover:bg-slate-400 rounded py-2 flex justify-center items-center'>About</div> </Link> 
                        {user?
                          <div className='px-5 hover:bg-slate-400 rounded py-1 flex justify-center items-center'>Welcome, {user}</div>
                          :<Link href="/login"><div className='px-5 hover:bg-slate-400 rounded py-2 flex justify-center items-center'>Login</div></Link>} 
                        
                        {/* <Link href="/StemsDisplay"><div className='px-5 hover:bg-slate-400 rounded py-2 flex justify-center items-center'>Stems Separated</div></Link> */}
                          {user?<div onClick={logout} className='px-5 hover:bg-red-400 rounded py-1 flex justify-center items-center cursor-pointer'>LogOut</div>:<></>}
                    </div>
                </div>
        </nav>
    </>
      
  )
}
