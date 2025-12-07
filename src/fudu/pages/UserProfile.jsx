import React, { useEffect, useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setMessage("❌ Please login to view profile");
      return navigate("/login");
    }

    try {
      const res = await fetch(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProfile(data.profile);
      } else {
        setMessage(data.error || "Failed to load profile");
        if (res.status === 401) {
          localStorage.removeItem("userToken");
          navigate("/login");
        }
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  if (!profile && !message) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading profile…</p>;
  }

  return (
    <div className="profileContainer">
      <h2>User Profile</h2>

      {message && <p className="authMsg">{message}</p>}

      {profile && (
        <div className="profileCard">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone || "Not set"}</p>
          <p><strong>Address:</strong> {profile.address || "Not set"}</p>

          <div className="profileActions">
            <button onClick={() => navigate("/profile/edit")}>
              Edit Profile
            </button>
            <button onClick={handleLogout} style={{ background: "#d9534f" }}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
