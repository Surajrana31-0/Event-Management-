import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../public/page/Footer";
import "../style/Register.css";
import EmptyHeader from "./EmptyHeader";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

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
  const [preview, setPreview] = useState(null);

  const password = watch("password", "");
  const imageFile = watch("image");

  // Preview selected image
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Registration failed");
      }

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
              src="https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Register Event"
            />
          </div>
          <div className="register-form-side">
            <div className="register-top-text">
              Create your account to join Squad Event!
            </div>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Register</h2>

              {serverError && <div className="form-error server-error">{serverError}</div>}

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

              {/* Image Upload */}
              <div className="form-group modern-input">
                <label htmlFor="image">Profile Image</label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...register("image")}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: "150px", marginTop: "10px", borderRadius: "8px" }}
                  />
                )}
              </div>

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

              <button type="submit" className="register-btn" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>

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
