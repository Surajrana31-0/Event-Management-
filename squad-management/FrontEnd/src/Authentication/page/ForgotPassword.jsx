import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import EmptyHeader from "./EmptyHeader";
import Footer from "../../public/page/Footer";
import "../style/Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const [serverMessage, setServerMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setServerMessage("");
    setErrorMessage("");
    try {
      const res = await fetch(`${API_URL}/users/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Reset failed");
      }

      setServerMessage("Password has been reset. You can now log in.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setErrorMessage(err.message);
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
            <h2>Reset Password</h2>

            {/* Messages */}
            {serverMessage && <div className="form-success">{serverMessage}</div>}
            {errorMessage && <div className="form-error server-error">{errorMessage}</div>}

            {/* Password input */}
            <div className="form-group modern-input">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                autoComplete="new-password"
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            {/* Submit button */}
            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>

            {/* Back to login */}
            <div className="register-link">
              Remembered your password? <Link to="/login">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
