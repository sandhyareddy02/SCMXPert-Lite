
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faUser, faFileInvoice, faTruckFast, faServer, faArrowRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleMenuClick = (menu) => {
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
            navigate("/newshipment"); // Navigate to the New Shipment page
            break;
          case "deviceData":
            navigate("/devicedata");
            break;
          default:
            break;
        }
      };

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/'); // Redirect to the homepage
    };

    const handleCreateShipment = () => {
        navigate('/newshipment'); // Navigate to the New Shipment page
    };

    const handleDeviceData = () => {
        navigate('/devicedata');
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                {/* Hamburger Menu */}
                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <h1>Hi Sandhya! Welcome to the SCMXpert-Lite!</h1>
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
                            <li className={`menu-item2 ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => handleMenuClick('dashboard')}>
                                <FontAwesomeIcon icon={faLayerGroup} className="menu-icon2" />
                                <span className="menu-text2">Dashboard</span>
                            </li>
                            <li className={`menu-item2 ${activeMenu === 'myAccount' ? 'active' : ''}`} onClick={() => handleMenuClick('myAccount')}>
                                <FontAwesomeIcon icon={faUser} className="menu-icon2" />
                                <span className="menu-text2">My Account</span>
                            </li>
                            <li className={`menu-item2 ${activeMenu === 'myShipment' ? 'active' : ''}`} onClick={() => handleMenuClick('myShipment')}>
                                <FontAwesomeIcon icon={faFileInvoice} className="menu-icon2" />
                                <span className="menu-text2">My Shipment</span>
                            </li>
                            <li className={`menu-item2 ${activeMenu === 'newShipment' ? 'active' : ''}`} onClick={() => handleMenuClick('newShipment')}>
                                <FontAwesomeIcon icon={faTruckFast} className="menu-icon2" />
                                <span className="menu-text2">New Shipment</span>
                            </li>
                            <li className={`menu-item2 ${activeMenu === 'deviceData' ? 'active' : ''}`} onClick={() => handleMenuClick('deviceData')}>
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

            <div className="dashboard-section">
                <div className="dashboard-left-section">
                    <h2>Create a New Shipment</h2>
                    <button className="new-cs" onClick={handleCreateShipment}>
                        CREATE SHIPMENT
                    </button>
                </div>
                <div className="dashboard-right-section">
                    <h2>To See a Device Data Stream</h2>
                    <button className="device-ds" onClick={handleDeviceData}>DEVICE DATA STREAM</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
