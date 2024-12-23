import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { jwtDecode } from "jwt-decode";

function Newshipment() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [errorDialog, setErrorDialog] = useState(null);
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
  const [role, setRole] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No token found. Redirecting to login.");
      navigate("/");
    } else {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          console.log("Token expired. Redirecting to login.");
          localStorage.removeItem("authToken");
          navigate("/");
        } else {
          setDecodedToken(decoded); // Store the decoded token in state
          setRole(decoded.role || "user");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
        navigate("/");
      }
    }
  }, [navigate]);


   console.log("userrrrrrr",decodedToken)

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

        if (role === "admin") {
          navigate("/devicedata");
        } else {
          setDialogVisible(true);
        }
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const requiredFields = [
      "shipmentNumber",
      "containerNumber",
      "routeDetails",
      "goodsType",
      "device",
      "expectedDeliveryDate",
      "poNumber",
      "deliveryNumber",
      "ndcNumber",
      "batchId",
      "serialNumberOfGoods",
      "shipmentDescription",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrorDialog("Please fill out the " + field + " field to create the new shipment.");
        return;
      }
    }
    

  
    if (formData.shipmentNumber.length !== 7) {
      setErrorDialog("Shipment number must be exactly 7 characters.");
      return;
    }
  
    if (formData.containerNumber.length !== 7) {
      setErrorDialog("Container number must be exactly 7 characters.");
      return;
    }


    const data = {
      shipment_number: formData.shipmentNumber,
      container_number: formData.containerNumber,
      route_details: formData.routeDetails,
      goods_type: formData.goodsType,
      device: formData.device,
      expected_delivery_date: formData.expectedDeliveryDate,
      po_number: formData.poNumber,
      delivery_number: formData.deliveryNumber,
      ndc_number: formData.ndcNumber,
      batch_id: formData.batchId,
      serial_number: formData.serialNumberOfGoods,
      shipment_description: formData.shipmentDescription,
      created_by: decodedToken?.name,  // Use role here
    };
  
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No authentication token found.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/newshipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        setSuccessPopup(true);
        setTimeout(() => {
          setSuccessPopup(false);
          navigate("/myshipment");
        }, 3000);
      } else {
        const errorData = await response.json();
        if (errorData.detail === "Duplicate shipment number") {
          setErrorDialog("Duplicate shipment number, the data can't be created.");
        } else {
          setErrorDialog(`Failed to create shipment: ${errorData.detail}`);
        }
      }
    } catch (error) {
      console.error("Network Error:", error);
      setErrorDialog("An unexpected error occurred. Please try again.");
    }
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
                <FontAwesomeIcon icon={faLayerGroup} className="menu-icon2" />
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
                <FontAwesomeIcon icon={faFileInvoice} className="menu-icon2" />
                <span className="menu-text2">My Shipment</span>
              </li>
              <li
                className={`menu-item2 ${
                  activeMenu === "newShipment" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("newShipment")}
              >
                <FontAwesomeIcon icon={faTruckFast} className="menu-icon2" />
                <span className="menu-text2">New Shipment</span>
              </li>
              {role === "admin" && (
                <li
                  className={`menu-item2 ${
                    activeMenu === "deviceData" ? "active" : ""
                  }`}
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
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                className="menu-icon3"
              />
              <span className="menu-text2">Back</span>
            </button>
          </nav>
          <button className="sidebar-logout" onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="button-icon"
            />
            <span className="button-text">Logout</span>
          </button>
        </div>
      )}
      
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
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Goa">Goa</option>
              <option value="Benguluru">Benguluru</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Madurai">Madurai</option>
              <option value="Kochi">Kochi</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Coimbatore">Coimbatore</option>
            </select>
            <label htmlFor="device">Device*</label>
            <input
              type="number"
              name="device"
              value={formData.device}
              onChange={handleChange}
              placeholder="Enter Device Number"
              required
            />
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
            <label htmlFor="serialNumberOfGoods">Serial Number of Goods*</label>
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
              <option value="footwear">Footwear</option>
              <option value="plants">Plants</option>
              <option value="decoritems">Decor Items</option>
              <option value="automobileparts">AutoMobile Parts</option>
              <option value="householditems">HouseHold Items</option>
              <option value="furniture">Furniture</option>
              <option value="gardeningtools">Gradening Tools</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="booksandstationary">Books and Stationary</option>
            </select>
            <label htmlFor="expectedDeliveryDate">
              Expected Delivery Date*
            </label>
            <input
              type="date"
              name="expectedDeliveryDate"
              value={formData.expectedDeliveryDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} required
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
            <label htmlFor="shipmentDescription">Shipment Description*</label>
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

      {/* Dialog Box */}
      {dialogVisible && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Access Denied</h3>
            <p>Only admins can view this page.</p>
            <button onClick={() => setDialogVisible(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Error Dialog */}
      {/* {errorDialog && (
        <div className="error-dialog">
          <p>{errorDialog}</p>
          <button onClick={() => setErrorDialog(null)}>Close</button>
        </div>
      )} */}

{errorDialog && (
    <div className="dialog-overlay">
        <div className="dialog-box">
            <h3>Error</h3>
            <p>{errorDialog}</p>
            <button
                className="dialog-close-button"
                onClick={() => setErrorDialog(null)}
            >
                Close
            </button>
        </div>
    </div>
)}


      {successPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Shipment Created Successfully!</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Newshipment;
