import "../styles/Signin.css";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios"; // Make sure axios is installed
import { useNavigate } from 'react-router-dom';


const Signin = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
    const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // Track steps in forgot password flow
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [successPopup, setSuccessPopup] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleForgotPasswordChange = (e) => {
        const { id, value } = e.target;
        setForgotPasswordData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const onCaptchaChange = (value) => {
        console.log("Captcha value:", value);
        setCaptchaVerified(true); // Set to true when the user successfully verifies the captcha
    };

    const validateForm = () => {
        setErrors([]);
        return true; // Simply returns true, as actual password validation is done in API
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("http://localhost:8000/signin", formData); // Replace with your backend API URL
                if (response.data.message === "Login successful") {
                    console.log("Form submitted:", formData);
                    const token = response.data.token.access_token; // Assuming token is returned as response.data.token
                    localStorage.setItem("authToken", token); 
                    // localStorage.setItem("authToken", JSON.stringify(token));
                    

                    
                    setErrors([]);
                    setShowErrorDialog(false);
                    onSubmit(); // Trigger the post-login action
                } else {
                    setErrors(["Incorrect email or password"]);
                    setShowErrorDialog(true);
                }
            } catch (error) {
                setErrors([error.response?.data?.detail || "Something went wrong"]);
                setShowErrorDialog(true);
            }
        } else {
            setShowErrorDialog(true);
        }
    };

    const handleSignUpBtn = () => {
        navigate('/signup'); 
    };

    const closeErrorDialog = () => {
        setShowErrorDialog(false);
    };

    // const handleForgotPasswordSubmit = async (e) => {
    //     e.preventDefault();
        
    //     if (forgotPasswordStep === 1 && forgotPasswordData.email) {
    //         try {
    //             const response = await axios.get(`http://localhost:8000/forgotPassword/${forgotPasswordData.email}`);
    //             if (response.data.message === "User found, proceed to password reset") {
    //                 // User found, move to the next step
    //                 setForgotPasswordStep(3); // Move to password reset step
    //             } else {
    //                 // Handle case where user is not found
    //                 setErrors(["User not found, please enter a valid email address."]);
    //                 setShowErrorDialog(true);
    //             }
    //         } catch (error) {
    //             // Handle any error from the API
    //             setErrors([error.response?.data?.detail || "Something went wrong"]);
    //             setShowErrorDialog(true);
    //         }
    //     } else if (
    //         forgotPasswordStep === 3 &&
    //         forgotPasswordData.newPassword === forgotPasswordData.confirmPassword &&
    //         forgotPasswordData.newPassword
    //     ) {
    //         try {
    //             // Send the new password to the backend for updating
    //             const response = await axios.post("http://localhost:8000/resetPassword", {
    //                 email: forgotPasswordData.email,
    //                 newPassword: forgotPasswordData.newPassword,
    //             });
        
    //             if (response.data.message === "Password reset successful") {
    //                 // Password successfully updated
    //                 setSuccessPopup(true); // Show success popup
    //                 setShowForgotPasswordDialog(false); // Close the forgot password dialog
    //                 setForgotPasswordStep(1); // Reset step to 1 for the next user
    //                 setForgotPasswordData({ email: "", otp: "", newPassword: "", confirmPassword: "" }); // Reset the form
    //             } else {
    //                 setErrors([response.data.message]);
    //                 setShowErrorDialog(true);
    //             }
    //         } catch (error) {
    //             setErrors(["Error resetting password. Please try again later."]);
    //             setShowErrorDialog(true);
    //         }
    //     } else if (forgotPasswordStep === 3) {
    //         setErrors(["Passwords do not match!"]);
    //         setShowErrorDialog(true);
    //     }
    // };


    // const handleForgotPasswordSubmit = async (e) => {
    //     e.preventDefault();
        
    //     if (forgotPasswordStep === 1 && forgotPasswordData.email) {
    //         try {
    //             const response = await axios.get(`http://localhost:8000/forgotPassword/${forgotPasswordData.email}`);
    //             console.log(response.data);  // Add a log to check what the response is
                
    //             if (response.data.message === "User found, proceed to password reset") {
    //                 setForgotPasswordStep(3); // Move to password reset step
    //             } else {
    //                 setErrors(["User not found, please enter a valid email address."]);
    //                 setShowErrorDialog(true);
    //             }
    //         } catch (error) {
    //             console.error("Error in forgot password flow:", error);
    //             setErrors([error.response?.data?.detail || "Something went wrong"]);
    //             setShowErrorDialog(true);
    //         }
    //     }
    // };

    
    

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
      
        if (forgotPasswordStep === 1 && forgotPasswordData.email) {
            try {
                const response = await axios.get(`http://localhost:8000/forgotPassword/${forgotPasswordData.email}`);
                if (response.data.message === "User found, proceed to password reset") {
                    setForgotPasswordStep(3); // Move to password reset step
                } else {
                    setErrors([response.data.message || "User not found"]);
                    setShowErrorDialog(true);
                }
            } catch (error) {
                setErrors([error.response?.data?.detail || "Something went wrong"]);
                setShowErrorDialog(true);
            }
        }
    
    //     if (forgotPasswordStep === 3) {
    //         // Check if the new passwords match before sending the request
    //         if (forgotPasswordData.newPassword === forgotPasswordData.confirmPassword && forgotPasswordData.newPassword) {
    //             try {
    //                 const response = await axios.post("http://localhost:8000/resetPassword", {
    //                     email: forgotPasswordData.email,
    //                     newPassword: forgotPasswordData.newPassword,
    //                     confirmPassword: forgotPasswordData.confirmPassword, // Include confirmPassword in the request
    //                 });
    
    //                 if (response.data.message === "Password reset successful") {
    //                     setSuccessPopup(true); // Show success popup
    //                     setShowForgotPasswordDialog(false); // Close the forgot password dialog
    //                     setForgotPasswordStep(1); // Reset the step to 1 for the next user
    //                     setForgotPasswordData({ email: "", otp: "", newPassword: "", confirmPassword: "" }); // Reset the form
    //                 } else {
    //                     setErrors([response.data.message || "Unknown error"]);
    //                     setShowErrorDialog(true);
    //                 }
    //             } catch (error) {
    //                 setErrors([error.response?.data?.detail || "Error resetting password. Please try again later."]);
    //                 setShowErrorDialog(true);
    //             }
    //         } else {
    //             setErrors(["Passwords do not match!"]);
    //             setShowErrorDialog(true);
    //         }
    //     }
    // };
    if (forgotPasswordStep === 3) {
        // Validate newPassword and confirmPassword
        const newErrors = [];
        const { newPassword, confirmPassword } = forgotPasswordData;

        if (newPassword.length < 9) newErrors.push("Password must be at least 9 characters long.");
        if (!/[A-Z]/.test(newPassword)) newErrors.push("Password must contain at least one uppercase letter.");
        if (!/\d/.test(newPassword)) newErrors.push("Password must contain at least one digit.");
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) newErrors.push("Password must contain at least one special character.");
        if (newPassword !== confirmPassword) newErrors.push("Passwords do not match.");

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setShowErrorDialog(true);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/resetPassword", {
                email: forgotPasswordData.email,
                newPassword: forgotPasswordData.newPassword,
                confirmPassword: forgotPasswordData.confirmPassword, // Include confirmPassword in the request
            });

            if (response.data.message === "Password reset successful") {
                setSuccessPopup(true); // Show success popup
                setShowForgotPasswordDialog(false); // Close the forgot password dialog
                setForgotPasswordStep(1); // Reset the step to 1 for the next user
                setForgotPasswordData({ email: "", otp: "", newPassword: "", confirmPassword: "" }); // Reset the form
            } else {
                setErrors([response.data.message || "Unknown error"]);
                setShowErrorDialog(true);
            }
        } catch (error) {
            setErrors([error.response?.data?.detail || "Error resetting password. Please try again later."]);
            setShowErrorDialog(true);
        }
    }
};
    
    const navigateToSignin = () => {
        window.location.href = "/signin"; // Adjust the path as per your routing setup
    };
    
    
    
    
    

    // const closeForgotPasswordDialog = () => {
    //     setShowForgotPasswordDialog(false);
    //     setForgotPasswordStep(1);
    // };

    const closeForgotPasswordDialog = () => {
        setShowForgotPasswordDialog(false);
        setForgotPasswordStep(1); // Reset the step to 1
        setForgotPasswordData({ // Reset the form data
            email: "",
            otp: "",
            newPassword: "",
            confirmPassword: "",
        });
    };
    

    const closeSuccessPopup = () => {
        setSuccessPopup(false);
    };

    return (
        <div className="signin-container">
            <div className="signin-form">
                <div className="signin-left-section">
                    <h2>Create your account</h2>
                    <p>Enter your personal details and start your journey with us.</p>
                    <button className="signup-btn2" onClick={handleSignUpBtn}>SIGN UP</button>
                </div>
                <div className="signin-right-section">
                    <h1>SCMXpert-Lite</h1>
                    <h3>Sign in now</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email address*</label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <label htmlFor="password">Password*</label>
                        <br />
                        <div className="password-container2">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password2"
                                onClick={togglePasswordVisibility}
                                aria-label="Toggle password visibility"
                            >
                                <i
                                    className={showPassword
                                        ? "fas fa-eye-slash"
                                        : "fas fa-eye"}
                                ></i>
                            </button>
                        </div>
                        <br />
                        <div className="remember">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">Remember Me</label>
                        </div>
                        {/* Google reCAPTCHA */}
                        <div className="captcha-container">
                            <ReCAPTCHA
                                sitekey="6LdzzIsqAAAAAExRYVSzi_PXGMXXhjYDfEkeaCCa" // Replace with your Google reCAPTCHA site key
                                onChange={onCaptchaChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="signin-btn2"
                            disabled={!captchaVerified} // Disable the button until captcha is verified
                        >
                            SIGN IN
                        </button>
                        {/* Forgot your password section */}
                        <p className="forgot-password">
                            <span onClick={() => setShowForgotPasswordDialog(true)} style={{ cursor: "pointer" }}>
                                Forgot your password?
                            </span>
                        </p>
                    </form>
                </div>
            </div>

            {showForgotPasswordDialog && (
    <div className="error-dialog">
        <div className="error-dialog-content">
            <h3>Forgot Password</h3>
            {forgotPasswordStep === 1 && (
                <form onSubmit={handleForgotPasswordSubmit}>
                    <label htmlFor="email">Enter your registered email ID:</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        value={forgotPasswordData.email}
                        onChange={handleForgotPasswordChange}
                        required
                    />
                    <br />
                    <button type="submit" className="close-btn">
                        Validate
                    </button>
                </form>
            )}
            {forgotPasswordStep === 3 && (
                <form onSubmit={handleForgotPasswordSubmit}>
                    <label htmlFor="newPassword">Enter your new password:</label>
                    <br />
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={forgotPasswordData.newPassword}
                        onChange={handleForgotPasswordChange}
                        required
                    />
                    <br />
                    <label htmlFor="confirmPassword">Confirm your new password:</label>
                    <br />
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={forgotPasswordData.confirmPassword}
                        onChange={handleForgotPasswordChange}
                        required
                    />
                    <br />
                    <button type="submit" className="close-btn">
                        Reset Password
                    </button>
                </form>
            )}
            <button onClick={closeForgotPasswordDialog} className="close-btn">
                Close
            </button>
        </div>
    </div>
)}

            {/* Success Popup */}
{successPopup && (
    <div className="success-popup">
        <div className="success-popup-content">
            <h3>Password Changed Successfully!</h3>
            <button
                onClick={() => {
                    closeSuccessPopup();
                    navigateToSignin(); // Redirect to the Signin page
                }}
                className="close-btn"
            >
                Close
            </button>
        </div>
    </div>
)}



            {/* Error Dialog */}
            {showErrorDialog && (
                <div className="error-dialog">
                    <div className="error-dialog-content">
                        <h3>Error</h3>
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                        <button onClick={closeErrorDialog} className="close-btn">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signin;
