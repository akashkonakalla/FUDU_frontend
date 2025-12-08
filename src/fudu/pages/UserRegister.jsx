import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const UserRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Registered Successfully!");
        setTimeout(() => navigate("/login"), 900);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch {
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">
          <h2>Create Account</h2>
          <p>Join FUDU today</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <div className="input-box">
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <label>Name</label>
            </div>
          </div>

          <div className="form-group">
            <div className="input-box">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label>Email</label>
            </div>
          </div>

          <div className="form-group">
            <div className="input-box">
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <label>Password</label>
            </div>
          </div>

          <button className="auth-btn" type="submit">
            Register
          </button>

          <p className="authMsg">{message}</p>

          <p className="switch-text">
            Already have an account?
            <span className="switch-link" onClick={() => navigate("/login")}>
              {" "}Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
