import "../styles/Signin.css";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios"; // Make sure axios is installed

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
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [successPopup, setSuccessPopup] = useState(false);

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

    const closeErrorDialog = () => {
        setShowErrorDialog(false);
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        if (forgotPasswordStep === 1 && forgotPasswordData.email) {
            // Simulate OTP sent
            console.log("OTP sent to:", forgotPasswordData.email);
            setForgotPasswordStep(2);
        } else if (forgotPasswordStep === 2 && forgotPasswordData.otp) {
            // Simulate OTP verification
            console.log("OTP verified:", forgotPasswordData.otp);
            setForgotPasswordStep(3);
        } else if (
            forgotPasswordStep === 3 &&
            forgotPasswordData.newPassword === forgotPasswordData.confirmPassword &&
            forgotPasswordData.newPassword
        ) {
            // Simulate password reset
            console.log("Password reset successful:", forgotPasswordData.newPassword);
            setShowForgotPasswordDialog(false);
            setSuccessPopup(true); // Show success popup
        } else if (forgotPasswordStep === 3) {
            setErrors(["Passwords do not match!"]); // Error message for mismatch
            setShowErrorDialog(true); // Show error dialog when passwords do not match
        }
    };

    const closeForgotPasswordDialog = () => {
        setShowForgotPasswordDialog(false);
        setForgotPasswordStep(1);
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
                    <button className="signup-btn2">SIGN UP</button>
                </div>
                <div className="signin-right-section">
                    <h1>SCMXpert-Lite</h1>
                    <h2>Sign in now</h2>
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

            {/* Forgot Password Dialog */}
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
                                    Get OTP
                                </button>
                            </form>
                        )}
                        {forgotPasswordStep === 2 && (
                            <form onSubmit={handleForgotPasswordSubmit}>
                                <label htmlFor="otp">Enter the OTP sent to your email:</label>
                                <br />
                                <input
                                    type="text"
                                    id="otp"
                                    placeholder="Enter OTP"
                                    value={forgotPasswordData.otp}
                                    onChange={handleForgotPasswordChange}
                                    required
                                />
                                <br />
                                <button type="submit" className="close-btn">
                                    Submit
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
                <div className="error-dialog">
                    <div className="error-dialog-content">
                        <h3>Password Changed Successfully!</h3>
                        <button onClick={closeSuccessPopup} className="close-btn">
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
