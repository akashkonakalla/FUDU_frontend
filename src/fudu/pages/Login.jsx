import React, { useState } from "react";
import { API_URL } from "../api";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("token", result.token);
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } else {
      setMessage("❌ " + result.error);
    }
  };

  return (
    <div className="authContainer">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="authButton" type="submit">Login</button>
      </form>

      <p className="authMsg">{message}</p>
    </div>
  );
};

export default Login;
