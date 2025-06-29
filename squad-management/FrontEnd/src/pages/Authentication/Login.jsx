import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Header from "../public/Header";
import Footer from "../public/Footer";
import "./Login.css";
import EmptyHeader from "./EmptyHeader";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Handle login logic here
    console.log("Login data:", data);
    navigate("/");
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
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
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
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                autoComplete="current-password"
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>
            {/* Submit button */}
            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            <div className="register-link">
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;