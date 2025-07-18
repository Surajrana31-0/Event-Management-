import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../public/page/Footer";
import "../style/Register.css";
import EmptyHeader from "./EmptyHeader";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const res = await fetch(`${API_URL}/users/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: data.password,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Reset failed");

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
          <div className="register-image-side">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
              alt="Reset Password"
            />
          </div>
          <div className="register-form-side">
            <div className="register-top-text">Reset your password</div>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Reset Password</h2>

              {serverError && (
                <div className="form-error server-error">{serverError}</div>
              )}

              <div className="form-group modern-input">
                <label htmlFor="password">New Password</label>
                <div className="input-with-icon">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    autoComplete="new-password"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="icon-eye"
                    role="button"
                    tabIndex={0}
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </span>
                </div>
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              <div className="form-group modern-input">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <div className="input-with-icon">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    autoComplete="new-password"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="icon-eye"
                    role="button"
                    tabIndex={0}
                  >
                    {showConfirmPassword ? (
                      <MdVisibilityOff />
                    ) : (
                      <MdVisibility />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <span className="form-error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <button type="submit" className="register-btn" disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
