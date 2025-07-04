import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as usersAPI from '../../utilities/users-api';

export default function SignupPage({ setUser }) {
  const navigate = useNavigate();
  const initialState = { username: "", password: "", confirmPassword: "", email: "", firstName: "", lastName: "" };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({ username: '', password: '', email: '', confirmPassword: '' });

  const disabledSubmitBtn =
    Object.values(errors).every(val => val === "") &&
    Object.values(formData).every(val => val !== "");

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    checkErrors(evt);
  }

  function checkErrors({ target }) {
    const updateErrors = { ...errors };

    if (target.name === 'username') {
      updateErrors.username = target.value.length < 3 ? 'Your username must be at least three characters long.' : "";
    }
    if (target.name === 'password') {
      updateErrors.password = target.value.length < 3 ? "Your password must be at least three characters long." : "";
    }
    if (target.name === 'confirmPassword') {
      updateErrors.confirmPassword = target.value !== formData.password ? "Your passwords must match." : "";
    }
    if (target.name === 'email') {
      updateErrors.email = !target.value.includes("@") ? "Email must include '@'." : "";
    }

    setErrors(updateErrors);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const newUser = await usersAPI.signup(formData);
      if (!newUser) {
        alert("Signup failed. Please check your information.");
        return;
      }

      // تخزين الإيميل مؤقتًا وتمريره للصفحة التالية
      localStorage.setItem("email_for_verification", formData.email);
      navigate("/verify-otp", { state: { email: formData.email } });

      setFormData(initialState);
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong during signup.");
    }
  }

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form-box">
        <h2>Sign Up</h2>

        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          {errors.username && <p className="error-msg">{errors.username}</p>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" disabled={!disabledSubmitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
}
