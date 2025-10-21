"use client"
import React, { useContext } from 'react'
import { useState } from 'react';
import { AuthContext } from './SessionManager';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const auth = useContext(AuthContext);
    const UserNameChangeHandler = (e) => {
        setUsername(e.target.value);
        console.log(userName)
    };
    const PasswordChangeHandler = (e) => {
        setPassword(e.target.value);
        console.log(password)
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        let res = await auth.login(userName, password);
        if (res) {
            router.replace('/');
            console.log("User login successful")
        }
        else {
            setUsername("");
            setPassword("");
            alert("Login is not successful, try again");
        }

    }

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const IdToken = credentialResponse.credential;
            console.log("Google credential:", IdToken);

            const response = await axios.post(
                "http://localhost:5205/api/LoginAndRegister/GoogleSignIn",
                { IdToken }
            );

            localStorage.setItem("token", response.data.JwtToken);
            localStorage.setItem("username", response.data.userName);
            auth.setuserName(response.data.userName); 
            router.replace("/"); // redirect to home
        } catch (error) {
            console.error(error);
            alert("Google signup failed.");
        }
    };

    const handleGoogleFailure = () => {
        alert("Google Sign-in was cancelled or failed.");
    };


    return (
        <div className='w-screen flex items-center justify-center mb-25'>
            <div className='p-5 rounded-lg w-1/4 h-100 flex flex-col gap-5 justify-center shadow-lg shadow-neutral-700 mt-25'>
                <div className='ml-20 text-xl'>
                    <label htmlFor="username">User Name:</label>
                </div>
                <div className='ml-20'>
                    <input onChange={UserNameChangeHandler} className='px-2 h-8 rounded border-2 focus:scale-110 transition-all ease-in-out' type="text" name='username' id='username' />
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
                    <button onClick={() => router.push("/signUp")} className='bg-black text-white font-bold p-3 rounded hover:scale-110 ease-in-out active:scale-125 transition duration-150 cursor-pointer'>
                        Sign Up
                    </button>
                </div>

                <div className="flex justify-center mt-3 border-amber-400 bg-blue-600">
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
                </div>
            </div>
        </div>
    )
}
