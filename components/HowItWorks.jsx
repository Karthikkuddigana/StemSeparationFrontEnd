import React from 'react'
import Link from 'next/link'
export default function HowItWorks() {
  return (
    <div className='mt-30'>
        <div className='flex justify-center font-bold text-2xl'>How It Works</div>
        <div className='flex justify-center'>Simple 3-step process to separate your music</div>
        <div className='grid grid-cols-3 gap-10 p-15'>
              <div className='flex flex-col justify-center content-center p-5'>
                 <div className='flex justify-center'>
                    <div className='bg-black text-white flex justify-center rounded-full w-15 h-15 p-5'>1</div>
                </div>
                <div className='flex justify-center p-5 font-bold'>Upload Your Song</div>
                <div className='flex justify-center p-4'>Choose your audio file and select the number of stems you want. We support MP3, WAV, FLAC, and M4A formats.</div>
                <div className='bg-slate-100 p-5 rounded-xl'>
                    <div className='flex justify-center bg-slate-200 p-10 rounded-xl'><img src="cloud-upload-48.ico" alt="" /></div>
                    <div className='flex justify-center p-5'>Drag & drop or browse files</div>
                </div>
            </div>
             <div className='flex flex-col justify-center content-center p-5'>
                 <div className='flex justify-center'>
                    <div className='bg-black text-white flex justify-center rounded-full w-15 h-15 p-5'>2</div>
                </div>
                <div className='flex justify-center p-5 font-bold'>AI Processing</div>
                <div className='flex justify-center p-4'>Our advanced AI anlyzes your song and separates it into individual stems with high precision and quality</div>
                <div className='bg-slate-100 p-5 rounded-xl'>
                    <div className='flex justify-center bg-slate-200 p-10 rounded-xl'><img src="settings-4-48.ico" alt="" /></div>
                    <div className='flex justify-center p-5'>Processing in progress...</div>
                </div>
            </div>
             <div className='flex flex-col justify-center content-center p-5'>
                 <div className='flex justify-center'>
                    <div className='bg-black text-white flex justify-center rounded-full w-15 h-15 p-5'>3</div>
                </div>
                <div className='flex justify-center p-5 font-bold'>Play & Download</div>
                <div className='flex justify-center p-4'>Listen to each stem individually, adjust volumes, and download the separated tracks for your projects</div>
                <div className='bg-slate-100 p-5 rounded-xl'>
                    <div className='flex justify-center bg-slate-200 p-10 rounded-xl'><img src="play-48.ico" alt="" /></div>
                    <div className='flex justify-center p-5'>Play, mix & download</div>
                </div>
            </div>
        </div>
        <Link href="#Upload"><div className='flex justify-center'><span className='bg-black text-white p-5 rounded-xl hover:scale-125 transition-all ease-in-out active:bg-slate-500'>Try it now</span></div></Link>
    </div>
  )
}
