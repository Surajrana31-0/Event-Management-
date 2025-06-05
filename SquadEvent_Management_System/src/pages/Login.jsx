import { Link } from 'react-router-dom'
import { useState } from 'react'
import { handleLogin, handleSubscribe, showMessage } from '../scripts/login'
import '../styles/login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageBoxVisible, setMessageBoxVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password, setMessageText, setMessageBoxVisible);
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (handleSubscribe(subscribeEmail, setMessageText, setMessageBoxVisible)) {
      setSubscribeEmail('');
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-form">
          <h1>SQUAD Event</h1>
          <h2>Login</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
            <input 
              type="text" 
              id="username" 
              placeholder="Username" 
              aria-label="Username" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              id="password" 
              placeholder="Password" 
              aria-label="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="options-row">
              <div className="remember-me">
                <input type="checkbox" id="remember-me" name="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
            </div>

            <button type="submit">Login</button>
          </form>
          <p className="create-account-link">
            Don't have an account? <Link to="/signup">Create a new account</Link>
          </p>
        </div>
      </div>

      <footer>
        <div className="footer-container">
          <div className="footer-column">
            <h3>About us</h3>
            <Link to="/leadership">Leadership</Link>
            <Link to="/mission">Our Mission</Link>
            <Link to="/vision">Our Vision</Link>
            <Link to="/features">Features</Link>
            <Link to="/careers">Career At</Link>
            <Link to="/blogs">Blogs</Link>
          </div>
          <div className="footer-column">
            <h3>Contact us</h3>
            <p>Mail us at</p>
            <p><a href="mailto:squadevent@gmail.com">squadevent@gmail.com</a></p>
            <p>Contact at</p>
            <p><a href="tel:+9779841258444">9841258444</a></p>
            <p><a href="tel:+9774448521489">4448521489</a></p>
            <Link to="/press">Press</Link>
          </div>
          <div className="footer-column">
            <h3>Help & Support</h3>
            <Link to="/customer-support">Customer Support</Link>
            <Link to="/organizer-support">Organizer Support</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/conditions">Conditions of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/report-scam">Report a Scam</Link>
          </div>
          <div className="footer-column">
            <h3>For regular event updates</h3>
            <form id="subscribeForm" onSubmit={handleSubscribeSubmit}>
              <input 
                type="email" 
                id="subscribeEmail" 
                name="email" 
                placeholder="Enter your mail id here..." 
                aria-label="Email for updates" 
                required 
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
            <div className="social-icons">
              <a href="https://instagram.com/squadevent" target="_blank" rel="noopener noreferrer">
                <img src="/assets/instagram-icon.png" alt="Instagram" />
              </a>
              <a href="https://facebook.com/squadevent" target="_blank" rel="noopener noreferrer">
                <img src="/assets/facebook-icon.png" alt="Facebook" />
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <img src="/assets/whatsapp-icon.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>
        <p className="footer-bottom">© SQUAD Event PVT. LTD. All Rights Reserved.</p>
      </footer>

      {messageBoxVisible && (
        <div id="messageBox" className="message-box">
          <p id="messageText">{messageText}</p>
          <button id="closeMessageBox" onClick={() => setMessageBoxVisible(false)}>OK</button>
        </div>
      )}
    </>
  )
}

export default Login 