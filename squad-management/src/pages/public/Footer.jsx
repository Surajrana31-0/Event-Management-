import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-col about">
      <h3>About Us</h3><br/>
      <ul className="footer-about-links">
        <li><a href="/mission">Our Mission</a></li>
        <li><a href="/vision">Our Vision</a></li>
        <li><a href="/features">Features</a></li>
      </ul>
    </div>
    <div className="footer-col contact">
      <h3>Contact Us</h3><br/>
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
    <div className="footer-col support">
      <h3>Help & Support</h3><br/>
      <ul>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
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
      <div className="footer-socials">
        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">🌐</a>
        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">📸</a>
      </div>
    </div>
  </footer>
);

export default Footer;