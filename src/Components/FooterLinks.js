import './footerlinks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

export default function FooterLinks(){
    return(
        <div className="footer-links">
            <div className="footer-cinema">
                <div className="logo">CINEMA</div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae placerat sem. Morbi gravida arcu interdum eros sagittis fermentum. Aenean vitae fringilla eros, nec tristique erat</p>
            </div>
            <div className="useful-links">
                <h4>Useful Links</h4>
                <a href="#">Home</a>
                <a href="#">Movies</a>
                <a href="#">My List</a>

                
            </div>
            <div className="contact-us">
            <h4>Contact Us</h4>
            <p>Street Name</p>
            <p><strong>Phone: </strong></p>
            <p><strong>Address: </strong></p>    
            </div> 
            <div className='social-media'>
                <h4>Follow us on:</h4>
                <a><FontAwesomeIcon icon={faFacebook} className='social-media-icon'/></a>
                <a><FontAwesomeIcon icon={faInstagram} className='social-media-icon'/></a>
                <a><FontAwesomeIcon icon={faTwitter} className='social-media-icon'/></a>
            </div>
        </div>
    );
}