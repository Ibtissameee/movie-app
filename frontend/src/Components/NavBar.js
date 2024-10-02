import NavListItem from './NavListItem';
import navListData from '../data/navListData';
import './navbar.css'
import Search from './Search';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useLoggedIn } from './UserContext';
import axios from 'axios';
export default function NavBar({scroll, onSignInClick}){
  const [navList, setNavList] = useState(navListData);
  const [isMobile, setIsMobile] = useState(false);
  const {isLoggedIn, refreshToken, setIsLoggedIn} = useLoggedIn();
  
  useEffect(() => {
    let updatedNavList = [...navListData]; // Start with the initial navListData

    if (isLoggedIn) {
      // Add "My List" only if not already in the list
      if (!updatedNavList.some((nav) => nav.name === "My List")) {
        updatedNavList.push({
          id: updatedNavList.length + 1,
          link: "#myList",
          name: "My List",
          active: false,
        });
      }
    }

    setNavList(updatedNavList);
  }, [isLoggedIn]);
  const handleNavOnClick = (id) =>{
    const newNavList = navList.map(nav=>{
        nav.active = false;
        if(nav.id === id)
         nav.active=true;
        return nav;
    });
    setNavList(newNavList);
  }
  const logout = async (refreshToken) => {
    console.log("refresh token" +refreshToken)
    try {
      await axios.post("http://localhost:8080/realms/CinemaAppRealm/protocol/openid-connect/logout", 
        new URLSearchParams({
          'client_id': 'cinema-app-rest-api',
          'client_secret': 'oSBm1tJgQCV6huhUEUGnjw0bpMnLWYV7',
          'refresh_token': refreshToken,
        }), 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
    } catch (error) {
        console.error('Logout failed:', error);
        throw error; // You can handle error more gracefully as needed
    }
};
const handleLogout = async () => {
  try {
      await logout(refreshToken); // Call the logout function
      setIsLoggedIn(false); // Update your context state or local state
      // Optionally redirect or update UI
  } catch (error) {
      console.error('Error logging out:', error);
      // Handle error (e.g., show an error message to the user)
  }
};

    return(
        <header className={`${scroll>100 ? 'scrolled': undefined}`}>
            
            <a href="/" className="logo">
                CINEMA
            </a>
            <ul className={`${isMobile ? "mobile-nav": "nav"}`}
            onClick={()=>setIsMobile(false)}>
               {navList.map(nav => <NavListItem key={nav.id} nav={nav} navOnClick={handleNavOnClick}/>)}
               {isLoggedIn? (
                <Link to="/">
                  <Button 
                  name="Log Out" 
                  onClick={handleLogout}
                  color='#ffffff'
                  bgColor='#950101'
                  border='none'
                  backdropfilter='none'
                /> 
                </Link>):(
                <Link to="/signinup">
               <Button 
            name="Sign In" 
             icon={<FontAwesomeIcon icon={faRightToBracket} />}
             //onClick={onSignInClick}
             color='#ffffff'
             bgColor='#950101'
             border='none'
             backdropfilter='none'
            /> 
            </Link>)}
            </ul>
            <Search/>
           
            <button className='mobile-menu-icon'
            onClick={()=>setIsMobile(!isMobile)}
            >
               {isMobile ? 
               (<FontAwesomeIcon icon={faXmark} className='xmark-icon'/>)
               :
               (<FontAwesomeIcon icon={faBars} className='bars-icon'/>)
               } 
            </button>
        </header>
    );
}