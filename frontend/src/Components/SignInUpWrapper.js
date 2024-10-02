import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './signinupwrapper.css';
import { useState } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import { loginSchema, signUpSchema } from './FormValidation/SignUpSchema';
import { Formik, Form, Field , ErrorMessage} from 'formik';
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from './UserContext';
export default function SignInWrapper({onCloseClick}){
    const [isSignUp, setIsSignUp] = useState(false);
    const [role, setRole] = useState('USER');
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const {accessToken, setAccessToken} = useLoggedIn();
    //const [showErrorModal, setShowErrorModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    //const handleCloseErrorModal = () => setShowErrorModal(false);
    const navigate = useNavigate();
    const {isLoggedIn, setIsLoggedIn, setRefreshToken} = useLoggedIn();
    const handleClick = ()=>{
        setIsSignUp(!isSignUp);
    };
    const handleSubmit = async (values, { setSubmitting }) => {
      try {
          let response;
          if(isSignUp) {
            console.log(values);
            // Fetch the admin token
            const tokenResponse = await axios.post("http://localhost:8080/realms/CinemaAppRealm/protocol/openid-connect/token", {
              client_id: "cinema-app-rest-api", // Your client ID
              client_secret: "oSBm1tJgQCV6huhUEUGnjw0bpMnLWYV7",
              username: "admin", 
              password: "admin", 
              grant_type: "password"
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        

          const adminToken = tokenResponse.data.access_token; // Get the access token of the admin
          console.log(adminToken)
          

          response = await axios.post("http://localhost:9002/movies/register", {
              username: values.username,
              email: values.email,
              enabled: true,
              credentials: [
                  {
                      type: "password",
                      value: values.password,
                      temporary: false 
                  }
              ],
              "attributes": {
                "email_verified": ["true"]
            }
          },
        {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        }); 
        setSuccess(true);
        setShowModal(true);
          } else{
            const tokenResponseUser = await axios.post("http://localhost:8080/realms/CinemaAppRealm/protocol/openid-connect/token", {
              client_id: "cinema-app-rest-api", // Your client ID
              client_secret: "oSBm1tJgQCV6huhUEUGnjw0bpMnLWYV7",
              username: values.username, 
              password: values.password, 
              grant_type: "password"
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
            const userToken = tokenResponseUser.data.access_token;
            setRefreshToken(tokenResponseUser.data.refresh_token);
            response = await axios.post("http://localhost:9002/movies/login", {
              username: values.username,
              password: values.password
            },
            {
              headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
              }
            });
            setIsLoggedIn(true);
            setAccessToken(userToken);
            navigate('/');
          }
         
          console.log("Response from server", response.data);
          
      } catch (error) {
          console.log("Error: ", error.response.data);
          setError(true);
          setShowModal(true);
      } finally {
          setSubmitting(false);
      }
  };
    return(
        <div className="sign-in-up-wrapper">
          {/*showErrorModal && <ErrorAlert handleCloseErrorModal={handleCloseErrorModal}/>*/}
          {showModal ? <SuccessAlert handleCloseModal={handleCloseModal} type={success ? 'success' : 'error'}/> 
             :
             <Formik
             initialValues={{
              username: '',
              email: isSignUp ? '' : null,
              password: '',
              matchingPassword: isSignUp ? '' : null,
              role: 'USER'
             }}
             validationSchema={isSignUp ? signUpSchema: loginSchema}
             onSubmit={handleSubmit}
             >
              {({ isSubmitting }) => (
              <Form className='form'>
                  <FontAwesomeIcon icon={faXmark} className='sign-in-up-icon' onClick={onCloseClick}/>
                  <h1>{isSignUp ? "Sign Up": "Sign In"}</h1>
                  <div className="input-box">
                    <Field type="text" placeholder="Username" name="username" className="input"/>
                    <FontAwesomeIcon icon={faUser} className='input-box-icon' />
                    <ErrorMessage name="username" component="div" className="error-message" style={{color:  'var(--primary)',fontWeight: 'bold' }}/>
                  
                  </div>
                  {isSignUp ? (
                  <div className="input-box">
                    <Field type="text" placeholder="Email" name="email" className="input"/>
                    <FontAwesomeIcon icon={faEnvelope} className='input-box-icon'/>
                    <ErrorMessage name="email" component="div" className="error-message" style={{color:  'var(--primary)',fontWeight: 'bold' }} />
                  </div>): null}
                  <div className="input-box">
                    <Field type="password" placeholder="Password" name="password" className="input"/>
                    <FontAwesomeIcon icon={faLock} className='input-box-icon'/>
                    <ErrorMessage name="password" component="div" className="error-message" style={{color:  'var(--primary)',fontWeight: 'bold'}}/>
                  </div>
                  {isSignUp ? (
                  <div className="input-box">
                    <Field type="password" placeholder="confirm password" name="matchingPassword" className="input"/>
                    <FontAwesomeIcon icon={faLock} className='input-box-icon'/>
                    <ErrorMessage name="matchingPassword" component="div" className="error-message" style={{color:  'var(--primary)',fontWeight: 'bold'}}/>
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
              </Form>
              )}
              </Formik>
          }
             
        </div>
    );
}