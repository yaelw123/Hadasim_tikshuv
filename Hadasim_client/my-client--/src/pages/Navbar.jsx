import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    const isAdmin = user && (user.role === 'ADMIN' || user.role === 'admin');
    const userName = user?.name || user?.firstName || "User";

    const handleLogout = () => {
        localStorage.removeItem("user"); 
        window.location.href = "/"; 
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.logoLink}>Hadasim System</Link>
            </div>        
            <ul style={styles.navLinks}>
                <li><Link to="/teachers" style={styles.link}>Teachers</Link></li>
                <li><Link to="/students" style={styles.link}>Students</Link></li>
                
                {isAdmin && (
                    <li><Link to="/add-teacher" style={styles.link}>+ Teacher</Link></li>
                )}
                
                <li><Link to="/add-student" style={styles.link}>+ Student</Link></li>
                
                <li>
                    <Link to="/map" style={styles.mapLink}> Live Map</Link>
                </li>
            </ul>
            <div style={styles.userSection}>
                {user && (
                    <span style={styles.welcomeText}>
                        Hello, <strong>{userName}</strong>
                    </span>
                )}
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 30px',
        backgroundColor: '#333',
        color: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold'
    },
    logoLink: {
        color: '#4CAF50',
        textDecoration: 'none'
    },
    navLinks: {
        display: 'flex',
        listStyle: 'none',
        gap: '20px',
        margin: 0,
        padding: 0
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px'
    },
    mapLink: {
        color: '#ffeb3b',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    welcomeText: {
        fontSize: '14px',
        color: '#e0e0e0'
    },
    logoutBtn: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

export default Navbar;