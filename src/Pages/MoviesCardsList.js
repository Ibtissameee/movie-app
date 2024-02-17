import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import filterList from '../data/FilterList';
import './moviescardslist.css';
export default function MoviesCardsList({type}){
    const [data, setData] = useState([]);
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState(filterList);
     //fetch data from moviesData.json file
     const fetchData = ()=>{
        fetch('http://localhost:3000/data/moviesData.json')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(e => console.log(e.message));
    };
    useEffect(() =>{
        fetchData()
    },[]);
    useEffect(()=>{
          setMovies(data);
    },[data]);
    const handleFilterMovies = (category)=>{
        setFilters(filters.map(filter=>{
            filter.active = false;
            if(filter.name === category)
              filter.active = true;
            return filter;
        }));
       if(category==='All')
       setMovies(data);
     else
        setMovies(data.filter(movie=>movie.category ===category.toLowerCase()));
     
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