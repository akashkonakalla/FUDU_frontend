import React, { useEffect, useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

const UserEditProfile = () => {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // -------------------
  // LOAD USER PROFILE
  // -------------------
  const loadProfile = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return navigate("/login");

    try {
      const res = await fetch(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setForm({
          name: data.profile?.name || "",
          phone: data.profile?.phone || "",
          address: data.profile?.address || "",
        });
      } else {
        setMessage(data.error || "Failed to load profile");
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // -------------------
  // UPDATE USER PROFILE
  // -------------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("userToken");
    if (!token) return navigate("/login");

    try {
      const res = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Profile updated!");
        setTimeout(() => navigate("/profile"), 800);
      } else {
        setMessage(data.error || "Update failed");
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="authContainer">
      <h2>Edit Profile</h2>

      <form onSubmit={handleUpdate} className="authForm">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <textarea
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          rows={3}
        />

        <button className="authButton" type="submit">
          Save Changes
        </button>
      </form>

      <p className="authMsg">{message}</p>
    </div>
  );
};

export default UserEditProfile;
