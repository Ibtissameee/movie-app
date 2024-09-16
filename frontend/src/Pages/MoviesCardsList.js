import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import filterList from '../data/FilterList';
import './moviescardslist.css';
import axios from "axios";
export default function MoviesCardsList({type}){
    const [data, setData] = useState([]);
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState(filterList);
     //fetch data from moviesData.json file
   /* const fetchData = async()=>{
        fetch('http://localhost:3000/data/moviesData.json')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(e => console.log(e.message));
    };*/
    const fetchData = async()=>{
        const result = await axios.get("http://localhost:9000/movies/movies");
        setData(result.data);
        console.log(result);
    };
    useEffect(() =>{
        fetchData()
    },[]);
    useEffect(()=>{
          setMovies(data);
    },[data]);
    const handleFilterMovies = (category)=>{
        category = category.toLowerCase();
        setFilters(filters.map(filter=>{
            filter.active = false;
            if(filter.name === category)
              filter.active = true;
            return filter;
        }));
       if(category==='all')
         setMovies(data);
       else{
        const filteredMovies = data.filter(movie => {
            const categories = movie.category.toLowerCase().split(" ");   
            console.log(categories)
            return categories.includes(category); 
            
        });
        
         setMovies(filteredMovies);
         
        }
    }
    return(
        <section id={type} className="movies-cards-list">
            <div className="container-fluid">
                <div className="row">
                    <h4 className="section-title">For {type}</h4>
                </div>
                {type==='adults' &&
                <div className="row">
                    <ul className="filters">
                        {filters.map(filter=>{
                            return <li
                             key={filter.name} 
                            className={`${filter.active ? 'active':undefined}`}
                            onClick={()=>handleFilterMovies(filter.name)}
                            >
                                {filter.name}
                            </li>
                        })}
                    </ul>
                </div>
                }
                <div className="row mt-5">
                    {movies && movies.length>0 && movies.map((movie)=>{
                      return <MovieCard key={movie.id} movie={movie}/>
                    })
                    
                    }
                </div>
            </div>
        </section>
    );
}