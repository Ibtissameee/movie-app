import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './signinupwrapper.css';
import { useState } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import { signUpSchema } from './FormValidation/SignUpSchema';
import { Formik, Form, Field , ErrorMessage} from 'formik';
export default function SignInWrapper({onCloseClick}){
    const [isSignUp, setIsSignUp] = useState(false);
   // const [username, setUsername] = useState("");
    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    //const [matchingPassword, setMatchingPassword] = useState("");
    const [role, setRole] = useState('USER');
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    //const [showErrorModal, setShowErrorModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    //const handleCloseErrorModal = () => setShowErrorModal(false);
    const handleClick = ()=>{
        setIsSignUp(!isSignUp);
    };
    const handleSubmit = async (values, { setSubmitting }) => {
      try {
          const response = await axios.post("http://localhost:9000/signup", values);
          console.log("Response from server", response.data);
          setSuccess(true);
          setShowModal(true);
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
              email: '',
              password: '',
              setMatchingPassword: '',
              role: 'USER'
             }}
             validationSchema={signUpSchema}
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