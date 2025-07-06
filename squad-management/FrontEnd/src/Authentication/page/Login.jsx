import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import EmptyHeader from "./EmptyHeader";
import Footer from "../../public/page/Footer";
import "../style/Login.css";

// ✅ Use environment variable from Vite
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError(""); // Reset error
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.error || "Login failed");
      }

      // Store token and user info
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      // Navigate to home or dashboard
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <>
      <EmptyHeader />
      <div className="login-container">
        {/* Left image side */}
        <div className="login-image-side">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
            alt="Event"
          />
        </div>

        {/* Right form side */}
        <div className="login-form-side">
          <div className="login-top-text">SQUAD EVENT</div>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>

            {/* Server error display */}
            {serverError && <div className="form-error server-error">{serverError}</div>}

            {/* Email */}
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

            {/* Password */}
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

            {/* Register link */}
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
