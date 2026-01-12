import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import "./Navbar.css";

const Navbar = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  //  Track Firebase login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  //  Search and auto-redirect to Home when typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);

      // If the user is NOT on the homepage, redirect there
      if (inputValue.trim() && location.pathname !== "/") {
        navigate("/");
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleLogoClick = () => {
    setInputValue("");
    setSearch("");
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
      alert("You have been logged out.");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="nav">
      <div className="right">
        <h1 onClick={handleLogoClick} className="logo">MOVIE</h1>
      </div>

      <div className="center">
        <input
          type="text"
          placeholder="Search here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="auth-buttons">
        {user ? (
          <>
            <span className="welcome">
              Hi, {user.displayName || user.email.split("@")[0]} 👋
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>

          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
