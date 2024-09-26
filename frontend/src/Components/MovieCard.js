import './moviecard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
export default function MovieCard({movie}){
    return(
        <section className='col-lg-2 col-md-4 col-sm-6'>
            <div className='movie-card'>
                <img src={`data:image/jpeg;base64,${movie.previewImgPath}`} className='img-fluid'/>
                <p>{movie.length} | {movie.category}</p>
                <div className='content'>
                    <h4>{movie.title}</h4>
                    <div className='card-icons'>
                    <FontAwesomeIcon icon={faPlus} className='movie-card-icon'/>
                    <FontAwesomeIcon icon={faPlay} className='movie-card-icon'/>                        
                    </div>
                </div>
            </div>
        </section>
    );
}