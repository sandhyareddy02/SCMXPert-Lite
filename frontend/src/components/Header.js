// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Header.css';
// import logo from '../assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faUserPlus, 
//   faRightToBracket, 
// } from '@fortawesome/free-solid-svg-icons';

// const Header = () => {
//   // State to track the active item
//   // const [activeMenu, setActiveMenu] = useState(null);
//   const [activeButton, setActiveButton] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true); // Add scrolled class
//       } else {
//         setIsScrolled(false); // Remove scrolled class
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener
//   }, []);

//   // Handle button click
//   const handleButtonClick = (button) => {
//     setActiveButton(button);
//     // setActiveMenu(null); 

//     if (button === 'signUp') {
//         navigate('/signup');
//     }

//     else if (button === 'signIn') {
//         navigate('/signin');
//     }
//   };

//   return (
//     <div id="top" className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
//       <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
//         <div className="logo">
//           <img src={logo} alt="My Logo" className="logo-image" />
//         </div>

//         <div className="header-buttons">
//           <div
//             className={`header-button ${activeButton === 'signUp' ? 'active' : ''}`}
//             onClick={() => handleButtonClick('signUp')}
//           >
//             <FontAwesomeIcon icon={faUserPlus} className="button-icon" />
//             <span className="button-text">Sign Up</span>
//           </div>
//           <div
//             className={`header-button ${activeButton === 'signIn' ? 'active' : ''}`}
//             onClick={() => handleButtonClick('signIn')}
//           >
//             <FontAwesomeIcon icon={faRightToBracket} className="button-icon" />
//             <span className="button-text">Sign In</span>
//           </div>
//         </div>
//       </header>
//       <div className="hero-container">
//         <h1>Welcome to our SCMXpert-Lite !</h1>
//         <p>We have a team of talented resources to make your products ship soon...</p>
//       </div>
//     </div>
//   );
// };

// export default Header;


import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Check user authentication status
  const isAuthenticated = !!localStorage.getItem('authToken');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Redirect to /signin if user is not authenticated and trying to access restricted routes
    const restrictedRoutes = ['/dashboard', '/newshipment', '/myshipment', '/devicedata', '/myaccount'];
    if (!isAuthenticated && restrictedRoutes.includes(location.pathname)) {
      navigate('/signin');
    }
  }, [isAuthenticated, location, navigate]);

  const handleButtonClick = (button) => {
    setActiveButton(button);

    if (button === 'signUp') {
      navigate('/signup');
    } else if (button === 'signIn') {
      navigate('/signin');
    }
  };

  return (
    <div id="top" className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <img src={logo} alt="My Logo" className="logo-image" />
        </div>

        <div className="header-buttons">
          <div
            className={`header-button ${activeButton === 'signUp' ? 'active' : ''}`}
            onClick={() => handleButtonClick('signUp')}
          >
            <FontAwesomeIcon icon={faUserPlus} className="button-icon" />
            <span className="button-text">Sign Up</span>
          </div>
          <div
            className={`header-button ${activeButton === 'signIn' ? 'active' : ''}`}
            onClick={() => handleButtonClick('signIn')}
          >
            <FontAwesomeIcon icon={faRightToBracket} className="button-icon" />
            <span className="button-text">Sign In</span>
          </div>
        </div>
      </header>
      <div className="hero-container">
        <h1>Welcome to our SCMXpert-Lite!</h1>
        <p>We have a team of talented resources to make your products ship soon...</p>
      </div>
    </div>
  );
};

export default Header;
