
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Signup from './components/Signup';
// import Signin from './components/Signin';
// import Dashboard from './components/Dashboard'; // Import Dashboard component

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication status
//   const location = useLocation(); // Get the current route
//   const navigate = useNavigate(); // For navigating to the dashboard

//   // Check if the current route is for Login or Signup to hide the Header and Footer
//   const isAuthPage = location.pathname === '/signup' || location.pathname === '/signin';

//   // Redirect to dashboard after successful signup/signin
//   const handleAuthentication = () => {
//     setIsAuthenticated(true); // User is authenticated
//     navigate('/dashboard'); // Redirect to Dashboard
//   };

//   return (
//     <div className="App">
//       {!isAuthPage && !isAuthenticated && <Header />} {/* Render Header only if not on Auth pages and user is not authenticated */}
      
//       <Routes>
//         <Route path="/" />
//         <Route path="/signup" element={<Signup onSubmit={handleAuthentication} />} />
//         <Route path="/signin" element={<Signin onSubmit={handleAuthentication} />} />
//         <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
//       </Routes>

//       {!isAuthPage && !isAuthenticated && <Footer />} {/* Render Footer only if not on Auth pages and user is not authenticated */}
//     </div>
//   );
// };

// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default AppWrapper;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Signup from './components/Signup';
// import Signin from './components/Signin';
// import Dashboard from './components/Dashboard';
// import Newshipment from './components/NewShipment'; // Import Newshipment component
// import DeviceDataStream from './components/DeviceData'; // Import DeviceDataStream component
// import Account from './components/MyAccount';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication status
//   const location = useLocation(); // Get the current route
//   const navigate = useNavigate(); // For navigating to the dashboard

//   // Check if the current route is for Login or Signup to hide the Header and Footer
//   const isAuthPage = location.pathname === '/signup' || location.pathname === '/signin';
//   const isDashboardPage = location.pathname === '/dashboard';
//   const isNewshipmentPage = location.pathname === '/newshipment';
//   const isDevicedataPage = location.pathname === '/devicedata';
//   const isMyaccountPage = location.pathname === './myaccount';

//   // Redirect to dashboard after successful signup/signin
//   const handleAuthentication = () => {
//     setIsAuthenticated(true); // User is authenticated
//     navigate('/dashboard'); // Redirect to Dashboard
//   };

//   // Persist authentication state to localStorage
//   useEffect(() => {
//     localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
//   }, [isAuthenticated]);

//   // Render Header only if not on Auth pages and user is not authenticated
//   const shouldRenderHeader = !isAuthPage && !isDashboardPage && !isNewshipmentPage && !isDevicedataPage && !isMyaccountPage && !isAuthenticated;

//   // Render Footer only if not on Auth pages and user is not authenticated
//   const shouldRenderFooter = !isAuthPage && !isDashboardPage && !isNewshipmentPage && !isDevicedataPage && !isMyaccountPage && !isAuthenticated;

//   return (
//     <div className="App">
//       {shouldRenderHeader && <Header />} {/* Render Header */}
      
//       <Routes>
//         <Route path="/" /> {/* Home page route */}
//         <Route path="/signup" element={<Signup onSubmit={handleAuthentication} />} />
//         <Route path="/signin" element={<Signin onSubmit={handleAuthentication} />} />
//         <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
//         <Route path="/newshipment" element={<Newshipment />} /> {/* Newshipment route */}
//         <Route path="/devicedata" element={<DeviceDataStream />} /> {/* DeviceDataStream route */}
//         <Route path="/myaccount" element={<Account />} />
//       </Routes>

//       {shouldRenderFooter && <Footer />} {/* Render Footer */}
//     </div>
//   );
// };

// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default AppWrapper;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import Newshipment from './components/NewShipment';
import DeviceDataStream from './components/DeviceData';
import Account from './components/MyAccount';
import Shipmentdetails from './components/MyShipment';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for the current page based on the route
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/signin';
  const isDashboardPage = location.pathname === '/dashboard';
  const isNewshipmentPage = location.pathname === '/newshipment';
  const isDevicedataPage = location.pathname === '/devicedata';
  const isMyaccountPage = location.pathname === '/myaccount';
  const isMyshipmentdetailsPage = location.pathname === '/myshipment'; // Ensure correct path here

  // Handle authentication and navigation to dashboard
  const handleAuthentication = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  // Save the authentication status in localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Conditional rendering for header and footer
  const shouldRenderHeader =
    !isAuthPage &&
    !isDashboardPage &&
    !isNewshipmentPage &&
    !isDevicedataPage &&
    !isMyaccountPage &&
    !isMyshipmentdetailsPage &&
    !isAuthenticated;

  const shouldRenderFooter =
    !isAuthPage &&
    !isDashboardPage &&
    !isNewshipmentPage &&
    !isDevicedataPage &&
    !isMyaccountPage &&
    !isMyshipmentdetailsPage &&
    !isAuthenticated;

  return (
    <div className="App">
      {shouldRenderHeader && <Header />}

      <Routes>
        <Route path="/" />
        <Route path="/signup" element={<Signup onSubmit={handleAuthentication} />} />
        <Route path="/signin" element={<Signin onSubmit={handleAuthentication} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newshipment" element={<Newshipment />} />
        <Route path="/devicedata" element={<DeviceDataStream />} />
        <Route path="/myaccount" element={<Account />} />
        <Route path="/myshipment" element={<Shipmentdetails />} /> {/* Corrected path for My Shipment */}
      </Routes>

      {shouldRenderFooter && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
