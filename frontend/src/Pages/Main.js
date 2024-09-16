

import ComingSoon from './ComingSoon';
import MoviesCardsList from './MoviesCardsList';

import './main.css';

export default function Main(){
    return(
        <main>
            <MoviesCardsList type="adults"/>
            <MoviesCardsList type="kids"/>
            <ComingSoon/>
            
            
        </main>
    )
}