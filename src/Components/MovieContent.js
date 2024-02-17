import Button from './Button';
import './moviecontent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons'
export default function MovieContent({movie, onBookClick}){

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
                />
            </div>
    );
}