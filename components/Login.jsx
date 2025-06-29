import React from 'react'

export default function Login() {
  return (
    <div className='w-screen flex items-center justify-center'>
        <div className='p-5 rounded-lg w-1/4 h-100 flex flex-col gap-5 justify-center shadow-lg shadow-neutral-700 mt-25'>
            <div className='ml-20 text-xl'>
                <label htmlFor="username">User Name:</label>
            </div>
            <div className='ml-20'>
                <input className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="text" name='username' id='username'/>
            </div>
            <div className='ml-20 text-xl'>
                <label htmlFor="password">Password:</label>
            </div>
            <div className='ml-20'>
                <input className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="password" name="password" id="password" />
            </div>
            <div className='ml-20 cursor-pointer'>
                <input id='showPassword' className='cursor-pointer' type="checkbox" />
                <label htmlFor="showPassword" className='ml-5 cursor-pointer'>Show Password</label>
            </div>
            <div className='flex justify-around mt-5 '>
                <button className='bg-black text-white font-bold p-3 rounded hover:scale-110 ease-in-out active:scale-125 transition duration-150 cursor-pointer'>
                    Sign In
                </button>
                <button className='bg-black text-white font-bold p-3 rounded hover:scale-110 ease-in-out active:scale-125 transition duration-150 cursor-pointer'>
                    Sign Up
                </button>
            </div>
        </div>
    </div>
  )
}
