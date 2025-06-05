import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { handleSignup } from '../scripts/signup';
import '../styles/signup.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    terms: false
  });

  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePassword = (setter) => {
    setter(prev => (prev === 'password' ? 'text' : 'password'));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.address) {
      return 'All fields are required.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      return 'Invalid email address.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setShowErrorPopup(true);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await handleSignup(formData);
      navigate('/login');
      // Handle successful signup - optionally add success popup or redirect here
    } catch (err) {
      setError('Signup failed. Please try again.');
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="signup-form" aria-live="polite">
          <h1>SQUAD Event</h1>
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            {/* The error popup */}
            {showErrorPopup && (
              <div className="popup-overlay" role="alertdialog" aria-modal="true" aria-labelledby="popup-title" aria-describedby="popup-desc">
                <div className="popup-box">
                  <h3 id="popup-title">Error</h3>
                  <p id="popup-desc">{error}</p>
                  <button onClick={() => setShowErrorPopup(false)} aria-label="Close error message popup" className="popup-close-btn">Close</button>
                </div>
              </div>
            )}
            <div className="form-row">
              <input 
                type="text" 
                name="firstName"
                placeholder="First Name" 
                required 
                value={formData.firstName}
                onChange={handleChange}
              />
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name" 
                required 
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <input 
              type="text" 
              name="username"
              placeholder="Username" 
              required 
              value={formData.username}
              onChange={handleChange}
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
            <div className="password-field">
              <input 
                type={passwordType}
                name="password"
                placeholder="Create Password" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
              <span onClick={() => togglePassword(setPasswordType)} tabIndex={0} role="button" aria-label="Toggle password visibility" onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') togglePassword(setPasswordType); }}>
                <i className={`fa fa-eye${passwordType === 'text' ? '-slash' : ''}`}></i>
              </span>
            </div>
            <div className="password-field">
              <input 
                type={confirmPasswordType}
                name="confirmPassword"
                placeholder="Confirm Password" 
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span onClick={() => togglePassword(setConfirmPasswordType)} tabIndex={0} role="button" aria-label="Toggle confirm password visibility" onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') togglePassword(setConfirmPasswordType); }}>
                <i className={`fa fa-eye${confirmPasswordType === 'text' ? '-slash' : ''}`}></i>
              </span>
            </div>
            <input 
              type="text" 
              name="phone"
              placeholder="Phone Number" 
              required 
              value={formData.phone}
              onChange={handleChange}
            />
            <input 
              type="text" 
              name="address"
              placeholder="Address" 
              required 
              value={formData.address}
              onChange={handleChange}
            />
            <div className="form-row terms-row">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms"
                required 
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">I accept the <Link to="/terms" target="_blank">Terms & Conditions</Link></label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <div className="login-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
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
            <p>9841258444</p>
            <p>4448521489</p>
            <p>Press</p>
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
            <input type="email" placeholder="Enter your mail id here..." />
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
        <p className="footer-bottom">© SQUAD Event PVT. LTD. ALL RIGHTS RESERVED.</p>
      </footer>
    </>
  );
}

export default Signup;

