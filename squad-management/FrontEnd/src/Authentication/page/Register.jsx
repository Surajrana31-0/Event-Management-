import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../public/page/Footer";
import "../style/Register.css";
import EmptyHeader from "./EmptyHeader";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// Use Vite env variable for API base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Watch password field for confirm password validation
  const password = watch("password", "");

  const onSubmit = async (data) => {
    setServerError("");
    try {
      // Send registration data to backend
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // On success, redirect to login page
      navigate("/login");
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <>
      <EmptyHeader />
      <div className="body-container">
        <div className="register-container">
          {/* Left image */}
          <div className="register-image-side">
            <img
              src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80"
              alt="Register Event"
            />
          </div>

          {/* Right form */}
          <div className="register-form-side">
            <div className="register-top-text">
              Create your account to join Squad Event!
            </div>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Register</h2>

              {/* Server error */}
              {serverError && <div className="form-error server-error">{serverError}</div>}

              {/* Full Name */}
              <div className="form-group modern-input">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name", { required: "Name is required" })}
                  autoComplete="name"
                />
                {errors.name && <span className="form-error">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="form-group modern-input">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format"
                    }
                  })}
                  autoComplete="username"
                />
                {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>

              {/* Password */}
              <div className="form-group modern-input">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...register("password", { 
                      required: "Password is required", 
                      minLength: { value: 6, message: "Password must be at least 6 characters" } 
                    })}
                    autoComplete="new-password"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="icon-eye"
                    tabIndex={0}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    role="button"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </span>
                </div>
                {errors.password && <span className="form-error">{errors.password.message}</span>}
              </div>

              {/* Confirm Password */}
              <div className="form-group modern-input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-with-icon">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: value =>
                        value === password || "Passwords do not match"
                    })}
                    autoComplete="new-password"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="icon-eye"
                    tabIndex={0}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    role="button"
                  >
                    {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </span>
                </div>
                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword.message}</span>}
              </div>

              {/* Submit button */}
              <button type="submit" className="register-btn" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>

              {/* Login link */}
              <div className="login-link">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
