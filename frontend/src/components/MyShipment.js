// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/MyShipment.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLayerGroup, faUser, faFileInvoice, faTruckFast, faServer, faArrowRotateLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';

// const Shipmentdetails = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('myShipment');
//   const navigate = useNavigate();

//   // Set active menu based on the current route
//   useEffect(() => {
//     const path = window.location.pathname;
//     if (path.includes('myshipment')) {
//       setActiveMenu('myShipment');
//     }
//   }, []);

//   const handleMenuClick = (menu) => {
//     setActiveMenu(menu);
//     setIsMenuOpen(false); // Close the sidebar menu after navigation
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
//         navigate("/devicedata");
//         break;
//       default:
//         break;
//     }
//   };

//   const handleLogout = () => {
//     console.log('Logging out...');
//     navigate('/'); // Redirect to the homepage
//   };

//   const shipments = [
//     {
//       shipmentNumber: "0006335",
//       routeDetails: "Kochi",
//       device: "578",
//       poNumber: "0006",
//       mhcNumber: "486",
//       socNumber: "234548",
//       containerNumber: "3444",
//       goodsType: "Electronics",
//       expectedDelivery: "2024-12-01 08:00",
//       deliveryNumber: "56764",
//       batchId: "69",
//       shipmentDescription: "Mobile phone"
//     },
//     {
//       shipmentNumber: "0808932",
//       routeDetails: "Chennai",
//       device: "009",
//       poNumber: "5720",
//       mhcNumber: "675",
//       socNumber: "787",
//       containerNumber: "514",
//       goodsType: "Electronics",
//       expectedDelivery: "2024-11-29 19:00",
//       deliveryNumber: "63479",
//       batchId: "76447",
//       shipmentDescription: "Mobile phone from amazon"
//     },
//     {
//       shipmentNumber: "5637658",
//       routeDetails: "Pune",
//       device: "097",
//       poNumber: "4770",
//       mhcNumber: "47",
//       socNumber: "678245",
//       containerNumber: "6704644",
//       goodsType: "Citrus",
//       expectedDelivery: "2024-12-01 08:13:35",
//       deliveryNumber: "67444",
//       batchId: "67",
//       shipmentDescription: "Greens for export"
//     }
//   ];

//   return (
//     <div className="shipment-container">
//       {/* Hamburger Menu */}
//       <div>
//         <div className="menu-icon-acc" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
//               <li className={`menu-item2 ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => handleMenuClick('dashboard')}>
//                 <FontAwesomeIcon icon={faLayerGroup} className="menu-icon2" />
//                 <span className="menu-text2">Dashboard</span>
//               </li>
//               <li className={`menu-item2 ${activeMenu === 'myAccount' ? 'active' : ''}`} onClick={() => handleMenuClick('myAccount')}>
//                 <FontAwesomeIcon icon={faUser} className="menu-icon2" />
//                 <span className="menu-text2">My Account</span>
//               </li>
//               <li className={`menu-item2 ${activeMenu === 'myShipment' ? 'active' : ''}`} onClick={() => handleMenuClick('myShipment')}>
//                 <FontAwesomeIcon icon={faFileInvoice} className="menu-icon2" />
//                 <span className="menu-text2">My Shipment</span>
//               </li>
//               <li className={`menu-item2 ${activeMenu === 'newShipment' ? 'active' : ''}`} onClick={() => handleMenuClick('newShipment')}>
//                 <FontAwesomeIcon icon={faTruckFast} className="menu-icon2" />
//                 <span className="menu-text2">New Shipment</span>
//               </li>
//               <li className={`menu-item2 ${activeMenu === 'deviceData' ? 'active' : ''}`} onClick={() => handleMenuClick('deviceData')}>
//                 <FontAwesomeIcon icon={faServer} className="menu-icon2" />
//                 <span className="menu-text2">Device Data</span>
//               </li>
//             </ul>
//             <button className="back-button" onClick={() => setIsMenuOpen(false)}>
//               <FontAwesomeIcon icon={faArrowRotateLeft} className="menu-icon3" />
//               <span className="menu-text2">Back</span>
//             </button>
//           </nav>
//           <button className="sidebar-logout" onClick={handleLogout}>
//             <FontAwesomeIcon icon={faRightFromBracket} className="button-icon" />
//             <span className="button-text">Logout</span>
//           </button>
//         </div>
//       )}

