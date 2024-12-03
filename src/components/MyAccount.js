// import React from "react";
// import '../styles/MyAccount.css';

// const Account = () => {
//     return (
//         <div className="account-container">
//             <h1>User Account Details</h1>
//             <p>Enter the Email address to get the user details !</p>
//             <div className="account-section">
//                     <label htmlFor="email">Email*</label>
//                     <br />
//                     <input type="email" id="email" placeholder="Enter the Email" required />
//                     <button className="acc-open">Open</button>
//             </div>
//         </div>
//     )
// }

// export default Account;



// 

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faUser, faFileInvoice, faTruckFast, faServer, faArrowRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const Account = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('myAccount');
    const navigate = useNavigate();

    // Set active menu based on the current route
    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('myaccount')) {
            setActiveMenu('myAccount');
        }
    }, []);

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

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/'); // Redirect to the homepage
    };

    return (
        <div className="account-container">
            {/* Hamburger Menu */}
            <div>
                <div className="menu-icon-acc" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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

            {/* Account Details Section */}
            <div className="account-details">
                <h1>User Account Details</h1>
                <p>Enter the Email address to get the user details!</p>
                <div className="account-section">
                    <label htmlFor="email">Email*</label>
                    <br />
                    <input type="email" id="email" placeholder="Enter the Email" required />
                    <button className="acc-open">Open</button>
                </div>
            </div>
        </div>
    );
};

export default Account;
