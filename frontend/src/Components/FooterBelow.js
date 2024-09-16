import './footerbelow.css';
import FooterBelowCopyRight from './FooterBelowCopyRight';
import FooterBelowLinks from './FooterBelowLinks'
export default function FooterBelow(){
    return(
        <div className="footer-below">
          <FooterBelowCopyRight/>
          <FooterBelowLinks/>
        </div>
    );
}