//       {/* Shipment Table */}
//       <div className="table-container">
//         <h2>My Shipments</h2>
//         <table className="shipment-table">
//           <thead>
//             <tr>
//               <th>Shipment Number</th>
//               <th>Route Details</th>
//               <th>Device</th>
//               <th>PO Number</th>
//               <th>MHC Number</th>
//               <th>SOC Number</th>
//               <th>Container Number</th>
//               <th>Goods Type</th>
//               <th>Expected Delivery</th>
//               <th>Delivery Number</th>
//               <th>Batch ID</th>
//               <th>Shipment Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shipments.map((shipment, index) => (
//               <tr key={index}>
//                 <td>{shipment.shipmentNumber}</td>
//                 <td>{shipment.routeDetails}</td>
//                 <td>{shipment.device}</td>
//                 <td>{shipment.poNumber}</td>
//                 <td>{shipment.mhcNumber}</td>
//                 <td>{shipment.socNumber}</td>
//                 <td>{shipment.containerNumber}</td>
//                 <td>{shipment.goodsType}</td>
//                 <td>{shipment.expectedDelivery}</td>
//                 <td>{shipment.deliveryNumber}</td>
//                 <td>{shipment.batchId}</td>
//                 <td>{shipment.shipmentDescription}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Shipmentdetails;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/MyShipment.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faLayerGroup,
//   faUser,
//   faFileInvoice,
//   faTruckFast,
//   faServer,
//   faArrowRotateLeft,
//   faRightFromBracket,
// } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/logo.png';
// import { jwtDecode } from 'jwt-decode';

// const Shipmentdetails = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('myShipment');
//   const [shipments, setShipments] = useState([]);
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();

//     useEffect(() => {
//         const fetchShipments = async () => {
//             try {
//                 const token = localStorage.getItem('authToken');
//                 if (!token) {
//                     console.error('No token found. Redirecting to login...');
//                     navigate('/');
//                     return;
//                 }

//                 // Decode token and validate
//                 try {
//                     const decodedToken = jwtDecode(token);
//                     const currentTime = Math.floor(Date.now() / 1000);

//                     if (decodedToken.exp < currentTime) {
//                         console.log('Token expired. Redirecting to login...');
//                         localStorage.removeItem('authToken');
//                         navigate('/');
//                         return;
//                     }

//                     setRole(decodedToken.role || 'user');
//                 } catch (error) {
//                     console.error('Invalid token:', error);
//                     localStorage.removeItem('authToken');
//                     navigate('/');
//                     return;
//                 }

//                 // Fetch shipment data
//                 const response = await axios.get('http://localhost:8000/myshipment', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 console.log('Fetched shipment data:', response.data); // Debug
//                 setShipments(response.data); // Save data to state
//             } catch (error) {
//                 if (error.response?.status === 401) {
//                     console.log('Token expired or invalid. Clearing token and redirecting...');
//                     localStorage.removeItem('authToken');
//                     navigate('/');
//                 } else {
//                     console.error('Error fetching shipment data:', error.response?.data || error.message);
//        }
//      }
//    };
  
//    fetchShipments();
// }, [navigate]);



//   const handleMenuClick = (menu) => {
//     setActiveMenu(menu);
//     setIsMenuOpen(false); 
//     switch (menu) {
//       case 'dashboard':
//         navigate('/dashboard');
//         break;
//       case 'myAccount':
//         navigate('/myaccount');
//         break;
//       case 'myShipment':
//         navigate('/myshipment');
//         break;
//       case 'newShipment':
//         navigate('/newshipment');
//         break;
//         case "deviceData":
//           if (role === 'admin') {
//               navigate('/devicedata');
//           } else {
//               alert("Access Denied: Only admins can view this page.");
//           }
//           break;
//       default:
//         break;
//     }
//   };

//   const handleLogout = () => {
//     console.log('Logging out...');
//     localStorage.removeItem('authToken');
//     navigate('/'); // Redirect to the homepage
//   };

