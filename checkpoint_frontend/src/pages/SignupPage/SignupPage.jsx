import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router";


export default function SignupPage({ setUser }) {
    const navigate = useNavigate();
    const initialState = { username: "", password: "", confirmPassword: "", email: "" }
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({ username: '', password: '', email: '', confirmPassword: '' });
    let disabledSubmitBtn = Object.values(errors).every(val => val === "") && Object.values(formData).every(val => val !== "") ? false : true

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        checkErrors(evt);
    }

    function checkErrors({ target }) {
        const updateErrors = { ...errors }

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
            updateErrors.email = !target.value.includes("@") ? "Your password must be a real email / include the '@' symbol." : "";
        }

        setErrors(updateErrors);
    };

    async function handleSubmit(evt) {
      evt.preventDefault();
      console.log("Submitting signup form:", formData);
      try {
        const newUser = await usersAPI.signup(formData);
        console.log("Signup response:", newUser);
        if (!newUser) {
          alert("Signup failed. Please check your information.");
          return;
        }
        setUser(newUser);
        setFormData(initialState);
        navigate("/finches");
      } catch (err) {
        console.error("Signup error:", err);
        alert("Something went wrong during signup.");
        setUser(null);
      }
    }
    

    return (
        <>
          <div className="page-header">
            <h1>Sign Up</h1>
          </div>
      
          <form onSubmit={handleSubmit} className="form-container signup">
      
            <div className="form-group">
              <input
                type="text"
                id="id_username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                minLength="3"
                maxLength="150"
                placeholder=" "
                required
              />
              <label htmlFor="id_username">Username</label>
              {errors.username && <p className="error-msg">{errors.username}</p>}
            </div>
      
            <div className="form-group">
              <input
                type="email"
                id="id_email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="id_email">Email</label>
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>
      
            <div className="form-group">
              <input
                type="password"
                id="id_password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="3"
                placeholder=" "
                required
              />
              <label htmlFor="id_password">Password</label>
              {errors.password && <p className="error-msg">{errors.password}</p>}
            </div>
      
            <div className="form-group">
              <input
                type="password"
                id="id_confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="id_confirmPassword">Confirm Password</label>
              {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
            </div>
      
            <button type="submit" disabled={disabledSubmitBtn} className="form-btn">
              Submit!
            </button>
          </form>
        </>
      );
      
}