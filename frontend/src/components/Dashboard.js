
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import '../styles/Dashboard.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLayerGroup, faUser, faFileInvoice, faTruckFast, faServer, faArrowRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';
// import { jwtDecode } from 'jwt-decode';


// const Dashboard = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [activeMenu, setActiveMenu] = useState('dashboard');
//     const [userName, setUserName] = useState('');
//     const navigate = useNavigate();

//     const [role, setRole] = useState('');

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             console.log('No token found. Redirecting to login.');
//             navigate('/');
//         } else {
//             try {
//                 const decodedToken = jwtDecode(token);
//                 const currentTime = Math.floor(Date.now() / 1000);
    
//                 if (decodedToken.exp < currentTime) {
//                     console.log('Token expired. Redirecting to login.');
//                     localStorage.removeItem('authToken');
//                     navigate('/');
//                 } else {
//                     setUserName(decodedToken.name || 'User');
    
//                     // Store the role for navigation purposes
//                     setRole(decodedToken.role || 'user');
//                 }
//             } catch (error) {
//                 console.error('Invalid token:', error);
//                 localStorage.removeItem('authToken');
//                 navigate('/');
//             }
//         }
//     }, [navigate]);
    

//     const handleMenuClick = (menu) => {
//         setActiveMenu(menu);
//         setIsMenuOpen(false); // Close the sidebar menu after navigation
//         switch (menu) {
//             case 'dashboard':
//                 navigate('/dashboard');
//                 break;
//             case 'myAccount':
//                 navigate('/myaccount');
//                 break;
//             case 'myShipment':
//                 navigate('/myshipment');
//                 break;
//             case 'newShipment':
//                 navigate('/newshipment'); 
//                 break;
//             case "deviceData":
//                 if (role === 'admin') {
//                     navigate('/devicedata');
//                 } else {
//                     alert("Access Denied: Only admins can view this page.");
//                 }
//                 break;
//             default:
//                 break;
//         }
//     };



//     const handleLogout = () => {
//         console.log('Logging out...');
//         localStorage.removeItem('authToken'); // Remove the token from localStorage on logout
//         navigate('/'); // Redirect to the homepage (login page)
//     };

//     const handleCreateShipment = () => {
//         navigate('/newshipment'); // Navigate to the New Shipment page
//     };

//     const handleDeviceData = () => {
//         if (role !== "admin") {
//             alert("Access Denied: Only admins can view this page.");
//         } else {
//             navigate('/devicedata');
//         }
//     };

//     return (
//         <div className="dashboard-container">
//             <div className="dashboard-header">
//                 {/* Hamburger Menu */}
//                 <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                     <div className="line"></div>
//                     <div className="line"></div>
//                     <div className="line"></div>
//                 </div>
//                 <h1>Hi {userName}! Welcome to the SCMXpert-Lite!</h1>
//             </div>

