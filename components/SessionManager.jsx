"use client"
import React, { createContext,useState } from 'react'
export const AuthContext = createContext(); 
export default function SessionManager({children}) {
    let s= localStorage.getItem("username")
    const [userName, setuserName] = useState(s); 
    console.log("Session Manager is called"); 
    const login = async(userName,password)=>{
        try{
            let response = await fetch("http://localhost:5205/api/LoginAndRegister/SignIn",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    userName,
                    password
                })
            }); 
            let jsonResp = await response.json(); 
            console.log(jsonResp); 
            localStorage.setItem("token",jsonResp.jwtToken); 
            localStorage.setItem("username",jsonResp.username); 
            setuserName(jsonResp.userName); 
            console.log("Login is sucessful"); 
            console.log(`Token is ${jsonResp.jwtToken} `)
            return true
        }
        catch(error ){
            console.log(error); 
            return false 
        }
    }
    const logout = () => { 
        setuserName(null)
        localStorage.clear(); 
     }
  return (
    <AuthContext.Provider value={{login, userName, logout}}>
        {children}
    </AuthContext.Provider>
  )
}
