import React from "react";
import { Link, useNavigate } from "react-router-dom";
import collegeLogo from "../assets/college_logo.jpg";
import avatar from "../assets/AvatarImage.jpeg";

const Header = ({ isLoggedIn, removeCookie }) => {
  const navigate = useNavigate();
  const buttonStyle = {
    margin: "0 10px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };
  const handleLogout = () => {
    removeCookie("jwtToken");
    navigate("/home/login");
  };
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#f1f1f1",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={collegeLogo}
          alt="College Logo"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <h1 style={{ fontFamily: "Arial, sans-serif", fontSize: "24px" }}>
          ABC University College
        </h1>{" "}
      </div>
      <nav>
        {!isLoggedIn ? (
          <>
            <Link to="/home/login">
              <button style={buttonStyle}>Login</button>
            </Link>
            <Link to="/home/signup">
              <button style={buttonStyle}>Sign Up</button>
            </Link>
            <Link to="/home/FAQ">
              <button style={buttonStyle}>FAQ</button>
            </Link>
            <Link to="/home/contact">
              <button style={buttonStyle}>Contact</button>
            </Link>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={avatar}
              alt="User Avatar"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <div>
              <button style={buttonStyle} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
