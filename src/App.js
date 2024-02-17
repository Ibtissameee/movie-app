import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import 'swiper/css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import Main from './Pages/Main';
import Footer from './Components/Footer';
import BackToTopBtn from './Components/BackToTopBtn';
import { useEffect, useState } from 'react';
import SignInUp from './Components/SignInUp';
import MovieBooking from './Pages/MovieBooking';
import SeatsBooking from './Components/SeatsBooking';

function App() {
  const [scroll, setScroll] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
    useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      setScroll(window.scrollY);
    });
    return ()=>{
      window.removeEventListener('scroll', ()=>{
        setScroll(window.scrollY);
      });
    };
  }, [scroll]);
  const handleSignInClick = ()=>{
    setShowSignIn(true);
  };
  const handleCloseClick = ()=>{
    setShowSignIn(false);
  };
  const handleBookClick = ()=>{
    setShowBooking(true);
  };
  const handleCloseBookClick = ()=>{
    setShowBooking(false);
  }
  return (
    <>
      <NavBar
       scroll={scroll}
      onSignInClick={handleSignInClick}
      />
      {showSignIn && <SignInUp onCloseClick={handleCloseClick}/>}
      {showBooking && <SeatsBooking onCloseClick = {handleCloseBookClick}/>}
      <Banner onBookClick={handleBookClick}/>
     {/* <MovieBooking/>*/}
      <Main/>
      <Footer/>
      <BackToTopBtn scroll={scroll}/>
      
    </>
  );
}

export default App;
