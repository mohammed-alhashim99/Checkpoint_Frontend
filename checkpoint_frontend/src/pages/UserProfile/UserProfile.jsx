import { useEffect, useState } from "react";
import sendRequest from "../../utilities/sendRequest";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await sendRequest("/users/profile/");
        setUserData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="game-card">
      <h1>{userData.username}</h1>
      <strong>
      <p>Email: {userData.email}</p>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
      <p>Member since: {userData.date_joined}</p>
      </strong>
    </div>
  );
}
