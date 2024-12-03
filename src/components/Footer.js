import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';
import { Link } from "react-scroll";

const Footer = () => {
    return (
        <div className="footer">
            <hr />
            <div className="footer-links">
                <ul>
                <li>
                        <Link to="top" smooth={true} duration={500}>
                            Home
                        </Link> 
                    </li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#faqs">FAQs</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </div>
            <div className="footer-container">
                {/* Social Media Icons */}
                <div className="footer-social">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                </div>
                <div className="footer-copyright">
                    <p>© 2021 Company, Inc</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;