"use client"
import React, { useContext } from 'react'
import { useState} from 'react';
import { AuthContext } from './SessionManager';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [userName, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const router = useRouter(); 
    const auth = useContext(AuthContext); 
    const UserNameChangeHandler=(e) => { 
        setUsername(e.target.value); 
        console.log(userName)
     }; 
    const PasswordChangeHandler=(e)=>{
        setPassword(e.target.value); 
        console.log(password)
    }; 
    const submitHandler=async(e ) => { 
        e.preventDefault(); 
        let res = await auth.login(userName, password); 
        if(res){
             router.replace('/'); 
            console.log("User login successful")
        }
        else{
            setUsername(""); 
            setPassword(""); 
            alert("Login is not successful, try again"); 
        }
        
     }
  return (
    <div className='w-screen flex items-center justify-center mb-25'>
        <div className='p-5 rounded-lg w-1/4 h-100 flex flex-col gap-5 justify-center shadow-lg shadow-neutral-700 mt-25'>
            <div className='ml-20 text-xl'>
                <label htmlFor="username">User Name:</label>
            </div>
            <div className='ml-20'>
                <input onChange={UserNameChangeHandler} className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="text" name='username' id='username'/>
            </div>
            <div className='ml-20 text-xl'>
                <label htmlFor="password">Password:</label>
            </div>
            <div className='ml-20'>
                <input onChange={PasswordChangeHandler} className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="password" name="password" id="password" />
            </div>
            <div className='ml-20 cursor-pointer'>
                <input id='showPassword' className='cursor-pointer' type="checkbox" />
                <label htmlFor="showPassword" className='ml-5 cursor-pointer'>Show Password</label>
            </div>
            <div className='flex justify-around mt-5 '>
                <button onClick={submitHandler} className='bg-black text-white font-bold p-3 rounded hover:scale-110 ease-in-out active:scale-125 transition duration-150 cursor-pointer'>
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
