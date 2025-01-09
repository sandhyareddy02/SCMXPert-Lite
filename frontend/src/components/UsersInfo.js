import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFloppyDisk, faLayerGroup, faUser, faFileInvoice, faTruckFast, faServer, faArrowRotateLeft, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { jwtDecode } from 'jwt-decode';
import '../styles/UsersInfo.css';

const UsersInfo = () => {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('usersInfo');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            // Dynamically fetch the hostname stored in localStorage
            const hostname = localStorage.getItem("hostname") || window.location.hostname;
    
            // Use the hostname to set the correct API URL
            const apiUrl = `http://${hostname}:8000`;
    
            const response = await fetch(`${apiUrl}/users/users`);
            if (!response.ok) throw new Error("Failed to fetch users.");
            const data = await response.json();
            const formattedUsers = data.map(user => ({
                ...user,
                role: user.role || 'user',
                isEditing: false,
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
            setDialogMessage("Failed to load user data.");
            setIsDialogOpen(true);
        }
    };

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp < currentTime) {
                    setDialogMessage('Token expired. Please log in again.');
                    setIsDialogOpen(true);
                    localStorage.removeItem('authToken');
                    navigate("/");
                } else {
                    setRole(decodedToken.role || 'user');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                setDialogMessage('Invalid token. Please log in again.');
                setIsDialogOpen(true);
                localStorage.removeItem('authToken');
                navigate("/");
            }
            };
            checkAuthentication();
            fetchUsers();
        }, [navigate]);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        setIsMenuOpen(false);
        switch (menu) {
            case 'dashboard': navigate('/dashboard'); break;
            case 'myAccount': navigate('/myaccount'); break;
            case 'myShipment': navigate('/myshipment'); break;
            case 'newShipment': navigate('/newshipment'); break;
            case 'usersInfo': navigate('/usersinfo'); break;
            case 'deviceData':
                if (role === 'admin') navigate('/devicedata');
                else {
                    setDialogMessage('Access Denied: Only admins can view this page.');
                    setIsDialogOpen(true);
                }
                break;
            default: break;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleEdit = (index) => {
        setUsers(users.map((user, i) => i === index ? { ...user, isEditing: true } : user));
    };

    const handleSave = async (index, newRole) => {
        try {
            // Dynamically fetch the hostname stored in localStorage
            const hostname = localStorage.getItem("hostname") || window.location.hostname;
    
            // Use the hostname to set the correct API URL
            const apiUrl = `http://${hostname}:8000`;
    
            const userId = users[index].email;
            const response = await fetch(`${apiUrl}/users/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update role');
            }
    
            fetchUsers();
    
            setDialogMessage('Role updated successfully!');
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error updating role:', error);
            setDialogMessage('Error updating role. Please try again.');
            setIsDialogOpen(true);
        }
    };

    const handleDeleteConfirmation = (user) => {
        setUserToDelete(user);
        setIsDeleteDialogOpen(true);
    }

    const handleDelete = async (index) => {
        try {
            // Dynamically fetch the hostname stored in localStorage
            const hostname = localStorage.getItem("hostname") || window.location.hostname;
    
            // Use the hostname to set the correct API URL
            const apiUrl = `http://${hostname}:8000`;
    
            const userId = userToDelete.email;
            const response = await fetch(`${apiUrl}/users/users/${userId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setUsers(users.filter((user) => user.email !== userToDelete.email));
            setIsDeleteDialogOpen(false);
            setDialogMessage('User deleted successfully!');
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error deleting user:', error);
            setDialogMessage('Error deleting user. Please try again.');
            setIsDialogOpen(true);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
    }

    const closeDialog = () => {
        setIsDialogOpen(false);
        navigate('/usersinfo');
    };

    return (
        <div className="usersinfo-container">
            <div className="dashboard-header">
                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <h1 className='usersinfoh1'> Users Information</h1>
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
                            <li className={`menu-item2 ${activeMenu === 'usersInfo' ? 'active' : ''}`} onClick={() => handleMenuClick('usersInfo')}>
                                <FontAwesomeIcon icon={faUser} className="menu-icon2" />
                                <span className="menu-text2">Users Info</span>
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

            <table className="usersinfo-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.isEditing ? (
                                    <select value={user.role} onChange={(e) => handleSave(index, e.target.value)}>
                                        <option value="admin">admin</option>
                                        <option value="user">user</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td>
                                {user.isEditing ? (
                                    <FontAwesomeIcon
                                        icon={faFloppyDisk}
                                        className="save-icon"
                                        onClick={() => handleSave(index, user.role)}
                                    />
                                ) : (
                                    <>
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="edit-icon"
                                            onClick={() => handleEdit(index)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="delete-icon"
                                            onClick={() => handleDeleteConfirmation(user)}
                                        />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <p>{dialogMessage}</p>
                        <button className="dialog-close-button" onClick={closeDialog}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {isDeleteDialogOpen && (
                <div className='dialog-overlay'>
                    <div className='dialog-box'>
                        <p>Are you sure you want to delete this user?</p>
                        <button className='dialog-button1' onClick={handleDelete}>Yes</button>
                        <button className='dialog-button2' onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UsersInfo;