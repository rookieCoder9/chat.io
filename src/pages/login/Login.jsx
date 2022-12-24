import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./login.css";
export const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setError("");
    
      navigate("/");
    } catch (e) {
      setError(e);
    }
  };
  return (
    <div className="login">
      <div className="container">
        <h1>Chat.io</h1>
        <form onSubmit={handlesubmit}>
          <input type="text" required placeholder="Email" />

          <input type="password" required placeholder="Password" />

          <button>Login</button>
          {error && (
            <span style={{ fontSize: "12px", padding: "1rem 2rem" }}>
              {error.toString()}
            </span>
          )}
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
