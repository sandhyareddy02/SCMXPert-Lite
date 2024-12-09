
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/DeviceData.css'; // Import the CSS
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
import logo from "../assets/logo.png"; // Update the logo path if needed

const DeviceDataStream = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("deviceData");
  const [deviceId, setDeviceId] = useState("");
  const [data, setData] = useState([]);

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
      case "deviceData":
        navigate("/devicedata");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken"); // Clear token
    navigate("/"); // Redirect to login
  };

  // const handleDeviceData = async () => {
  //   try {
  //     const token = localStorage.getItem("authToken");
  
  //     const response = await fetch("http://localhost:8000/devicedata", {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Send the token in the header
  //       },
  //     });
  //     console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',response)
  //     if (!response.ok) {
  //       const error = await response.json();
  //       alert(`Error: ${error.detail}`);
  //       return;
  //     }
  
  //     const fetchedData = await response.json();
  //     setData(fetchedData);
  //   } catch (error) {
  //     console.error("Error fetching device data:", error);
  //     alert("Failed to fetch device data. Please try again later.");
  //   }
  // };


  const handleDeviceData = async () => {
    try {
        const token = localStorage.getItem("authToken");

        const response = await fetch("http://localhost:8000/devicedata", {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the header
            },
        });

        if (!response.ok) {
            const error = await response.json();
            if (response.status === 403) {
                alert("Access Denied: You do not have permission to view this data.");
            } else {
                alert(`Error: ${error.detail}`);
            }
            return;
        }

        const fetchedData = await response.json();
        setData(fetchedData);
    } catch (error) {
        console.error("Error fetching device data:", error);
        alert("Failed to fetch device data. Please try again later.");
    }
};

  

  return (
    <div className="device-data-container">
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
              <li
                className={`menu-item2 ${activeMenu === "deviceData" ? "active" : ""}`}
                onClick={() => handleMenuClick("deviceData")}
              >
                <FontAwesomeIcon icon={faServer} className="menu-icon2" />
                <span className="menu-text2">Device Data</span>
              </li>
            </ul>
            <button className="back-button" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faArrowRotateLeft} className="menu-icon3" />
              <span className="menu-text2">Back</span>
            </button>
          </nav>
          <button className="sidebar-logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} className="button-icon" />
            <span className="button-text">Logout</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="create-shipment-header">
        <div className="menu-icon-cs" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="create-shipment-headings">
          <h1>Device Data Stream</h1>
          {/* <p>Please select a Device ID to view the data stream</p> */}
        </div>
      </div>

      {/* Device Data Stream Form */}
      <div className="device-data-input-container">
        <h4 className="dd-h4">Please select a Device ID to see the Data Stream</h4>
        <label htmlFor="deviceId" className="device-data-label">
          Device ID*
        </label>
        <br />
        <input
          type="text"
          id="deviceId"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          className="device-data-input"
        />
        <button onClick={handleDeviceData} className="get-dd-btn">
          Get Device Data
        </button>
      </div>

      {/* Device Data Table */}
      <table className="data-table-dd">
        <thead>
          <tr className="table-header-dd">
            <th>Device ID</th>
            <th>Battery Level</th>
            <th>Sensor Temperature</th>
            <th>Route From</th>
            <th>Route To</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="table-row-dd">
                <td>{row.deviceId}</td>
                <td>{row.batteryLevel}</td>
                <td>{row.sensorTemperature}</td>
                <td>{row.routeFrom}</td>
                <td>{row.routeTo}</td>
                <td>{row.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data-dd">
                No data available. Please select a Device ID and click "Get Device Data".
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceDataStream;