//             {/* Sidebar Menu */}
//             {isMenuOpen && (
//                 <div className="sidebar-menu">
//                     <div className="logo2">
//                         <img src={logo} alt="My Logo" className="logo-image2" />
//                         <h2>Exafluence</h2>
//                     </div>
//                     <nav className="menu2">
//                         <ul>
//                             <li className={`menu-item2 ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => handleMenuClick('dashboard')}>
//                                 <FontAwesomeIcon icon={faLayerGroup} className="menu-icon2" />
//                                 <span className="menu-text2">Dashboard</span>
//                             </li>
//                             <li className={`menu-item2 ${activeMenu === 'myAccount' ? 'active' : ''}`} onClick={() => handleMenuClick('myAccount')}>
//                                 <FontAwesomeIcon icon={faUser} className="menu-icon2" />
//                                 <span className="menu-text2">My Account</span>
//                             </li>
//                             <li className={`menu-item2 ${activeMenu === 'myShipment' ? 'active' : ''}`} onClick={() => handleMenuClick('myShipment')}>
//                                 <FontAwesomeIcon icon={faFileInvoice} className="menu-icon2" />
//                                 <span className="menu-text2">My Shipment</span>
//                             </li>
//                             <li className={`menu-item2 ${activeMenu === 'newShipment' ? 'active' : ''}`} onClick={() => handleMenuClick('newShipment')}>
//                                 <FontAwesomeIcon icon={faTruckFast} className="menu-icon2" />
//                                 <span className="menu-text2">New Shipment</span>
//                             </li>
//                             {/* <li className={`menu-item2 ${activeMenu === 'deviceData' ? 'active' : ''}`} onClick={() => handleMenuClick('deviceData')}>
//                                 <FontAwesomeIcon icon={faServer} className="menu-icon2" />
//                                 <span className="menu-text2">Device Data</span>
//                             </li> */}
//                             {role === 'admin' && (
//     <li
//         className={`menu-item2 ${activeMenu === 'deviceData' ? 'active' : ''}`}
//         onClick={() => handleMenuClick('deviceData')}
//     >
//         <FontAwesomeIcon icon={faServer} className="menu-icon2" />
//         <span className="menu-text2">Device Data</span>
//     </li>
// )}
//                         </ul>
//                         <button className="back-button" onClick={() => setIsMenuOpen(false)}>
//                             <FontAwesomeIcon icon={faArrowRotateLeft} className="menu-icon3" />
//                             <span className="menu-text2">Back</span>
//                         </button>
//                     </nav>
//                     <button className="sidebar-logout" onClick={handleLogout}>
//                         <FontAwesomeIcon icon={faRightFromBracket} className="button-icon" />
//                         <span className="button-text">Logout</span>
//                     </button>
//                 </div>
//             )}

//             <div className="dashboard-section">
//                 <div className="dashboard-left-section">
//                     <h2>Create a New Shipment</h2>
//                     <button className="new-cs" onClick={handleCreateShipment}>
//                         CREATE SHIPMENT
//                     </button>
//                 </div>
//                 <div className="dashboard-right-section">
//                     <h2>To See a Device Data Stream</h2>
//                     <button className="device-ds" onClick={handleDeviceData}>DEVICE DATA STREAM</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faUser, faFileInvoice, faTruckFast, faServer, faArrowRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { jwtDecode } from 'jwt-decode';

// Dialog Component
const Dialog = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <p>{message}</p>
                <button className="dialog-close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setDialogMessage('No token found. Redirecting to login.');
            setIsDialogOpen(true);
            navigate('/');
        } else {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken.exp < currentTime) {
                    setDialogMessage('Token expired. Redirecting to login.');
                    setIsDialogOpen(true);
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    setUserName(decodedToken.name || 'User');
                    setRole(decodedToken.role || 'user');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                setDialogMessage('Invalid token. Redirecting to login.');
                setIsDialogOpen(true);
                localStorage.removeItem('authToken');
                navigate('/');
            }
        }
    }, [navigate]);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        setIsMenuOpen(false);
        switch (menu) {
            case 'dashboard':
                navigate('/dashboard');
                break;
            case 'myAccount':
                navigate('/myaccount');
                break;
            case 'myShipment':
                navigate('/myshipment');
                break;
            case 'newShipment':
                navigate('/newshipment');
                break;
            case "deviceData":
                if (role === 'admin') {
                    navigate('/devicedata');
                } else {
                    setDialogMessage('Access Denied: Only admins can view this page.');
                    setIsDialogOpen(true);
                }
                break;
            default:
                break;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleCreateShipment = () => {
        navigate('/newshipment');
    };

    const handleDeviceData = () => {
        if (role !== "admin") {
            setDialogMessage('Access Denied: Only admins can view this page.');
            setIsDialogOpen(true);
        } else {
            navigate('/devicedata');
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <h1>Hi {userName}! Welcome to the SCMXpert-Lite!</h1>
            </div>

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
                            {role === 'admin' && (
                                <li className={`menu-item2 ${activeMenu === 'deviceData' ? 'active' : ''}`} onClick={() => handleMenuClick('deviceData')}>
                                    <FontAwesomeIcon icon={faServer} className="menu-icon2" />
                                    <span className="menu-text2">Device Data</span>
                                </li>
                            )}
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

            {/* Dialog Component */}
            <Dialog
                isOpen={isDialogOpen}
                message={dialogMessage}
                onClose={() => setIsDialogOpen(false)}
            />
        </div>
    );
};

export default Dashboard;
