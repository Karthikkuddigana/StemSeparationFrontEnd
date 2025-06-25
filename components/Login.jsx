import React from 'react'

export default function Login() {
  return (
    <div className='w-screen h-auto flex items-center justify-center '>
        <div className='p-5 bg-slate-400 rounded-lg w-1/4 h-100 flex flex-col gap-5 justify-center shadow-lg shadow-neutral-700 mt-50'>
            <div className='ml-20'>
                <label htmlFor="username">User Name:</label>
            </div>
            <div className='ml-20'>
                <input className='px-2 h-8 bg-slate-100 rounded focus:bg-slate-200' type="text" name='username' id='username'/>
            </div>
            <div className='ml-20'>
                <label htmlFor="password">Password:</label>
            </div>
            <div className='ml-20'>
                <input className='px-2 h-8 rounded bg-slate-100' type="password" name="password" id="password" />
            </div>
            <div className='flex justify-around mt-5 '>
                <button className='bg-slate-500 p-3 rounded hover:scale-125 ease-in-out hover:bg-slate-600 active:scale-125 transition duration-150'>Sign In</button>
                <button className='bg-slate-500 p-3 rounded hover:scale-125 ease-in-out hover:bg-slate-600 active:scale-125 transition duration-150'>Sign Up</button>
            </div>
        </div>
    </div>
  )
}
