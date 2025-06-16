import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sendRequest from "../../utilities/sendRequest";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import "./styles.css";


export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await sendRequest("/users/profile/");
        if (data) {
          setUserData(data);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        navigate("/login");
      }
    }
    fetchProfile();
  }, [navigate]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="game-card">
      <h1>{userData.username}</h1>
      <strong>
        <p>Email: {userData.email}</p>
        <p>First Name: {userData.first_name}</p>
        <p>Last Name: {userData.last_name}</p>
        <p>Member since: {new Date(userData.date_joined).toLocaleDateString()}</p>
      </strong>


      <button
        onClick={() => setShowForm(!showForm)}
        className="toggle-password-btn"
      >
        {showForm ? "❌ Hide Password Form" : "🔐 Change Password"}
      </button>



      {showForm && <ChangePasswordForm />}
    </div>
  );
}
