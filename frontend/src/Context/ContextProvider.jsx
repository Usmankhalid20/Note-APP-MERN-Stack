// import React from 'react'
// import {createContext, useContext, useState} from 'react'

// const authContext = createContext()

// const ContextProvider = ({ children }) => {
//      const [user, setUser] = useState(null)

//     const login = (userData) => {
//     setUser(userData); 
//   };

//    const logout = () => {
//     setUser(null); 
//     localStorage.removeItem('token');
//   };
//   return (
//     <>
//      <authContext.Provider value={{ user, login, logout }}>
//         {children}
//      </authContext.Provider>
//     </>
//   )
// }
// export const useAuth = () => useContext( authContext )
// export default ContextProvider

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = (userData) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default ContextProvider;

