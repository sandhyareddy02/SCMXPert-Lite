import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyAccount.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faUser,
  faFileInvoice,
  faTruckFast,
  faServer,
  faArrowRotateLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { jwtDecode } from "jwt-decode";

const Account = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("myAccount");
  const [userDetails, setUserDetails] = useState({ email: "", role: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No token found. Redirecting to login.");
      navigate("/");
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          console.log("Token expired. Redirecting to login.");
          localStorage.removeItem("authToken");
          navigate("/");
        } else {
          setUserDetails({
            userName: decodedToken.name || "User",
            email: decodedToken.email || "Unknown",
            role: decodedToken.role || "User",
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
        navigate("/");
      }
    }
  }, [navigate]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setIsMenuOpen(false);
    switch (menu) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "myAccount":
        navigate("/myaccount");
        break;
      case "myShipment":
        navigate("/myshipment");
        break;
      case "newShipment":
        navigate("/newshipment");
        break;
      case 'usersInfo':
        navigate('/usersinfo');
        break;
      case "deviceData":
        if (userDetails.role === "admin") {
          navigate("/devicedata");
        } else {
          setDialogMessage("Access Denied: Only admins can view this page.");
          setDialogOpen(true);
        }
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="account-container">
      {/* Hamburger Menu */}
      <div>
        <div
          className="menu-icon-acc"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div className="sidebar-menu">
          <div className="logo2">
            <img src={logo} alt="My Logo" className="logo-image2" />
            <h2>Exafluence</h2>
          </div>
          <nav className="menu2">
            <ul>
              <li
                className={`menu-item2 ${activeMenu === "dashboard" ? "active" : ""}`}
                onClick={() => handleMenuClick("dashboard")}
              >
                <FontAwesomeIcon icon={faLayerGroup} className="menu-icon2" />
                <span className="menu-text2">Dashboard</span>
              </li>
              <li
                className={`menu-item2 ${activeMenu === "myAccount" ? "active" : ""}`}
                onClick={() => handleMenuClick("myAccount")}
              >
                <FontAwesomeIcon icon={faUser} className="menu-icon2" />
                <span className="menu-text2">My Account</span>
              </li>
              <li
                className={`menu-item2 ${activeMenu === "myShipment" ? "active" : ""}`}
                onClick={() => handleMenuClick("myShipment")}
              >
                <FontAwesomeIcon icon={faFileInvoice} className="menu-icon2" />
                <span className="menu-text2">My Shipment</span>
              </li>
              <li
                className={`menu-item2 ${activeMenu === "newShipment" ? "active" : ""}`}
                onClick={() => handleMenuClick("newShipment")}
              >
                <FontAwesomeIcon icon={faTruckFast} className="menu-icon2" />
                <span className="menu-text2">New Shipment</span>
              </li>
              {userDetails.role === 'admin' && (
                <li
                  className={`menu-item2 ${activeMenu === 'usersInfo' ? 'active' : ''}`}
                  onClick={() => handleMenuClick('usersInfo')}
                >
                  <FontAwesomeIcon icon={faUser} className="menu-icon2" />
                  <span className="menu-text2">Users Info</span>
                </li>
              )}
              {userDetails.role === "admin" && (
                <li
                  className={`menu-item2 ${activeMenu === "deviceData" ? "active" : ""}`}
                  onClick={() => handleMenuClick("deviceData")}
                >
                  <FontAwesomeIcon icon={faServer} className="menu-icon2" />
                  <span className="menu-text2">Device Data</span>
                </li>
              )}
            </ul>
            <button
              className="back-button"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faArrowRotateLeft} className="menu-icon3" />
              <span className="menu-text2">Back</span>
            </button>
          </nav>
          <button className="sidebar-logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} className="button-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Account Section */}
      <div className="account-section">
        <h2>My Account Details</h2>
        <p>
          <strong>Username:</strong> {userDetails.userName}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
        <p>
          <strong>Role:</strong> {userDetails.role}
        </p>
        <button className="acc-close" onClick={handleClose}>Close</button>
      </div>

      {/* Dialog Box */}
      {dialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>{dialogMessage}</p>
            <button onClick={() => setDialogOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
