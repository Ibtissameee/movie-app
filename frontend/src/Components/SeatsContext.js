import React from 'react'
import { createContext, useContext, useState } from 'react';
const SeatsContext = createContext();
const SeatsProvider = ({children}) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <SeatsContext.Provider value={{selectedSeats, setSelectedSeats}}>
    {children}
  </SeatsContext.Provider>
  )
}
export function useSelectedSeats() {
    return useContext(SeatsContext);
}

export default SeatsProvider
