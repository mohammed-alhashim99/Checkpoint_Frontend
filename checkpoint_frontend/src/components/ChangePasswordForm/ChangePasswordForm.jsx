import { useState } from "react";
import sendRequest from "../../utilities/sendRequest";
import "./styles.css";

export default function ChangePasswordForm({ onClose }) {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [strength, setStrength] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "new_password") {
      evaluateStrength(value);
    }
  };

  const evaluateStrength = (password) => {
    if (password.length < 6) setStrength("Weak");
    else if (password.match(/[A-Za-z]/) && password.match(/[0-9]/)) setStrength("Medium");
    if (password.length >= 10 && password.match(/[^A-Za-z0-9]/)) setStrength("Strong");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      await sendRequest("/users/change-password/", "POST", formData);
      setMessage("✅ Password changed successfully.");
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = Object.entries(err.response.data)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
          .join(" | ");
        setMessage(`❌ ${errors}`);
      } else {
        setMessage("❌ Failed to change password. Please try again.");
      }
    }
  };

  return (
    <div className="change-password-card">
      <h2>Change Your Password</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <input
          type={showPassword ? "text" : "password"}
          name="old_password"
          placeholder="Enter old password"
          onChange={handleChange}
          required
        />
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="new_password"
            placeholder="New password"
            onChange={handleChange}
            required
          />
        </div>
        {strength && <p className={`strength-text ${strength.toLowerCase()}`}>Strength: {strength}</p>}

        <input
          type={showPassword ? "text" : "password"}
          name="confirm_password"
          placeholder="Confirm new password"
          onChange={handleChange}
          required
        />

        <div className="button-group">
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          <button type="submit" className="submit-btn">Change Password</button>
        </div>

        {message && <p className="status-text">{message}</p>}
      </form>
    </div>
  );
}
