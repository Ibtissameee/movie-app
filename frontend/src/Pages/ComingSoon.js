import {useState, useEffect} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import './main.css';
import MovieCard from '../Components/MovieCard';
import './comingsoon.css';
import ComingSoonCard from '../Components/ComingSoonCard';
export default function ComingSoon(){
    const [data, setData] = useState([]);
    const [movies, setMovies] = useState([]);
   // const [filters, setFilters] = useState(filterList);
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
    return(
       <section className="coming-soon" id="commingSoon">
         <div className="container-fluid">
                <div className="row">
                    <h4 className="section-title">Coming Soon</h4>
                </div>
                <div className="row">
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={30}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  
                  loop={true}
                  modules={[Autoplay]}
                  className="coming-soon-swiper"
                  >
                   
                    {movies && movies.length>0 && movies.map((movie)=>{
                      return (<SwiperSlide><ComingSoonCard key={movie.id} movie={movie}/></SwiperSlide>);
                    })
                    
                    }
                    
                
        </Swiper>
                </div>
         </div>
       </section>
    );
}