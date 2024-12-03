import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../styles/NewShipment.css";
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

function Newshipment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shipmentNumber: "",
    containerNumber: "",
    routeDetails: "",
    goodsType: "",
    device: "",
    expectedDeliveryDate: "",
    poNumber: "",
    deliveryNumber: "",
    ndcNumber: "",
    batchId: "",
    serialNumberOfGoods: "",
    shipmentDescription: "",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("newShipment");

  const handleMenuClick = (menu) => {
    // console.log("Menu clicked:", menu);
    setActiveMenu(menu);
    setIsMenuOpen(false); // Close the sidebar menu after navigation
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

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('newshipment')) {
        setActiveMenu('newshipment');
    }
}, []);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Submitted:", formData);
    navigate('/myshipment');
  };

  const handleClear = () => {
    setFormData({
      shipmentNumber: "",
      containerNumber: "",
      routeDetails: "",
      goodsType: "",
      device: "",
      expectedDeliveryDate: "",
      poNumber: "",
      deliveryNumber: "",
      ndcNumber: "",
      batchId: "",
      serialNumberOfGoods: "",
      shipmentDescription: "",
    });
  };

  return (
    <div className="create-shipment-container">
      <div className="create-shipment-header">
      <div
          className="menu-icon-cs"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="create-shipment-headings">
        <h1>Create New Shipment</h1>
        <p>Please fill all the details</p>
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
                className={`menu-item2 ${
                  activeMenu === "dashboard" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("dashboard")}
              >
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className="menu-icon2"
                />
                <span className="menu-text2">Dashboard</span>
              </li>
              <li
                className={`menu-item2 ${
                  activeMenu === "myAccount" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("myAccount")}
              >
                <FontAwesomeIcon icon={faUser} className="menu-icon2" />
                <span className="menu-text2">My Account</span>
              </li>
              <li
                className={`menu-item2 ${
                  activeMenu === "myShipment" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("myShipment")}
              >
                <FontAwesomeIcon
                  icon={faFileInvoice}
                  className="menu-icon2"
                />
                <span className="menu-text2">My Shipment</span>
              </li>
              <li
                className={`menu-item2 ${
                  activeMenu === "newShipment" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("newShipment")}
              >
                <FontAwesomeIcon
                  icon={faTruckFast}
                  className="menu-icon2"
                />
                <span className="menu-text2">New Shipment</span>
              </li>
              <li
                className={`menu-item2 ${
                  activeMenu === "deviceData" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("deviceData")}
              >
                <FontAwesomeIcon icon={faServer} className="menu-icon2" />
                <span className="menu-text2">Device Data</span>
              </li>
            </ul>
            <button
              className="back-button"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                className="menu-icon3"
              />
              <span className="menu-text2">Back</span>
            </button>
          </nav>
          <button className="sidebar-logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} className="button-icon" />
            <span className="button-text">Logout</span>
          </button>
        </div>
      )}

      {/* <div className="create-shipment-header">
        <h1>Create New Shipment</h1>
        <p>Please fill all the details</p>
      </div> */}
      <form className="create-shipment-form" onSubmit={handleSubmit}>
        <div className="create-shipment-section">
          {/* Left Section */}
          <div className="create-shipment-left-section">
            <label htmlFor="shipmentNumber">Shipment Number*</label>
            <input
              type="text"
              name="shipmentNumber"
              placeholder="Shipment Number"
              value={formData.shipmentNumber}
              onChange={handleChange}
            />
            <label htmlFor="routeDetails">Route Details*</label>
            <select
              name="routeDetails"
              value={formData.routeDetails}
              onChange={handleChange}
            >
              <option value="">Select Route</option>
              <option value="route1">Route 1</option>
              <option value="route2">Route 2</option>
            </select>
            <label htmlFor="device">Device*</label>
            <select
              name="device"
              value={formData.device}
              onChange={handleChange}
            >
              <option value="">Select Device</option>
              <option value="device1">Device 1</option>
              <option value="device2">Device 2</option>
            </select>
            <label htmlFor="poNumber">PO Number*</label>
            <input
              type="text"
              name="poNumber"
              placeholder="PO Number"
              value={formData.poNumber}
              onChange={handleChange}
            />
            <label htmlFor="ndcNumber">NDC Number*</label>
            <input
              type="text"
              name="ndcNumber"
              placeholder="NDC Number"
              value={formData.ndcNumber}
              onChange={handleChange}
            />
            <label htmlFor="serialNumberOfGoods">
              Serial Number of Goods*
            </label>
            <input
              type="text"
              name="serialNumberOfGoods"
              placeholder="Serial Number of Goods"
              value={formData.serialNumberOfGoods}
              onChange={handleChange}
            />
            <button type="submit">Create Shipment</button>
          </div>

          {/* Right Section */}
          <div className="create-shipment-right-section">
            <label htmlFor="containerNumber">Container Number*</label>
            <input
              type="text"
              name="containerNumber"
              placeholder="Container Number"
              value={formData.containerNumber}
              onChange={handleChange}
            />
            <label htmlFor="goodsType">Goods Type*</label>
            <select
              name="goodsType"
              value={formData.goodsType}
              onChange={handleChange}
            >
              <option value="">Select Goods</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
            <label htmlFor="expectedDeliveryDate">
              Expected Delivery Date*
            </label>
            <input
              type="date"
              name="expectedDeliveryDate"
              value={formData.expectedDeliveryDate}
              onChange={handleChange}
            />
            <label htmlFor="deliveryNumber">Delivery Number*</label>
            <input
              type="text"
              name="deliveryNumber"
              placeholder="Delivery Number"
              value={formData.deliveryNumber}
              onChange={handleChange}
            />
            <label htmlFor="batchId">Batch ID*</label>
            <input
              type="text"
              name="batchId"
              placeholder="Batch ID"
              value={formData.batchId}
              onChange={handleChange}
            />
            <label htmlFor="shipmentDescription">
              Shipment Description*
            </label>
            <textarea
              name="shipmentDescription"
              placeholder="Description"
              value={formData.shipmentDescription}
              onChange={handleChange}
            />
            <button type="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Newshipment;
