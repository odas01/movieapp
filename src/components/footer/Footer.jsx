import { Link } from 'react-router-dom';

import './Footer.scss';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/logo.png';

function Footer() {
    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer__content container">
                <div className="footer__content-logo logo">
                    <img src={logo} alt="" />
                    <Link to="/">tvMovies</Link>
                </div>

                <div className="footer__content-menus">
                    <div className="footer__content-menu">
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of services</Link>
                        <Link to="/">About us </Link>
                    </div>
                    <div className="footer__content-menu">
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy </Link>
                    </div>
                    <div className="footer__content-menu">
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
