import React, { createContext, useState, useContext } from 'react'

const MovieContext = createContext();
function MovieProvider({children}) {
    const [currentMovie, setCurrentMovie] = useState({});
  return (
    <MovieContext.Provider value={{currentMovie, setCurrentMovie}}>
    {children}
  </MovieContext.Provider>
  )
}
export function useCurrentMovie() {
    return useContext(MovieContext);
}

export default MovieProvider
