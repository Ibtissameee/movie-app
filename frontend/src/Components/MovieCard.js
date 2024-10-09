import './moviecard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus , faMinus} from '@fortawesome/free-solid-svg-icons'
import { useLoggedIn } from './UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';
import { useCurrentMovie } from './MovieContext';
import { useEffect } from 'react';

export default function MovieCard({movie, isMyList}){
    const navigate = useNavigate();
    const {isLoggedIn, accessToken} = useLoggedIn();
    const {setRefetch} = useCurrentMovie();
    useEffect(() => {console.log("isLoggedIn from MovieCard: ", isLoggedIn)}, [isLoggedIn]);
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
      const handleDeleteFromMyList = async () => {
        if(isLoggedIn){
            console.log("the movie I want to delete is:  ", movie.id);
          try{
            const response = await axios.delete(
              "http://localhost:9002/movies/delete-favorite-movie",
              
              {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                },
                data: movie.id
              }
              
            );
            console.log("Movie deleted from favorites: ", response.data);
            setRefetch((prev) => prev+1);
            toast.success("Movie Deleted Successfully From Your List!");
           
          }catch(error){
            console.log("Error deleting movie from favorites: ", error);
            toast.error("Error Deleting Movie From List. Please Retry Later");
          }
        }else{
          navigate('/signinup');
        }
      }
    return(
        <section className='col-lg-2 col-md-4 col-sm-6'>
            <div className='movie-card'>
                <img src={`data:image/jpeg;base64,${movie.previewImgPath}`} className='img-fluid'/>
                <p>{movie.length} | {movie.category}</p>
                <div className='content'>
                    <h4>{movie.title}</h4>
                    <div className='card-icons'>
                    <FontAwesomeIcon icon={isMyList ? faMinus : faPlus} className='movie-card-icon' onClick={isMyList ? handleDeleteFromMyList : handleAddToMyList}/>
                    <FontAwesomeIcon icon={faPlay} className='movie-card-icon'/>                        
                    </div>
                </div>
            </div>
            
        </section>
    );
}