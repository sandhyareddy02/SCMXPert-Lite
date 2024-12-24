// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/MyAccount.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLayerGroup, faUser, faFileInvoice, faTruckFast, faServer, faArrowRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';
// import { jwtDecode } from 'jwt-decode';

// const Account = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [activeMenu, setActiveMenu] = useState('myAccount');
//     const [role, setRole] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//             console.log("No token found. Redirecting to login.");
//             navigate('/');
//         } else {
//             try {
//                 const decodedToken = jwtDecode(token);
//                 const currentTime = Math.floor(Date.now() / 1000);
//                 if (decodedToken.exp < currentTime) {
//                     console.log("Token expired. Redirecting to login.")
//                     localStorage.removeItem('authToken')
//                     navigate('/');
//                 } else {
//                     setRole(decodedToken.role || 'user');
//                 }
//             } catch (error) {
//                 console.error("Invalid token:", error);
//                 localStorage.removeItem('authToken');
//                 navigate('/');
//             }
//         }
//     }, [navigate]);

//     const handleMenuClick = (menu) => {
//         // console.log("Menu clicked:", menu);
//         setActiveMenu(menu);
//         setIsMenuOpen(false); // Close the sidebar menu after navigation
//         switch (menu) {
//             case "dashboard":
//                 navigate("/dashboard");
//                 break;
//             case "myAccount":
//                 navigate("/myaccount");
//                 break;
//             case "myShipment":
//                 navigate("/myshipment");
//                 break;
//             case "newShipment":
//                 navigate("/newshipment");
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
//         localStorage.removeItem('authToken');
//         navigate('/'); // Redirect to the homepage
//     };

//     return (
//         <div className="account-container">
//             {/* Hamburger Menu */}
//             <div>
//                 <div className="menu-icon-acc" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                     <div className="line"></div>
//                     <div className="line"></div>
//                     <div className="line"></div>
//                 </div>
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

//             {/* Account Details Section */}
//             <div className="account-details">
//                 <h1>User Account Details</h1>
//                 <p>Enter the Email address to get the user details!</p>
//                 <div className="account-section">
//                     <label htmlFor="email">Email*</label>
//                     <br />
//                     <input type="email" id="email" placeholder="Enter the Email" required />
//                     <button className="acc-open">Open</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Account;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/MyAccount.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLayerGroup,
//   faUser,
//   faFileInvoice,
//   faTruckFast,
//   faServer,
//   faArrowRotateLeft,
//   faRightFromBracket,
// } from "@fortawesome/free-solid-svg-icons";
// import logo from "../assets/logo.png";
// import { jwtDecode } from "jwt-decode"; // Ensure this package is installed

// const Account = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState("myAccount");
//   const [userDetails, setUserDetails] = useState({ email: "", role: "" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       console.log("No token found. Redirecting to login.");
//       navigate("/");
//     } else {
//       try {
//         const decodedToken = jwtDecode(token);
//         const currentTime = Math.floor(Date.now() / 1000);
//         if (decodedToken.exp < currentTime) {
//           console.log("Token expired. Redirecting to login.");
//           localStorage.removeItem("authToken");
//           navigate("/");
//         } else {
//           setUserDetails({
//             userName: decodedToken.name || "User",
//             email: decodedToken.email || "Unknown",
//             role: decodedToken.role || "User",
//           });
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//         localStorage.removeItem("authToken");
//         navigate("/");
//       }
//     }
//   }, [navigate]);

//   const handleMenuClick = (menu) => {
//     setActiveMenu(menu);
//     setIsMenuOpen(false);
//     switch (menu) {
//       case "dashboard":
//         navigate("/dashboard");
//         break;
//       case "myAccount":
//         navigate("/myaccount");
//         break;
//       case "myShipment":
//         navigate("/myshipment");
//         break;
//       case "newShipment":
//         navigate("/newshipment");
//         break;
//       case "deviceData":
//         if (userDetails.role === "admin") {
//           navigate("/devicedata");
//         } else {
//           alert("Access Denied: Only admins can view this page.");
//         }
//         break;
//       default:
//         break;
//     }
//   };

//     const handleClose = () => {
//     navigate("/dashboard"); // Redirect to the dashboard route
//   };

