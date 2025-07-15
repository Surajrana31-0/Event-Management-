import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate, Link } from "react-router-dom";
import Header from "../public/Header";
import Footer from "../public/Footer";
import "./Login.css";
import EmptyHeader from "./EmptyHeader";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
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
    if (!form.email || !form.password) return 'All fields are required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Invalid email format.';
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
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      // Dynamically import jwt-decode for compatibility
      const { default: jwt_decode } = await import('jwt-decode');
      const user = jwt_decode(res.data.token);
      setSuccess(`Welcome back, ${user.name}!`);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      console.log('Login error:', err);
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EmptyHeader />
      <div className="login-container">
        {/* Left & center: image */}
        <div className="login-image-side">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
            alt="Event"
          />
        </div>
        {/* Right: form and text */}
        <div className="login-form-side">
          <div className="login-top-text">
           SQUAD EVENT
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {/* Show error only once here */}
            {error && <div className="form-error" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
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
            <div className="form-group modern-input">
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
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
            </div>
            {/* Submit button */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="register-link">
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </div>
            {success && <div className="success">{success}</div>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;