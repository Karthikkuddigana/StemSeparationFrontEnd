import React from 'react'

export default function PowerfulFeatures() {
  return (
    <div className='p-25 bg-slate-100 mt-10'>
        <div className='font-bold text-2xl flex justify-center'>Powerful Features</div>
        <div className='flex justify-center p-5 mt-5'>Everything you need to work with separated audio stems</div>
        <div className='grid grid-cols-3 gap-30 mt-10'>
            <div className='bg-white flex justify-center content-center rounded-xl flex-col p-15 shadow-2xl'>
                <div className='pl-3 font-bold'>AI-Powered Separation</div>
                <div className='p-3 mt-2'>Advanced manchine learning algorithms ensure clean, high-quality stem separation with minimal artifacts.</div>
                <div className='p-3'>
                    <ul className='list-disc list-inside'>
                        <li>State-of-the-art neural networks</li>
                        <li>Minimal audio-bleeding</li>
                        <li>Preserves original quality</li>
                    </ul>
                </div>
                </div>
            <div className='bg-white flex justify-center content-center rounded-xl flex-col p-15 shadow-2xl'>
                <div className='pl-3 font-bold'>Individual Controls</div>
                <div className='p-3 mt-2'>Fine-tune each stem with independent volume, mute, and solo controls for perfect mixing</div>
                <div className='p-3'>
                    <ul className='list-disc list-inside'>
                        <li>Volume adjustment per stem</li>
                        <li>Solo/mute functionality</li>
                        <li>Real-time playback</li>
                    </ul>
                </div>
                </div>
            <div className='bg-white flex justify-center content-center rounded-xl flex-col p-15 shadow-2xl'>
                <div className='pl-3 font-bold'>Export & Download</div>
                <div className='p-3 mt-2'>Download invidiual stems or your custom mix in various high-quality audio formats.</div>
                <div className='p-3'>
                    <ul className='list-disc list-inside'>
                        <li>Multiple format support</li>
                        <li>Lossless audio options</li>
                        <li>Batch downloads</li>
                    </ul>
                </div>
                </div>
            <div className='bg-white flex justify-center content-center rounded-xl flex-col p-15 shadow-2xl'>
                <div className='pl-3 font-bold'>Fast Processing</div>
                <div className='p-3 mt-2'>Quick turnaround times wth our optimized processing pipeline and cloud infrastructure.</div>
                <div className='p-3'>
                    <ul className='list-disc list-inside'>
                        <li>Average 2-3 minutes per song</li>
                        <li>Parallel processing</li>
                        <li>Real-time progress tracking</li>
                    </ul>
                </div>
                </div>
           <div className='bg-white flex justify-center content-center rounded-xl flex-col p-15 shadow-2xl'>
                <div className='pl-3  font-bold'>Mobile Friendly</div>
                <div className='p-3 mt-2'>Fully responsive design works perfectly on desktop, tablet, and mobile devies.</div>
                <div className='p-3'>
                    <ul className='list-disc list-inside'>
                        <li>Touch-optimized controls</li>
                        <li>Responsive layouts</li>
                        <li>Cross-platform support</li>
                    </ul>
                </div>
                </div>
            <div className='bg-white flex justify-center content-center rounded-xl flex-col p-15 shadow-2xl'>
                <div className='pl-3 font-bold'>Secure & Private</div>
                <div className='p-3 mt-2'>Your audio files are processed securely and automatically deleted after processing</div>
                <div className='p-3'>
                    <ul className='list-disc list-inside'>
                        <li>End-to-end encryption</li>
                        <li>Auto-deletion policy</li>
                        <li>No data retention</li>
                    </ul>
                </div>
                </div>
        </div>
    </div>
  )
}
