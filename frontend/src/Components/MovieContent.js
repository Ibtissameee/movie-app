import Button from './Button';
import './moviecontent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import {useLoggedIn} from './UserContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useEffect, useState } from 'react';
import { useCurrentMovie } from './MovieContext';
export default function MovieContent({movie, onBookClick}){
const {isLoggedIn, accessToken} = useLoggedIn();
const {setCurrentMovie, currentMovie, setRefetch} = useCurrentMovie();
//console.log("Current Movie :  ", currentMovie)
useEffect(()=>{
  if(movie.active)
  setCurrentMovie({movie});
}, [movie.active])
useEffect(() => {console.log("Current movie in Movie Content : ", {currentMovie})}, [currentMovie]);
const navigate = useNavigate();
const handleAddToMyList = async () => {
  if(isLoggedIn){
    try{
      const response = await axios.post(
        "http://localhost:9002/movies/add-favorite-movie",
        
           movie.id,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Movie added to favorites: ", response.data);
      setRefetch((prev) => prev+1);
      toast.success("Movie Added Successfully To Your List!");
     
    }catch(error){
      console.log("Error adding movie to favorites: ", error);
      toast.error("Error Adding Movie To List. Please Retry Later");
    }
  }else{
    navigate('/signinup');
  }
}
    return(
        <div className={`content ${movie.active ? 'active': undefined}`}>

                <div className="movie-title">
                   {movie.title}
                </div>
                <h4>
                  <span>{movie.year}</span>
                  <span>{movie.length}</span>
                  <span>{movie.category}</span>
                </h4>
                <p>{movie.description}</p>
                <Button name="Book" 
                icon={<FontAwesomeIcon icon={faBookmark}/>}
                color='#ffffff'
                bgColor='#950101'
                border='none'
                backdropfilter='none'
                onClick={onBookClick}
                />
                
                  <Button name="my List" 
                  icon={<FontAwesomeIcon icon={faPlus}/>}
                  color='#ffffff'
                  bgColor='none'
                  border='1px solid #ffffff'
                  backdropfilter='blur(20px);'
                  onClick={handleAddToMyList}
                  />
                  <ToastContainer/>
                  
            </div>
    );
}