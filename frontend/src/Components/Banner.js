import { useEffect, useState } from "react";
import './banner.css';
import axios from "axios";
import MovieContent from "./MovieContent";
import MovieDate from "./MovieDate";
import MovieTrailer from "./PlayBtn";
import MovieSwiper from "./MovieSwiper";
export default function Banner({onBookClick}){
    const [movies, setMovies] = useState([]);
    //fetch data from moviesData.json file
   /* const fetchData = ()=>{
        fetch('http://localhost:3000/data/moviesData.json')
        .then(res => res.json())
        .then(data => setMovies(data))
        .catch(e => console.log(e.message));
    };*/
    const fetchData = async()=>{
        const result = await axios.get("http://localhost:9002/movies/all-movies");
        setMovies(result.data);
        console.log(movies);
    };
    
    useEffect(() =>{
        fetchData()
    },[])
    const handleSlideChange = (id) => {
        const newMovies = movies.map(movie => {
            movie.active = false;
            if(movie.id===id){
                movie.active = true;
            }
            return movie;
        })
        setMovies(newMovies);
        console.log(movies);
    }
    return(
        <div className="banner">
            {movies && movies.length>0 && movies.map((movie,index) => (
                <div className="movie" key={index}>
                <img  className={`bgImg ${movie.active ? 'active': undefined}`}  src={`data:image/jpeg;base64,${movie.bgImgPath}`}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <MovieContent movie={movie} onBookClick= {onBookClick}/>
                        </div>
                        <div className="col-lg-6 col-md-12">
                             <MovieDate movie={movie}/>
                             <MovieTrailer movie={movie}/>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            
            {movies && movies.length>0 && <MovieSwiper slides={movies} slideChange={handleSlideChange}/>}
        </div>
    );
}