import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Header from "../public/Header";
import Footer from "../public/Footer";
import "./Register.css";
import EmptyHeader from "./EmptyHeader";

const Register = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Handle registration logic here
    console.log("Register data:", data);
    navigate("/login");
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
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>
            {/* Name input field */}
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
            {/* Email input field */}
            <div className="form-group modern-input">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                autoComplete="username"
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>
            {/* Password input field */}
            <div className="form-group modern-input">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                autoComplete="new-password"
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>
            {/* Confirm Password input field */}
            <div className="form-group modern-input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value, { password }) =>
                    value === password || "Passwords do not match"
                })}
                autoComplete="new-password"
              />
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword.message}</span>}
            </div>
            {/* Submit button */}
            <button type="submit" className="register-btn" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
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