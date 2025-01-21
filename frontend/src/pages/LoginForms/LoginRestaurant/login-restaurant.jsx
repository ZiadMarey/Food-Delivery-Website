import './login-restaurant.css';
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainHeaderPlain from '../../../Componenets/New_Header_Plain/new-header-plain';

const LoginRestaurant = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!username || !password) {
      setError("Both fields are required!");
      return;
    }

    setIsLoading(true); // Show loader while processing the login request

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        console.log(data.token);

        // Save the token to localStorage
        localStorage.setItem("token", data.token);

        // Redirect to the profile page
        navigate("/restprofile");
      } else {
        setError(data.message || "Invalid credentials. Please try again!");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false); // Hide loader after the request
    }
  };

  return (
    <>
      <MainHeaderPlain />
      <div className="body1">
        
        <div className="bgimage-1"></div>
          <div className="wrapper-r">
          <div className="login-box-r">Login as a Business</div>
            <form onSubmit={handleLogin}>
            <div className="input-box-r">
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label >Email</label>
            </div>
            <div className="input-box-r">
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>
            <button
              type="submit"
              className="signin-button-r"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <div className="signup-text-r">
            Don't have an account? <Link to="/signupcus">Sign Up</Link>
            </div>
          </form>

        </div>
        
      </div>
    </>
  );
};

export default LoginRestaurant;