import React, { useState, useEffect } from "react";
import "../comp_css/Login.css";
import { useNavigate, Link } from "react-router-dom";
import api from '../Router/api';

const formData = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(formData);

  useEffect(() => {
    document.title = 'Ecommerse | LogIn';
    return () => {
      document.title = 'Ecommerse App';
    };
  }, []);

  const setHandlerChange = (e) => {
    const val = e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const authHeader = `Basic ${btoa(`${form.username}:${form.password}`)}`;
      const response = await api.get("/ecom/signIn", {
        headers: {
          Authorization: authHeader,
        },
      });
      if (response.headers.authorization != undefined) {
        localStorage.setItem("jwtToken", response.headers.authorization);
        localStorage.setItem("name", response.data.firstNAme || "LogIn");
        localStorage.setItem("userid", response.data.id);
        alert("Login successfully");
        navigate("/");
      } else {
        alert("Invalid Credential");
        console.error("JWT retrieval failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("Error during login. Please try again later.");
        console.error("Error during login:", error);
      }
    }
  };

  const { username, password } = form;

  return (
    <div className="login-container">
      <button
        className="home-button"
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "#ff6b6b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "600",
          transition: "background 0.3s ease"
        }}
      >
        Home
      </button>
      <div className="login-content">
        <div className="login-image">
          <img
            src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            alt="Ice Cream Delight"
          />
        </div>
        <div className="login-form-container">
          <div className="login-form">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your sweet journey</p>

            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="username">Email Address</label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  value={username}
                  onChange={setHandlerChange}
                  placeholder="Enter your registered email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={setHandlerChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>

            <div className="login-footer">
              <p>Don't have an account?</p>
              <Link to="/register-user" className="signup-link">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
