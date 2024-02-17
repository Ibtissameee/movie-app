import FooterLinks from "./FooterLinks";
import FooterBelow from "./FooterBelow";
import './footercontent.css';
export default function FooterContent(){
    return(
        <div className="footer-content">
            <FooterLinks/>
            <hr></hr>
            <FooterBelow/>
        </div>
    );
}