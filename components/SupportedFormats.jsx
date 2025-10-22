import React from 'react'
import "../public/icons8-file.svg"

export default function SupportedFormats() {
  return (
    <div className='mt-25'>
        <div className='text-2xl font-bold flex justify-center p-5'>Supported Formats</div>
        <div className='flex justify-center p-5'>We support all major audio formats for both input and output</div>
        <div className='flex justify-around mt-5 p-10'>
            <div className='p-10 bg-slate-100 rounded-xl'>
                <div className='text-xl font-bold'>Input Formats</div>
                <div className=' grid grid-cols-2 gap-10 p-5'>
                    <div className='flex bg-white rounded-xl'>
                        <div className=' p-2 flex justify-center content-center'>
                            <div className='h-3/4 bg-slate-100 rounded-xl'>
                                <img src="icons8-file.svg" alt="Icon" />
                            </div>
                        </div>
                        <div className=' p-2 pr-15'>
                            <div className='text-xl font-bold p-2'>MP3</div>
                            <div className='p-2'>Up to 320kbps</div>
                        </div>
                    </div>
                    <div className='flex bg-white rounded-xl'>
                         <div className=' p-2 flex justify-center content-center'>
                            <div className='h-3/4 bg-slate-100 rounded-xl'>
                                <img src="icons8-file.svg" alt="Icon" />
                            </div>
                        </div>
                        <div className='p-5'>
                            <div className='text-xl font-bold p-2'>WAV</div>
                            <div className='p-2'>16/24/32 bit</div>
                        </div>
                    </div>
                     <div className='flex  bg-white rounded-xl'>
                         <div className=' p-2 flex justify-center content-center'>
                            <div className='h-3/4 bg-slate-100 rounded-xl'>
                                <img src="icons8-file.svg" alt="Icon" />
                            </div>
                        </div>
                        <div className=' p-5 pr-15'>
                            <div className='text-xl font-bold p-2'>FLAC</div>
                            <div className='p-2'>Lossless</div>
                        </div>
                    </div>
                     <div className='flex  bg-white rounded-xl'>
                         <div className=' p-2 flex justify-center content-center'>
                            <div className='h-3/4 bg-slate-100 rounded-xl'>
                                <img src="icons8-file.svg" alt="Icon" />
                            </div>
                        </div>
                        <div className=' p-5 pr-15'>
                            <div className='text-xl font-bold p-2'>M4A</div>
                            <div className='p-2'>AAC/ALAC</div>
                        </div>
                    </div>
                </div>
            </div>
           <div className='p-10 bg-slate-100 rounded-xl'>
                <div className='text-xl font-bold'>Output Formats</div>
                <div className=' grid grid-cols-2 gap-10 p-5'>
                    <div className='flex bg-white rounded-xl'>
                        <div className=' p-2 flex justify-center content-center'>
                            <div className='h-3/4 bg-slate-100 rounded-xl'>
                                <img src="icons8-download-64.png" alt="Icon" />
                            </div>
                        </div>
                        <div className=' p-2 pr-15'>
                            <div className='text-xl font-bold p-2'>WAV</div>
                            <div className='p-2'>24-bit/ 44.1kHz</div>
                        </div>
                    </div>
                    <div className='flex bg-white rounded-xl'>
                         <div className=' p-2 flex justify-center content-center'>
                            <div className='h-3/4 bg-slate-100 rounded-xl'>
                                <img src="icons8-download-64.png" alt="Icon" />
                            </div>
                        </div>
                        <div className='p-5'>
                            <div className='text-xl font-bold p-2'>MP3</div>
                            <div className='p-2'>320kbps</div>
                        </div>
                    </div>
                     <div className='flex  bg-white rounded-xl'>
                        <div className=' p-2 flex justify-center content-center'>
                            <div className='h-3/4 bg-slate-100 rounded-xl'>
                                <img src="icons8-download-64.png" alt="Icon" />
                            </div>
                        </div>
                        <div className=' p-5 pr-15'>
                            <div className='text-xl font-bold p-2'>FLAC</div>
                            <div className='p-2'>Lossless</div>
                        </div>
                    </div>
                     <div className='flex  bg-white rounded-xl'>
                         <div className=' p-2 flex justify-center content-center'>
                            <div className='h-3/4 bg-slate-100 rounded-xl'>
                                <img src="icons8-download-64.png" alt="Icon" />
                            </div>
                        </div>
                        <div className=' p-5 pr-15'>
                            <div className='text-xl font-bold p-2'>AIFF</div>
                            <div className='p-2'>Unrecognized</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-slate-100 p-5 mt-10 w-1/5 rounded-xl mx-auto'>
            <div>
                <div className='font-bold text-xl flex justify-center p-2'>File Size Limits</div>
                <div className='flex justify-center p-2'>Maximum file size: 50MB</div>
                <div className='flex justify-center p-2'>Maximum duration: 10 minutes</div>
                <div className='flex justify-center p-2'>Sample rates: 22kHz - 192kHz</div>
            </div>
            
        </div>
    </div>
  )
}
