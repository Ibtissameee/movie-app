

import MyList from '../Components/MyList';
import { useLoggedIn } from '../Components/UserContext';
import ComingSoon from './ComingSoon';
import MoviesCardsList from './MoviesCardsList';

import './main.css';

export default function Main(){
    const {isLoggedIn} = useLoggedIn()
    return(
        <main>
            <MoviesCardsList type="adults"/>
            <MoviesCardsList type="kids"/>
            <ComingSoon/>
            {isLoggedIn && <MyList/>}
            
            
        </main>
    )
}