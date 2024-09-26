import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faM, faXmark } from '@fortawesome/free-solid-svg-icons';
import './modal.css';
export default function Modal({movie, status, toggleModal}){
    return(
        <div className={`movieModal ${status ? 'active':undefined}`}>
            <a href="#" className="modalClose" onClick={toggleModal}>
            <FontAwesomeIcon icon={faXmark} />
            </a>
            <iframe 
            width="1000" 
            height="500" 
            src={movie.trailer}
            title={`${movie.title} | Official Trailer`}
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe>
        </div>
    );
}