//   return (
//     <div className="shipment-container">
//       {/* Hamburger Menu */}
//       <div>
//         <div className="menu-icon-acc" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
//                 className={`menu-item2 ${activeMenu === 'dashboard' ? 'active' : ''}`}
//                 onClick={() => handleMenuClick('dashboard')}
//               >
//                 <FontAwesomeIcon icon={faLayerGroup} className="menu-icon2" />
//                 <span className="menu-text2">Dashboard</span>
//               </li>
//               <li
//                 className={`menu-item2 ${activeMenu === 'myAccount' ? 'active' : ''}`}
//                 onClick={() => handleMenuClick('myAccount')}
//               >
//                 <FontAwesomeIcon icon={faUser} className="menu-icon2" />
//                 <span className="menu-text2">My Account</span>
//               </li>
//               <li
//                 className={`menu-item2 ${activeMenu === 'myShipment' ? 'active' : ''}`}
//                 onClick={() => handleMenuClick('myShipment')}
//               >
//                 <FontAwesomeIcon icon={faFileInvoice} className="menu-icon2" />
//                 <span className="menu-text2">My Shipment</span>
//               </li>
//               <li
//                 className={`menu-item2 ${activeMenu === 'newShipment' ? 'active' : ''}`}
//                 onClick={() => handleMenuClick('newShipment')}
//               >
//                 <FontAwesomeIcon icon={faTruckFast} className="menu-icon2" />
//                 <span className="menu-text2">New Shipment</span>
//               </li>
//               {/* <li
//                 className={`menu-item2 ${activeMenu === 'deviceData' ? 'active' : ''}`}
//                 onClick={() => handleMenuClick('deviceData')}
//               >
//                 <FontAwesomeIcon icon={faServer} className="menu-icon2" />
//                 <span className="menu-text2">Device Data</span>
//               </li> */}
//               {role === 'admin' && (
//     <li
//         className={`menu-item2 ${activeMenu === 'deviceData' ? 'active' : ''}`}
//         onClick={() => handleMenuClick('deviceData')}
//     >
//         <FontAwesomeIcon icon={faServer} className="menu-icon2" />
//         <span className="menu-text2">Device Data</span>
//     </li>
// )}
//             </ul>
//             <button className="back-button" onClick={() => setIsMenuOpen(false)}>
//               <FontAwesomeIcon icon={faArrowRotateLeft} className="menu-icon3" />
//               <span className="menu-text2">Back</span>
//             </button>
//           </nav>
//           <button className="sidebar-logout" onClick={handleLogout}>
//             <FontAwesomeIcon icon={faRightFromBracket} className="button-icon" />
//             <span className="button-text">Logout</span>
//           </button>
//         </div>
//       )}

//       {/* Shipment Table */}
//       <div className="table-container">
//   <h1>My Shipments</h1>
//   <table className="shipment-table">
//     <thead>
//       <tr>
//         <th>Shipment Number</th>
//         <th>Route Details</th>
//         <th>Device</th>
//         <th>PO Number</th>
//         <th>NDC Number</th>
//         <th>Serial Number of Goods</th>
//         <th>Container Number</th>
//         <th>Goods Type</th>
//         <th>Expected Delivery Date</th>
//         <th>Delivery Number</th>
//         <th>Batch ID</th>
//         <th>Shipment Description</th>
//       </tr>
//     </thead>
//     <tbody>
//   {shipments.length > 0 ? (
//     shipments.map((shipment, index) => (
//       <tr key={index}>
//         <td>{shipment.Shipment_Number}</td>
//         <td>{shipment.Route_Details}</td>
//         <td>{shipment.Device}</td>
//         <td>{shipment.PO_Number}</td>
//         <td>{shipment.NDC_Number}</td>
//         <td>{shipment.Serial_Number}</td>
//         <td>{shipment.Container_Number}</td>
//         <td>{shipment.Goods_Type}</td>
//         <td>{shipment.Expected_Delivery_Date}</td>
//         <td>{shipment.Delivery_Number}</td>
//         <td>{shipment.Batch_Id}</td>
//         <td>{shipment.Shipment_Description}</td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="12">No shipments available.</td>
//     </tr>
//   )}
// </tbody>

//   </table>
// </div>

//     </div>
//   );
// };

// export default Shipmentdetails;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MyShipment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faUser,
  faFileInvoice,
  faTruckFast,
  faServer,
  faArrowRotateLeft,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { jwtDecode } from 'jwt-decode';

