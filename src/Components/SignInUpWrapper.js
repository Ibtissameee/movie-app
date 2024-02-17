import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './signinupwrapper.css';
import { useState } from 'react';
export default function SignInWrapper({onCloseClick}){
    const [isSignUp, setIsSignUp] = useState(false);
    const handleClick = ()=>{
        setIsSignUp(!isSignUp);
    };
    return(
        <div className="sign-in-up-wrapper">
             <form>
                <FontAwesomeIcon icon={faXmark} className='sign-in-up-icon' onClick={onCloseClick}/>
                <h1>{isSignUp ? "Sign Up": "Sign In"}</h1>
                <div className="input-box">
                  <input type="text" placeholder="username" required/>
                  <FontAwesomeIcon icon={faUser} className='input-box-icon'/>
                </div>
                {isSignUp ? (
                <div className="input-box">
                  <input type="text" placeholder="email" required/>
                  <FontAwesomeIcon icon={faEnvelope} className='input-box-icon'/>
                </div>): null}
                <div className="input-box">
                  <input type="password" placeholder="password" required/>
                  <FontAwesomeIcon icon={faLock} className='input-box-icon'/>
                </div>
                {isSignUp ? (
                <div className="input-box">
                  <input type="password" placeholder="confirm password" required/>
                  <FontAwesomeIcon icon={faLock} className='input-box-icon'/>
                </div>): null}
                {isSignUp ? (
                <label><input type="checkbox"/>I accept the Terms of Use & privacy Policy</label>)
                :
                (<div className='remember-forgot'>
                    <label><input type="checkbox"/>Remember Me</label>
                    <a href="#">Forgot Password</a>
                </div>)}
                <button type="submit">{isSignUp ? "Sign Up": "Log In"}</button>
                {isSignUp ? (<div className='login-link'>
                    <p>
                        Already have an account?
                       <a href="#" onClick={handleClick}>Log In</a>
                    </p>
                </div>): (<div className='register-link'>
                    <p>
                        Don't have an account?
                       <a href="#" onClick={handleClick}>Register</a>
                    </p>
                </div>)}
             </form>
        </div>
    );
}