//   const handleLogout = () => {
//     console.log("Logging out...");
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   return (
//     <div className="account-container">
//       {/* Hamburger Menu */}
//       <div>
//         <div
//           className="menu-icon-acc"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <div className="line"></div>
//           <div className="line"></div>
//           <div className="line"></div>
//         </div>
//       </div>

//       {/* Sidebar Menu */}
//       {isMenuOpen && (
//         <div className="sidebar-menu">
//           <div className="logo2">
//             <img src={logo} alt="My Logo" className="logo-image2" />
//             <h2>Exafluence</h2>
//           </div>
//           <nav className="menu2">
//             <ul>
//               <li
//                 className={`menu-item2 ${
//                   activeMenu === "dashboard" ? "active" : ""
//                 }`}
//                 onClick={() => handleMenuClick("dashboard")}
//               >
//                 <FontAwesomeIcon icon={faLayerGroup} className="menu-icon2" />
//                 <span className="menu-text2">Dashboard</span>
//               </li>
//               <li
//                 className={`menu-item2 ${
//                   activeMenu === "myAccount" ? "active" : ""
//                 }`}
//                 onClick={() => handleMenuClick("myAccount")}
//               >
//                 <FontAwesomeIcon icon={faUser} className="menu-icon2" />
//                 <span className="menu-text2">My Account</span>
//               </li>
//               <li
//                 className={`menu-item2 ${
//                   activeMenu === "myShipment" ? "active" : ""
//                 }`}
//                 onClick={() => handleMenuClick("myShipment")}
//               >
//                 <FontAwesomeIcon icon={faFileInvoice} className="menu-icon2" />
//                 <span className="menu-text2">My Shipment</span>
//               </li>
//               <li
//                 className={`menu-item2 ${
//                   activeMenu === "newShipment" ? "active" : ""
//                 }`}
//                 onClick={() => handleMenuClick("newShipment")}
//               >
//                 <FontAwesomeIcon icon={faTruckFast} className="menu-icon2" />
//                 <span className="menu-text2">New Shipment</span>
//               </li>
//               {userDetails.role === "admin" && (
//                 <li
//                   className={`menu-item2 ${
//                     activeMenu === "deviceData" ? "active" : ""
//                   }`}
//                   onClick={() => handleMenuClick("deviceData")}
//                 >
//                   <FontAwesomeIcon icon={faServer} className="menu-icon2" />
//                   <span className="menu-text2">Device Data</span>
//                 </li>
//               )}
//             </ul>
//             <button
//               className="back-button"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               <FontAwesomeIcon
//                 icon={faArrowRotateLeft}
//                 className="menu-icon3"
//               />
//               <span className="menu-text2">Back</span>
//             </button>
//           </nav>
//           <button className="sidebar-logout" onClick={handleLogout}>
//             <FontAwesomeIcon
//               icon={faRightFromBracket}
//               className="button-icon"
//             />
//             <span>Logout</span>
//           </button>
//         </div>
//       )}

//       {/* Account Section */}
//       <div className="account-section">
//         <h2>My Account Details</h2>
//         <p>
//         <strong>Username:</strong> {userDetails.userName}
//         </p>
//         <p>
//           <strong>Email:</strong> {userDetails.email}
//         </p>
//         <p>
//           <strong>Role:</strong> {userDetails.role}
//         </p>
//         <button className="acc-close" onClick={handleClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default Account;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/MyAccount.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLayerGroup,
//   faUser,
//   faFileInvoice,
//   faTruckFast,
//   faServer,
//   faArrowRotateLeft,
//   faRightFromBracket,
// //   faPenToSquare, faFloppyDisk, faXmark
// } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import logo from "../assets/logo.png";

// const Account = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState("myAccount");
// //   const [isEditingPhone, setIsEditingPhone] = useState(false);
// //   const [tempPhoneNumber, setTempPhoneNumber] = useState("");
//   const [userDetails, setUserDetails] = useState({
//     // userID: "Unknown",
//     userName: "",
//     email: "",
//     // phone_number: "",
//     // role: "Unknown",
//   });
//   const navigate = useNavigate();

// //   useEffect(() => {
// //     const token = localStorage.getItem("authToken");
// //     if (!token) {
// //       console.log("No token found. Redirecting to login.");
// //       navigate("/");
// //     } else {
// //       const decodedToken = JSON.parse(atob(token.split(".")[1]));
// //       const currentTime = Math.floor(Date.now() / 1000);

// //       if (decodedToken.exp < currentTime) {
// //         console.log("Token expired. Redirecting to login.");
// //         localStorage.removeItem("authToken");
// //         navigate("/");
// //       } else {
// //         // Fetch user details from backend
// //         axios
// //           .get(`http://localhost:8000/signin/${decodedToken.email}`)
// //           .then((response) => {
// //             const data = response.data;
// //             setUserDetails({
// //             //   userID: data.user_id,
// //               userName: data.name,
// //               email: data.email,
// //             //   role: data.role,
// //             });
// //           })
// //           .catch((error) => {
// //             console.error("Error fetching user details:", error);
// //             localStorage.removeItem("authToken");
// //             navigate("/");
// //           });
// //       }
// //     }
// //   }, [navigate]);

// useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       console.log("No token found. Redirecting to login.");
//       navigate("/"); // Redirect to login page if no token found
//     } else {
//       const decodedToken = JSON.parse(atob(token.split(".")[1]));
//       const currentTime = Math.floor(Date.now() / 1000);

//       if (decodedToken.exp < currentTime) {
//         console.log("Token expired. Redirecting to login.");
//         localStorage.removeItem("authToken");
//         navigate("/"); // Redirect to login page if token is expired
//       } else {
//         // Fetch user details using the email from the decoded token
//         axios
//           .get(`http://localhost:8000/signin/${decodedToken.email}`)
//           .then((response) => {
//             const data = response.data;
//             setUserDetails({
//                 userName: data.name,
//                 email: data.email,
//                 // phone_number: data.phone_number || "", 
//               });
//             // setTempPhoneNumber(data.phone_number || ""); 
//           })
//           .catch((error) => {
//             console.error("Error fetching user details:", error);
//             localStorage.removeItem("authToken");
//             navigate("/"); // Redirect to login if there's an error fetching user details
//           });
//       }
//     }
//   }, [navigate]);




//   const handleMenuClick = (menu) => {
//     setActiveMenu(menu);
//     setIsMenuOpen(false);
//     switch (menu) {
//       case "dashboard":
//         navigate("/dashboard");
//         break;
//       case "myAccount":
//         navigate("/myaccount");
//         break;
//       case "myShipment":
//         navigate("/myshipment");
//         break;
//       case "newShipment":
//         navigate("/newshipment");
//         break;
//       case "deviceData":
//         if (userDetails.role === "admin") {
//           navigate("/devicedata");
//         } else {
//           alert("Access Denied: Only admins can view this page.");
//         }
//         break;
//       default:
//         break;
//     }
//   };

// //   const handleEditPhone = () => {
// //     setTempPhoneNumber(userDetails.phoneNumber);
// //     setIsEditingPhone(true);
// //   };

// // const handleEditPhone = () => {
// //     setIsEditingPhone(true);
// //     setTempPhoneNumber(userDetails.phone_number); 
// //   };



// //   const handleSavePhone = async () => {
// //     try {
// //       const token = localStorage.getItem("authToken");
// //       const decodedToken = JSON.parse(atob(token.split(".")[1]));
// //       const email = decodedToken.email;

// //       // Send updated phone number to the backend
// //       await axios.put(`http://localhost:8000/update-phone/${email}`, {
// //         phone_number: tempPhoneNumber,
// //       });

// //       // Update state
// //       setUserDetails((prevDetails) => ({
// //         ...prevDetails,
// //         phone_number: tempPhoneNumber,
// //       }));
// //       setIsEditingPhone(false);
// //       alert("Phone number updated successfully!");
// //     } catch (error) {
// //       console.error("Error updating phone number:", error);
// //       alert("Failed to update phone number. Please try again.");
// //     }
// //   };


// // const handleSavePhone = () => {
// //     // Make the API call to update the phone number
// //     axios
// //       .put(`http://localhost:8000/update-phone/${userDetails.email}`, {
// //         phone_number: tempPhoneNumber,
// //       })
// //       .then((response) => {
// //         console.log(response.data.message); // Success message
// //         setUserDetails((prevState) => ({
// //           ...prevState,
// //           phone_number: tempPhoneNumber,
// //         }));
// //         setIsEditingPhone(false);
// //       })
// //       .catch((error) => {
// //         console.error("Error updating phone number", error);
// //       });
// //   };



// //   const handleCancelEdit = () => {
// //     setIsEditingPhone(false);
// //   };


// // const handleCancelEdit = () => {
// //     setIsEditingPhone(false);
// //     setTempPhoneNumber(userDetails.phone_number); // Reset to original phone number if canceled
// //   };


//   const handleClose = () => {
//     navigate("/dashboard"); // Redirect to the dashboard route
//   };


//   const handleLogout = () => {
//     console.log("Logging out...");
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   return (
//     <div className="account-container">
//       {/* Hamburger Menu */}
//       <div>
//         <div
//           className="menu-icon-acc"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <div className="line"></div>
//           <div className="line"></div>
//           <div className="line"></div>
//         </div>
//       </div>

//       {/* Sidebar Menu */}
//       {isMenuOpen && (
//         <div className="sidebar-menu">
//           <div className="logo2">
//             <img src={logo} alt="My Logo" className="logo-image2" />
//             <h2>Exafluence</h2>
//           </div>
//           <nav className="menu2">
//             <ul>
//               <li
//                 className={`menu-item2 ${
//                   activeMenu === "dashboard" ? "active" : ""
//                 }`}
//                 onClick={() => handleMenuClick("dashboard")}
//               >
//                 <FontAwesomeIcon icon={faLayerGroup} className="menu-icon2" />
//                 <span className="menu-text2">Dashboard</span>
//               </li>
//               <li
//                 className={`menu-item2 ${
//                   activeMenu === "myAccount" ? "active" : ""
//                 }`}
//                 onClick={() => handleMenuClick("myAccount")}
//               >
//                 <FontAwesomeIcon icon={faUser} className="menu-icon2" />
//                 <span className="menu-text2">My Account</span>
//               </li>
//               <li
//                 className={`menu-item2 ${
//                   activeMenu === "myShipment" ? "active" : ""
//                 }`}
//                 onClick={() => handleMenuClick("myShipment")}
//               >
//                 <FontAwesomeIcon icon={faFileInvoice} className="menu-icon2" />
//                 <span className="menu-text2">My Shipment</span>
//               </li>
//               <li
//                 className={`menu-item2 ${
//                   activeMenu === "newShipment" ? "active" : ""
//                 }`}
//                 onClick={() => handleMenuClick("newShipment")}
//               >
//                 <FontAwesomeIcon icon={faTruckFast} className="menu-icon2" />
//                 <span className="menu-text2">New Shipment</span>
//               </li>
//               {userDetails.role === "admin" && (
//                 <li
//                   className={`menu-item2 ${
//                     activeMenu === "deviceData" ? "active" : ""
//                   }`}
//                   onClick={() => handleMenuClick("deviceData")}
//                 >
//                   <FontAwesomeIcon icon={faServer} className="menu-icon2" />
//                   <span className="menu-text2">Device Data</span>
//                 </li>
//               )}
//             </ul>
//             <button
//               className="back-button"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               <FontAwesomeIcon
//                 icon={faArrowRotateLeft}
//                 className="menu-icon3"
//               />
//               <span className="menu-text2">Back</span>
//             </button>
//           </nav>
//           <button className="sidebar-logout" onClick={handleLogout}>
//             <FontAwesomeIcon
//               icon={faRightFromBracket}
//               className="button-icon"
//             />
//             <span>Logout</span>
//           </button>
//         </div>
//       )}

//       {/* Account Section */}
//       <div className="account-section">
//         <h2>My Account Details</h2>
//         {/* <p>
//           <strong>User ID:</strong> {userDetails.userID}
//         </p> */}
//         <p>
//           <strong>Username:</strong> {userDetails.userName}
//         </p>
//         <p>
//           <strong>Email:</strong> {userDetails.email}
//         </p>
//         {/* <p>
//           <strong>Role:</strong> {userDetails.role}
//         </p> */}
//         {/* <div>
//       <p>
//         <strong>Phone Number:</strong>{" "}
//         {isEditingPhone ? (
//           <>
//             <input
//               type="text"
//               value={tempPhoneNumber}
//               onChange={(e) => setTempPhoneNumber(e.target.value)}
//               placeholder="Enter your phone number"
//               className="phone-input"
//             />
//             <FontAwesomeIcon
//               icon={faFloppyDisk}
//               className="icon-save-icon"
//               onClick={handleSavePhone}
//             />
//             <FontAwesomeIcon
//               icon={faXmark}
//               className="icon-cancel-icon"
//               onClick={handleCancelEdit}
//             />
//           </>
//         ) : (
//           <>
//             {userDetails.phone_number ? (
//               userDetails.phone_number // Display the phone number fetched from the backend
//             ) : (
//               <span
//                 onClick={handleEditPhone}
//                 style={{ color: "blue", cursor: "pointer" }}
//               >
//                 Update
//               </span>
//             )}
//             <FontAwesomeIcon
//               icon={faPenToSquare}
//               className="icon-edit-icon"
//               onClick={handleEditPhone}
//             />
//           </>
//         )}
//       </p>
//     </div> */}
//       <button className="acc-close" onClick={handleClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default Account;



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
import { jwtDecode } from "jwt-decode"; // Ensure this package is installed

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
    navigate("/dashboard"); // Redirect to the dashboard route
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
