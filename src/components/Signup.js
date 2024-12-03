
import '../styles/Signup.css';
import React, { useState } from 'react';
// Import Font Awesome CSS for eye icons
import '@fortawesome/fontawesome-free/css/all.min.css';

const Signup = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = [];
        const { fullname, email, password, confirmPassword, termsAccepted } = formData;

        // Validate name
        if (!fullname.trim()) newErrors.push('Full name is required.');

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.push('Invalid email address.');

        // Validate password
        if (password.length < 9) newErrors.push('Password must be at least 9 characters long.');
        if (!/[A-Z]/.test(password)) newErrors.push('Password must contain at least one uppercase letter.');
        if (!/\d/.test(password)) newErrors.push('Password must contain at least one digit.');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) newErrors.push('Password must contain at least one special character.');
        if (password !== confirmPassword) newErrors.push('Passwords do not match.');

        // Validate terms acceptance
        if (!termsAccepted) newErrors.push('You must accept the terms and conditions.');

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed with form submission
            console.log('Form submitted:', formData);
            setErrors([]);
            setShowErrorDialog(false);
            onSubmit();
        } else {
            setShowErrorDialog(true);
        }
    };

    const closeErrorDialog = () => {
        setShowErrorDialog(false);
    };

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <div className='signup-left-section'>
                    <h1 className='signup-h1'>SCMXpert-Lite</h1>
                    <h2 className='signup-h2'>Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='fullname'>What should we call you?*</label>
                        <br />
                        <input
                            type='text'
                            id='fullname'
                            placeholder='Enter your full name'
                            value={formData.fullname}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <label htmlFor='email'>Email address*</label>
                        <br />
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email address'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        <label htmlFor='password'>Create a New password*</label>
                        <br />
                        <div className='password-container'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                placeholder='Enter New password'
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type='button'
                                className='toggle-password'
                                onClick={togglePasswordVisibility}
                                aria-label='Toggle password visibility'
                            >
                                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </button>
                        </div>
                        <br />
                        <label htmlFor='confirmPassword'>Confirm New password*</label>
                        <br />
                        <div className='password-container'>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id='confirmPassword'
                                placeholder='Confirm New password'
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type='button'
                                className='toggle-password'
                                onClick={toggleConfirmPasswordVisibility}
                                aria-label='Toggle confirm password visibility'
                            >
                                <i className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </button>
                        </div>
                        <br />
                        <div className='terms'>
                            <input
                                type='checkbox'
                                id='termsAccepted'
                                checked={formData.termsAccepted}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor='termsAccepted'>
                                I have read and I accept the privacy policy & conditions of use.
                            </label>
                        </div>
                        <button type='submit' className='signup-btn'>SIGN UP</button>
                    </form>
                </div>
                <div className='signup-right-section'>
                    <h2>Welcome Back!</h2>
                    <p>Welcome back! Please login with your personal info.</p>
                    <button className='signin-btn'>SIGN IN</button>
                </div>
            </div>

            {/* Error Dialog */}
            {showErrorDialog && (
                <div className='error-dialog'>
                    <div className='error-dialog-content'>
                        <h3>Info Errors</h3>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                        <button onClick={closeErrorDialog} className='close-btn'>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;