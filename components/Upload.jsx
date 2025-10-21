'use client'
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react'
export default function Upload({setFile,resetTrigger}) {
    // const [fileName, setFileName] = useState("")
    const fileInputRef = useRef(); 
    useEffect(()=>{
        if(fileInputRef.current){
            fileInputRef.current.value='';
        }
    },[resetTrigger]); 
    const handleUpload=(event)=>{
        event.preventDefault(); 
        const file = event.target.files[0]; 
        console.log(file.name,file.size,file.type)
        setFile(file); 
        const formData = new FormData(); 
    }
  return (
    <div className='border-2 border-dashed border-gray-400 rounded p-5 scroll-smooth' id="Upload">
        <label htmlFor='audio-upload' className='flex flex-col items-center cursor-pointer'>
            <div className='flex justify-center'>Drag and drop your audio file here, or click to browse</div>
            <br />
            <div className='flex justify-center'>
                <p>Supported formats: MP3, WAV, FLAC (Max 15MB)</p>
            </div>
            <br />
            <div className='flex justify-center'>
                <div className='hover:scale-125 active:bg-gray-600 transition-all ease-in-out bg-black text-white p-2 rounded'>
                    Browse Files
                </div>
            </div>
            <input
                id='audio-upload'
                type='file'
                accept='.mp3,.wav,.flac'
                className='hidden'
                onChange={handleUpload}
                ref={fileInputRef}
            />
        </label>
    </div>
  )
}
