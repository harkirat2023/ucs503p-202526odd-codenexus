// // import React, { createContext, useContext, useState, useEffect } from 'react'
// // import { authAPI } from '../services/api'

// // const AuthContext = createContext()

// // export const useAuth = () => {
// //   const context = useContext(AuthContext)
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider')
// //   }
// //   return context
// // }

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null)
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem('user')
// //     const token = localStorage.getItem('token')
    
// //     if (storedUser && token) {
// //       setUser(JSON.parse(storedUser))
// //     }
// //     setLoading(false)
// //   }, [])

// //   const login = async (email, password) => {
// //     try {
// //       const response = await authAPI.login(email, password)
// //       const { token, user: userData } = response.data
      
// //       localStorage.setItem('token', token)
// //       localStorage.setItem('user', JSON.stringify(userData))
// //       setUser(userData)
      
// //       return { success: true }
// //     } catch (error) {
// //       return { 
// //         success: false, 
// //         error: error.response?.data?.message || 'Login failed' 
// //       }
// //     }
// //   }

// //   const register = async (userData) => {
// //     try {
// //       await authAPI.register(userData)
// //       return { success: true }
// //     } catch (error) {
// //       return { 
// //         success: false, 
// //         error: error.response?.data?.message || 'Registration failed' 
// //       }
// //     }
// //   }

// //   const logout = () => {
// //     localStorage.removeItem('token')
// //     localStorage.removeItem('user')
// //     setUser(null)
// //   }

// //   const value = {
// //     user,
// //     login,
// //     register,
// //     logout,
// //     loading
// //   }

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   )
// // }
// import React, {createContext, useContext, useState, useEffect} from "react";
// import {authAPI} from "../services/api";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({children}) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const u = localStorage.getItem("user");
//     setUser(u ? JSON.parse(u) : null);
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     const {data} = await authAPI.login(email, password);
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//     setUser(data.user);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{user, loading, login, logout}}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import React, {createContext, useContext, useState, useEffect} from "react";
import {authAPI} from "../services/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const {data} = await authAPI.login(email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
