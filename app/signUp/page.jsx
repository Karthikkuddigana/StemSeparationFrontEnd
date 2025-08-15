"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/components/SessionManager';

export default function SignUp() {
        const [password, setPassword] = useState(""); 
        const [confirmPassword, setconfirmPassword] = useState(""); 
        const [firstName, setfirstName] = useState(""); 
        const [lastName, setlastName] = useState(""); 
        const [email, setEmail] = useState(""); 
        const [userName, setUserName] = useState("")
        const router = useRouter(); 
        const auth = useContext(AuthContext); 
        let empty = [];
        const PasswordChangeHandler=(e)=>{
            setPassword(e.target.value); 
        }; 
        const firstNameChangeHandler=(e)=>{
            setfirstName(e.target.value); 
        }
        const lastNameChangeHandler = (e ) => { 
            setlastName(e.target.value); 
         }
        const emailChangeHandler = (e ) => { 
            setEmail(e.target.value); 
         }
        const confirmPasswordChangeHandler = (e ) => { 
            setconfirmPassword(e.target.value); 
          }

        const userNameChangeHandler = (e ) => { 
            setUserName(e.target.value); 
          }
        const checkForRequiredFields = () => {
            let alertMsg = "The following fields are required, pls enter them to proceed:\n"
            
            const fields = {
                email,
                password,
                confirmPassword,
                firstName,
                lastName, 
                userName
            };
            for (let key in fields) {
                if (fields[key] === "") {
                    empty.push(key);
                }
            }
            for(let i of empty){
                alertMsg=alertMsg+i+"\n"
            }
            console.log(alertMsg)
            return alertMsg
        };

        const submitHandler=async(e ) => { 
            e.preventDefault(); 
            let alertMsg=checkForRequiredFields(); 
            if(password!=confirmPassword){
                alert(alertMsg+"Please enter the same passowrd in Re-enter password to continue")
            }
            else if(empty.length>0){
                console.log(empty)
                alert(alertMsg)
            }
            else{
                let response = await fetch("http://localhost:5205/api/LoginAndRegister/SignUp",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            userName,
                            password, 
                            email, 
                            firstName, 
                            lastName
                            })
                    }); 
                if(response.ok){
                    alert("Sign Up is successful, login with your credentials"); 
                    router.push("/login")
                }
                else{
                    let res = await response.json(); 
                    alert(res.message); 
                }

            }
        }
  return (
    //  <form onSubmit={submitHandler}>
        <div className='w-screen flex items-center justify-around mb-25'>
        
                <div className='p-10 pr-15 rounded-lg w-auto grid grid-cols-2 gap-15 justify-around items-center shadow-lg shadow-neutral-700 mt-25'>
                        <div className='col-span-2 flex justify-around'>
                            <div className='font-bold text-2xl'>
                            Sign Up
                            </div>
                        </div>
                        
                        <div className='text-xl flex '>
                            <div className='w-1/4'>
                                <label htmlFor="firstName">First Name:</label>
                            </div>
                            <div className='w-3/4'>
                                <input required onChange={firstNameChangeHandler} className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="text" name='firstName' id='firstName'/>
                            </div>
                        </div>
                        <div className='text-xl flex'>
                            <div className='w-1/4'>
                                <label htmlFor="lastName">Last Name:</label>
                            </div>
                            <div className='w-3/4'>
                                <input required onChange={lastNameChangeHandler} className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="text" name='lastName' id='lastName'/>
                            </div>
                        </div>
                        <div className='text-xl flex'>
                            <div className='w-1/4'>
                                <label htmlFor="email">Email:</label>
                            </div>
                            <div className='w-3/4'>
                                <input requried="true" onChange={emailChangeHandler} className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="email" name='email' id='email'/>
                            </div>
                        </div>
                        <div className='text-xl flex'>
                            <div className='w-1/4'>
                                <label htmlFor="email">UserName:</label>
                            </div>
                            <div className='w-3/4'>
                                <input requried="true" onChange={userNameChangeHandler} className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="text" name='username' id='username'/>
                            </div>
                        </div>
                        <div className='text-xl flex'>
                            <div className='w-1/4'>
                                <label htmlFor="password">Password:</label>
                            </div>
                            <div className='w-3/4'>
                                <input required onChange={PasswordChangeHandler} className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="password" name="password" id="password" />
                            </div>
                        </div>
                        {/* <div className='ml-20 cursor-pointer'>
                            <input id='showPassword' className='cursor-pointer' type="checkbox" />
                            <label htmlFor="showPassword" className='ml-5 cursor-pointer'>Show Password</label>
                        </div> */}
                        <div className='text-xl flex'>
                            <div className='w-1/4'>
                                <label htmlFor="password">Re-enter password:</label>
                            </div>
                            <div className='w-3/4'>
                                <input required onChange={confirmPasswordChangeHandler} className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="password" name="confirmPassword" id="confirmPassword" />
                            </div>
                        </div>
                        {/* <div className='ml-20 cursor-pointer'>
                            <input id='showReenterPassword' className='cursor-pointer' type="checkbox" />
                            <label htmlFor="showReenterPassword" className='ml-5 cursor-pointer'>Show Password</label>
                        </div> */}
                    
                    <div className='flex justify-around mt-5 col-span-2'>
                        <button type='submit' onClick={submitHandler} className='bg-black text-white font-bold p-3 rounded hover:scale-110 ease-in-out active:scale-125 transition duration-150 cursor-pointer'>
                            Sign Up
                        </button>
                    </div>
                </div>
            
        
        </div>
    // </form>
  )
}
