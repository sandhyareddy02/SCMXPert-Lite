import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import Newshipment from './components/NewShipment';
import DeviceDataStream from './components/DeviceData';
import Account from './components/MyAccount';
import Shipmentdetails from './components/MyShipment';
import UsersInfo from './components/UsersInfo';
import PrivateRoute from './components/navigation';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/signin';
  const isDashboardPage = location.pathname === '/dashboard';
  const isNewshipmentPage = location.pathname === '/newshipment';
  const isDevicedataPage = location.pathname === '/devicedata';
  const isMyaccountPage = location.pathname === '/myaccount';
  const isMyshipmentdetailsPage = location.pathname === '/myshipment';
  const isUsersInfoPage = location.pathname === '/usersinfo';

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const shouldRenderHeader =
    !isAuthPage &&
    !isDashboardPage &&
    !isNewshipmentPage &&
    !isDevicedataPage &&
    !isMyaccountPage &&
    !isMyshipmentdetailsPage &&
    !isUsersInfoPage &&
    !isAuthenticated;

  const shouldRenderFooter =
    !isAuthPage &&
    !isDashboardPage &&
    !isNewshipmentPage &&
    !isDevicedataPage &&
    !isMyaccountPage &&
    !isMyshipmentdetailsPage &&
    !isUsersInfoPage &&
    !isAuthenticated;

  return (
    <div className="App">
      {shouldRenderHeader && <Header />}

      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" /> */}
        <Route path="/signup" element={<Signup onSubmit={handleAuthentication} />} />
        <Route path="/signin" element={<Signin onSubmit={handleAuthentication} />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/newshipment" element={<PrivateRoute> <Newshipment /> </PrivateRoute>} />
        <Route path="/devicedata" element={<PrivateRoute> <DeviceDataStream /> </PrivateRoute>} />
        <Route path="/myaccount" element={<PrivateRoute> <Account /> </PrivateRoute>} />
        <Route path="/myshipment" element={ <PrivateRoute>  <Shipmentdetails /> </PrivateRoute>} />
        <Route path="/usersinfo" element={ <PrivateRoute>  <UsersInfo /> </PrivateRoute>} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/" />} />
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