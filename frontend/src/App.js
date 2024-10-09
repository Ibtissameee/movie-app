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
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import SignInUpContainer from './Pages/SignInUpContainer';
import CheckoutForm from './Components/payment/CheckoutForm';
import Completion from './Components/payment/Completion';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from './Components/payment/Payment';
import UserProvider from './Components/UserContext';
import MyList from './Components/MyList';
import MovieProvider from './Components/MovieContext';
import SeatsProvider from './Components/SeatsContext';

const stripePromise = loadStripe("pk_test_51Q0lUd05RdrRFtkIwJrtosoRNI6wpCb0vooYLQFnkpeAcr4dkSQQSCAuT3U1fOJr8RzTKnehoaCcT1HuQOcVnme200CQbqDS2S");


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
    <UserProvider>
      <SeatsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<AppLayout/>}></Route>
          <Route path="/signinup" exact element={<SignInUpContainer/>}></Route>
           {/* Wrap CheckoutForm with Elements provider only when clientSecret is available */}
          
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/complete" element={<Completion />} />
        </Routes>
      </BrowserRouter>
      </SeatsProvider>
    </UserProvider>
  );
}

export default App;
