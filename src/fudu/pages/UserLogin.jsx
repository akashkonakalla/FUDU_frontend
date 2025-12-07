import React, { useState, useContext } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const UserLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ⭐ Access updateCartCount from context
  const { updateCartCount } = useContext(CartContext);

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
        // Save token
        localStorage.setItem("userToken", data.token);
        setMessage("✅ Login successful!");

        // 🔥 Update global cart count instantly
        updateCartCount();

        setTimeout(() => navigate("/"), 800);
      } else {
        setMessage(`❌ ${data.error || "Login failed"}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="authContainer">
      <h2>User Login</h2>

      <form onSubmit={handleLogin} className="authForm">
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

        <button className="authButton" type="submit">
          Login
        </button>
      </form>

      <p className="authMsg">{message}</p>

      <p style={{ marginTop: "10px" }}>
        New user?{" "}
        <span
          style={{ color: "#4fa94d", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default UserLogin;