const Shipmentdetails = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('myShipment');
  const [shipments, setShipments] = useState([]);
  const [role, setRole] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false); // State for dialog visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found. Redirecting to login...');
          navigate('/');
          return;
        }

        // Decode token and validate
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < currentTime) {
            console.log('Token expired. Redirecting to login...');
            localStorage.removeItem('authToken');
            navigate('/');
            return;
          }

          setRole(decodedToken.role || 'user');
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('authToken');
          navigate('/');
          return;
        }

        // Fetch shipment data
        const response = await axios.get('http://localhost:8000/myshipment', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Fetched shipment data:', response.data);
        setShipments(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          console.log('Token expired or invalid. Clearing token and redirecting...');
          localStorage.removeItem('authToken');
          navigate('/');
        } else {
          console.error('Error fetching shipment data:', error.response?.data || error.message);
        }
      }
    };

    fetchShipments();
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
      case 'deviceData':
        if (role === 'admin') {
          navigate('/devicedata');
        } else {
          setDialogVisible(true); // Show dialog box for access denied
        }
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="shipment-container">
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
              <li
                className={`menu-item2 ${activeMenu === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleMenuClick('dashboard')}
              >
                <FontAwesomeIcon icon={faLayerGroup} className="menu-icon2" />
                <span className="menu-text2">Dashboard</span>
              </li>
              <li
                className={`menu-item2 ${activeMenu === 'myAccount' ? 'active' : ''}`}
                onClick={() => handleMenuClick('myAccount')}
              >
                <FontAwesomeIcon icon={faUser} className="menu-icon2" />
                <span className="menu-text2">My Account</span>
              </li>
              <li
                className={`menu-item2 ${activeMenu === 'myShipment' ? 'active' : ''}`}
                onClick={() => handleMenuClick('myShipment')}
              >
                <FontAwesomeIcon icon={faFileInvoice} className="menu-icon2" />
                <span className="menu-text2">My Shipment</span>
              </li>
              <li
                className={`menu-item2 ${activeMenu === 'newShipment' ? 'active' : ''}`}
                onClick={() => handleMenuClick('newShipment')}
              >
                <FontAwesomeIcon icon={faTruckFast} className="menu-icon2" />
                <span className="menu-text2">New Shipment</span>
              </li>
              {role === 'admin' && (
                <li
                  className={`menu-item2 ${activeMenu === 'deviceData' ? 'active' : ''}`}
                  onClick={() => handleMenuClick('deviceData')}
                >
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

      {/* Shipment Table */}
      <div className="table-container">
        <h1>My Shipments</h1>
        <table className="shipment-table">
          <thead>
            <tr>
              {role === 'admin' && <th>Created By</th>}
              <th>Shipment Number</th>
              <th>Route Details</th>
              <th>Device</th>
              <th>PO Number</th>
              <th>NDC Number</th>
              <th>Serial Number of Goods</th>
              <th>Container Number</th>
              <th>Goods Type</th>
              <th>Expected Delivery Date</th>
              <th>Delivery Number</th>
              <th>Batch ID</th>
              <th>Shipment Description</th>
            </tr>
          </thead>
          <tbody>
            {shipments.length > 0 ? (
              shipments.map((shipment, index) => (
                <tr key={index}>
                  {/* {role === 'admin' && <td>{shipment.user || 'N/A'}</td>} */}
                  {role === 'admin' && <td>{shipment.Created_By || 'N/A'}</td>}
                  <td>{shipment.Shipment_Number}</td>
                  <td>{shipment.Route_Details}</td>
                  <td>{shipment.Device}</td>
                  <td>{shipment.PO_Number}</td>
                  <td>{shipment.NDC_Number}</td>
                  <td>{shipment.Serial_Number}</td>
                  <td>{shipment.Container_Number}</td>
                  <td>{shipment.Goods_Type}</td>
                  <td>{shipment.Expected_Delivery_Date}</td>
                  <td>{shipment.Delivery_Number}</td>
                  <td>{shipment.Batch_Id}</td>
                  <td>{shipment.Shipment_Description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No shipments available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
    </div>
  );
};

export default Shipmentdetails;
