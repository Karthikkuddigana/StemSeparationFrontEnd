'use client'
import React from 'react'
import Upload from '@/components/Upload'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Landing() {
    const [file, setFile] = useState("")
    const [resetTrigger, setResetTrigger] =useState(0)
    const [stemCount, setstemCount] = useState("")
    const [error, seterror] = useState("");
    const router = useRouter(); 
    const validateFile = (file) => { 

     }
    const clearFile=()=>{
        setFile("");
        setResetTrigger((i)=>i+1);  
    }
    const handleTwoStems=()=>{
        setstemCount(2); 
    }
    const handleFourStems=()=>{
        setstemCount(4); 
    }

    const handleFiveStems=()=>{
        setstemCount(5); 
    }
    const submitForm=async ()=>{
        console.log(stemCount,file.name)
        if(!file && !stemCount){
            alert("Pls upload a file and stem count to continue")
        }
        else{
            if(!stemCount){
            alert("Pls select the number of stems")
            }   
            if(!file){
                alert("Pls upload a file to continue")
            }
            else{
                const formData = new FormData(); 
                formData.append("mediaFile",file); 
                formData.append("noOfStems",stemCount); 
                const response = await fetch("http://localhost:5205/UploadAudio",{
                    method: "POST", 
                    headers:{
                        // "Content-Type":"multipart/form-data",
                        "Authorization":"Bearer "+localStorage.getItem("token")
                    },
                    body: formData
                })
                if(response.ok){
                    const jsonResp=await response.json(); 
                    console.log(jsonResp); 
                    router.push("/StemsDisplay"); 
                }
                
            }
        }
        
    }
  return (
    <>
        <div id="Upload_Component" className='mx-auto mt-10 w-[75%] h-auto shadow-2xl rounded bg-white'>
                <div className='w-[90%] ml-[5%] pt-5 pb-5'>
                    <div className='mt-5'>
                        <h1 className=' text-xl'>Upload Your Track</h1>
                    </div>
                    <br />
                    <Upload setFile={setFile} resetTrigger={resetTrigger}></Upload>
                    <br />
                    {file.name && <>
                    <div className=' py-5 bg-gray-100 rounded flex justify-between items-center px-4'>
                      {file.name}
                      <button className='bg-black rounded text-white p-3 hover:scale-125 transition-all ease active:bg' onClick={clearFile}>Delete</button>
                  </div><br /></>}
                    <div className=''>
                        Separation Mode
                    </div>
                    <br />
                    <div className='flex justify-between'>
                        <div tabIndex={0} onClick={handleTwoStems} className='flex-col justify-center items-center border-1 border-gray-300 py-10 px-10 rounded w-[30%] focus:border-black focus:bg-gray-200 hover:bg-gray-200 cursor-pointer'>
                            <div className='flex justify-center'>2 Stems</div>
                            <div className='flex justify-center'>Vocals+Instrumental</div>
                        </div>
                        <div tabIndex={0} onClick={handleFourStems} className='flex-col justify-center items-center border-1 border-gray-300 py-10 px-10 rounded w-[30%] focus:border-black focus:bg-gray-200 hover:bg-gray-200 cursor-pointer'>
                            <div className='flex justify-center'>4 Stems</div>
                            <div className='flex justify-center'>Vocals,Drums,Bass,Other</div>
                        </div>
                        <div tabIndex={0} onClick={handleFiveStems} className='flex-col justify-center items-center border-1 border-gray-300 py-10 px-10 rounded w-[30%] focus:border-black focus:bg-gray-200 hover:bg-gray-200 cursor-pointer'>
                            <div className='flex justify-center'>5 Stems</div>
                            <div className='flex justify-center'>Vocals,Drums,Bass,Piano,Other</div>
                        </div>
                    </div>
                    <br />
                    <div className='flex justify-center items-center'>
                        <button onClick={submitForm} className='hover:scale-125 active:bg-gray-600 transition-all ease-in-out bg-black text-white p-2 rounded cursor-pointer'>Separate Stems</button>
                    </div>
                    <br />
                    <div className='bg-black text-white p-10 rounded'>
                        <ul>
                            <li>Ready to process your audio file...</li>
                            <li>Select a separation mode and click "Separate Stems"</li>
                        </ul>
                       
                    </div>
                </div>
        </div> 
    </>
    
  )
}
