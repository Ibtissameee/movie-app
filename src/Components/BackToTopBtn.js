import './backtotopbtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUpLong} from '@fortawesome/free-solid-svg-icons';

export default function BackToTopBtn({scroll}){
    const backToTop = ()=>{
        window.scrollTo(0, 0);
    };
    return(
        <a className={`back-to-top ${scroll>100 ?'active': undefined}`} onClick={backToTop}>
           <FontAwesomeIcon icon={faUpLong} className='back-to-top-icon' />
        </a>
    );
}