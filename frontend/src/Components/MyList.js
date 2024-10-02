import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard';
import axios from 'axios';
import { useLoggedIn } from './UserContext';
function MyList() {
    const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
    const {accessToken} = useLoggedIn();
    console.log(accessToken)
    const fetchData = async()=>{
        try{
            const response = await fetch("http://localhost:9002/movies/all-favorite-movies", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFavoriteMoviesList(data);
            console.log("Fetched favorite movies:", data);

        }catch(error){
            console.log("Error fetching the favorite movies : ",error);
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
        }
    };
    useEffect(() =>{
        fetchData()
        console.log("Favorite Movies list:  ", favoriteMoviesList)
    },[accessToken]);
    return (
        <div>
             <section className="movies-cards-list" id="myList">
                <div className="container-fluid">
                    <div className="row">
                        <h4 className="section-title">My List</h4>
                    </div>
                    <div className="row mt-5">
                        {favoriteMoviesList && favoriteMoviesList.length>0 && favoriteMoviesList.map((movie)=>{
                        return <MovieCard key={movie.id} movie={movie}/>
                        })
                        
                        }
                    </div>
                </div>
        </section>
        
        </div>
  )
}

export default MyList
