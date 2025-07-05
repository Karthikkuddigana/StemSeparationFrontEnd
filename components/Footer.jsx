"use client"
import React from 'react'

export default function Footer() {
   
  return (
    <div id='footer' className='bg-black text-white p-10 flex justify-around mt-10'>
            <div className='flex-col'>
                <div className='font-bold'>StemSeparator</div>
                <br />
                <div className='w-40'>Separate your music into individual stems with our AI-powered audio separation technology</div>
            </div>
            <div>
                <div className='font-bold'>Quick Links</div>
                <br />
                <div>Home</div>
                <div>How it Works</div>
                <div>FAQ</div>
                <div>Contact</div>
            </div>
            <div className='font-bold'>
                Connect With Us
            </div>
    </div>    
  )
}
