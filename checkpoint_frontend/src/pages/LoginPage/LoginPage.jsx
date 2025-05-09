import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as usersAPI from "../../utilities/users-api";

export default function LoginPage({ setUser }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await usersAPI.login(formData);
      if (!user) {
        setError("❌ Login failed. Please check your credentials.");
        return;
      }
      setUser(user);
      navigate("/mygames");
    } catch (err) {
      console.error("Login error:", err);
      setError("❌ Something went wrong.");
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form-box">
        <h2>Log In</h2>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>

        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}
