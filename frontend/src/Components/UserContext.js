import React, { createContext, useState, useContext } from 'react'

const UserContext = createContext();
function UserProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [refreshToken, setRefreshToken] = useState("");
  return (
    <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, refreshToken, setRefreshToken}}>
      {children}
    </UserContext.Provider>
  )
}
export function useLoggedIn() {
    return useContext(UserContext);
  }

export default UserProvider
