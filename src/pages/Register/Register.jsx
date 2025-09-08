import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import "../Login/login.scss";

function Register() {
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
      const { token } = await register(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("auth", "true");
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
        <h2 className="title">Register</h2>
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;
