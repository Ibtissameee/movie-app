import React, { createContext, useState, useContext } from 'react'

const MovieContext = createContext();
function MovieProvider({children}) {
    const [currentMovie, setCurrentMovie] = useState({});
    const [refetch, setRefetch] = useState(0);
  return (
    <MovieContext.Provider value={{currentMovie, setCurrentMovie,refetch, setRefetch}}>
    {children}
    </MovieContext.Provider>
  )
}
export function useCurrentMovie() {
    return useContext(MovieContext);
}

export default MovieProvider
