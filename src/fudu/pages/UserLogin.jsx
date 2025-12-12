import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import BackButton from "../components/BackButton";


const UserLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userToken", data.token);
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/"), 700);
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
        <BackButton />
        <div className="auth-title">
          <h2>Welcome Back</h2>
          <p>Login to continue</p>
        </div>
        
        <form onSubmit={handleLogin}>
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
            Login
          </button>

          <p className="authMsg">{message}</p>

          <p className="switch-text">
            New user?
            <span className="switch-link" onClick={() => navigate("/register")}>
              {" "}Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
