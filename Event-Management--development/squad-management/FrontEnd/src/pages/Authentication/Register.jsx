import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import Header from "../public/Header";
import Footer from "../public/Footer";
import "./Register.css";
import EmptyHeader from "./EmptyHeader";

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password) return 'All fields are required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Invalid email format.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      // Dynamically import jwt-decode for compatibility
      const { default: jwt_decode } = await import('jwt-decode');
      const user = jwt_decode(res.data.token);
      setSuccess(`Welcome, ${user.name}!`);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      console.log('Registration error:', err);
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <EmptyHeader />
   <div className="body-container">
      <div className="register-container">
        {/* Left & center: image */}
        <div className="register-image-side">
          <img
            src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80"
            alt="Register Event"
          />
        </div>
        {/* Right: form and text */}
        <div className="register-form-side">
          <div className="register-top-text">
            Create your account to join Squad Event!
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            {/* Show error only once here */}
            {error && <div className="form-error" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
            {/* Name input field */}
            <div className="form-group modern-input">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            {/* Email input field */}
            <div className="form-group modern-input">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            {/* Password input field */}
            <div className="form-group modern-input" style={{ position: 'relative' }}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1em',
                  color: '#888'
                }}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {/* Submit button */}
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            {success && <div className="success">{success}</div>}
            <div className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div></div>
      <Footer />
    </>
  );
};

export default Register;