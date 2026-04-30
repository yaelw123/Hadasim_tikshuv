import authService from "../services/authService";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ tz: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setCredentials(prev => ({
            ...prev,         
            [name]: value
        }));
    };
    const handleLogin = async () => {
        if (!credentials.tz || !credentials.password) {
          setErrorMessage("Please fill in all fields");
          return;
        }

        setErrorMessage("");
        setLoading(true);

        try {
            await authService.login(credentials.tz, credentials.password);
            navigate("/teachers");
            window.location.reload();
        } catch (error) {
            const resMessage = error.response?.data?.error || "Connection error";
            setErrorMessage(resMessage);
            setLoading(false);
        }
    };  
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: 'calc(100vh - 80px)', 
            width: '100%',
            padding: '20px'
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '400px', 
                backgroundColor: '#1a1a1a', 
                padding: '40px', 
                borderRadius: '15px', 
                border: '1px solid #333',
                boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
            }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    color: 'var(--primary)', 
                    marginBottom: '35px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}>
                    Login
                </h2>                
                {errorMessage && (
                    <div style={{ 
                        color: '#ff4d4d', 
                        backgroundColor: 'rgba(255, 77, 77, 0.1)', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        marginBottom: '20px', 
                        textAlign: 'center', 
                        fontSize: '14px',
                        border: '1px solid rgba(255, 77, 77, 0.2)'
                    }}>
                        {errorMessage}
                    </div>
                )}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#bbb', marginBottom: '8px', fontSize: '14px' }}>ID Number</label>
                    <input
                        type="text"
                        name="tz"
                        placeholder="Enter your ID"
                        value={credentials.tz}
                        onChange={handleChange}
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            background: '#222', 
                            border: '1px solid #333', 
                            borderRadius: '8px', 
                            color: '#fff', 
                            outline: 'none' 
                        }}
                    />
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', color: '#bbb', marginBottom: '8px', fontSize: '14px' }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={credentials.password}
                        onChange={handleChange}
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            background: '#222', 
                            border: '1px solid #333', 
                            borderRadius: '8px', 
                            color: '#fff', 
                            outline: 'none' 
                        }}
                    />
                </div>
                <button 
                    onClick={handleLogin} 
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '14px', 
                        backgroundColor: 'var(--primary)', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '8px', 
                        fontWeight: 'bold', 
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: '0.3s',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        textTransform: 'uppercase'
                    }}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                        "Connect"
                    )}
                </button>
                <p style={{ 
                    textAlign: 'center', 
                    color: '#555', 
                    marginTop: '25px', 
                    fontSize: '12px' 
                }}>
                    Secure Access System v1.0
                </p>
            </div>
        </div>
    );
};

export default LoginPage;