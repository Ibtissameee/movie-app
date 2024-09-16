import './playbtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Modal from './Modal';
import { useState } from 'react';
export default function MovieTrailer({movie}){
    
        const [modal, setModal] = useState(false);
        const toggleModal = ()=>{
           setModal(!modal);
        }
        return(
        <>
          <div className={`trailer ${movie.active ?'active':undefined}`}>
                <a href="#" className="playBtn" onClick={toggleModal}>
                    <FontAwesomeIcon icon={faPlay} className='play-icon'/>
                </a>
                <p>Watch Trailer</p>
           </div>
          {movie.active && <Modal movie={movie} status={modal} toggleModal={toggleModal}/>}
         </>
    );
}