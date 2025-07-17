import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Footer from "../../public/page/Footer";
import EmptyHeader from "./EmptyHeader";
import "../style/Register.css"; // reuse styles, adjust if needed

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerMessage("");
    setServerError("");
    try {
      const res = await fetch(`${API_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send reset email");
      }

      setServerMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <>
      <EmptyHeader />
      <div className="body-container">
        <div className="register-container">
          {/* Left image side */}
          <div className="register-image-side">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
              alt="Forgot Password"
            />
          </div>

          {/* Right form side */}
          <div className="register-form-side">
            <div className="register-top-text">SQUAD EVENT</div>

            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Forgot Password</h2>

              {serverMessage && (
                <div className="form-success">{serverMessage}</div>
              )}
              {serverError && (
                <div className="form-error server-error">{serverError}</div>
              )}

              <div className="form-group modern-input">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                  autoComplete="username"
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              <button type="submit" className="register-btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Reset Email"}
              </button>

              <div className="login-link">
                Remembered your password? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
