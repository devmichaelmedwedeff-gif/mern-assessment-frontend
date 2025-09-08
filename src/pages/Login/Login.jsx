import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import "./login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await login(email, password);
      setError("");
      navigate("/list");
    } catch (err) {
      localStorage.setItem("auth", "false");
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="card">
        <h2 className="title">Login</h2>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Sign In
        </button>
      </form>
      {/* <a href="/register" className="btn">
        Register
      </a> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
