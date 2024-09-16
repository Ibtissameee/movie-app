import NavListItem from './NavListItem';
import navListData from '../data/navListData';
import './navbar.css'
import Search from './Search';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function NavBar({scroll, onSignInClick}){
  const [navList, setNavList] = useState(navListData);
  const [isMobile, setIsMobile] = useState(false);
  const handleNavOnClick = (id) =>{
    const newNavList = navList.map(nav=>{
        nav.active = false;
        if(nav.id === id)
         nav.active=true;
        return nav;
    });
    setNavList(newNavList);
  }
    return(
        <header className={`${scroll>100 ? 'scrolled': undefined}`}>
            
            <a href="/" className="logo">
                CINEMA
            </a>
            <ul className={`${isMobile ? "mobile-nav": "nav"}`}
            onClick={()=>setIsMobile(false)}>
               {navListData.map(nav => <NavListItem key={nav.id} nav={nav} navOnClick={handleNavOnClick}/>)}
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
            </Link>
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