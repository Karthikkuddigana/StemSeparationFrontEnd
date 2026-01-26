"use client";

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export default function SessionManager({ children }) {
  const [userName, setuserName] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure browser-only execution
  useEffect(() => {
    setIsClient(true);

    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setuserName(storedUserName);
    }
  }, []);

  const login = async (userName, password) => {
    try {
      const response = await fetch(
        "https://localhost:7000/api/LoginAndRegister/SignIn",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
        }
      );

      const jsonResp = await response.json();

      localStorage.setItem("token", jsonResp.jwtToken);
      localStorage.setItem("userName", jsonResp.userName);

      setuserName(jsonResp.userName);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setuserName(null);
    localStorage.clear();
  };

  // Prevent rendering until client-side mount
  if (!isClient) return null;

  return (
    <AuthContext.Provider value={{ login, userName, logout, setuserName }}>
      {children}
    </AuthContext.Provider>
  );
}
