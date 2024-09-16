import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './search.css';
export default function Search(){
    return(
        <div className="search">
            <input type="text" placeholder="search"/>
            <FontAwesomeIcon icon={faSearch} className='search-icon'/>
        </div>
    );
}