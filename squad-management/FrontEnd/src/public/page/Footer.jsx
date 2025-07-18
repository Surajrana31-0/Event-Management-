import React from "react";
import { Link } from "react-router-dom";
import "../style/Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-col about">
      <h3>About Us</h3><br />
      <ul className="footer-about-links">
        <li><Link to="/mission">Our Mission</Link></li>
        <li><Link to="/features">Features</Link></li>
      </ul>
    </div>

    <div className="footer-col contact">
      <h3>Contact Us</h3><br />
      <ul className="footer-contact-list">
        <li>
          <span>Email:</span> <a href="mailto:info@squadevent.com">info@squadevent.com</a>
        </li>
        <li>
          <span>Phone:</span> <a href="tel:+1234567890">9841258444</a>
        </li>
        <li>
          <span>Address:</span> Dillibazar, Kathmandu
        </li>
      </ul>
    </div>


    <div className="footer-col newsletter">
      <h3>Newsletter</h3>
      <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
        <input
          type="email"
          placeholder="Your email"
          className="newsletter-input"
        />
        <button type="submit" className="newsletter-btn">Subscribe</button>
      </form>
      
    </div>
  </footer>
);

export default Footer;
