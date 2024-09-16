import SignInUpWrapper from "./SignInUpWrapper";
import './signinup.css';
export default function SignIn({onCloseClick}){
    return(
        <div className="sign-in-up">
           <SignInUpWrapper onCloseClick={onCloseClick}/>
        </div>
    );
}