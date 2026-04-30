import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AddTeacherPage = () => {
    const [formData, setFormData] = useState({ tz: '', fullName: '', password: '', grade: '' });
    const [gradeLevel, setGradeLevel] = useState(''); 
    const [classNum, setClassNum] = useState('');     
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const gradeLevels = ['1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade'];
    const classNumbers = ['1', '2', '3', '4', '5'];
    useEffect(() => {
        if (gradeLevel && classNum) {
            const levelNum = gradeLevel.split(' ')[0].replace(/\D/g, ""); 
            setFormData(prev => ({ ...prev, grade: `Class ${levelNum}-${classNum}` }));
        }
    }, [gradeLevel, classNum]);

    const handleAdd = async (e) => {
        e.preventDefault();
        
        if (!formData.grade) {
            setError("Please select a grade and class number.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await authService.register(
                formData.tz, 
                formData.fullName, 
                formData.password, 
                formData.grade
            );           
            alert("Teacher added successfully!");
            navigate('/TeachersListPage'); 
        } catch (err) {
            setError("Registration failed. Please check the details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', 
        padding: '12px', 
        background: '#222', 
        border: '1px solid #333', 
        borderRadius: '8px', 
        color: '#fff', 
        outline: 'none'
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', width: '100%', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '450px', backgroundColor: '#1a1a1a', padding: '40px', borderRadius: '15px', border: '1px solid #333', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '30px' }}>Register New Teacher</h2>
                
                {error && (
                    <div style={{ color: '#ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.1)', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center', fontSize: '14px', border: '1px solid rgba(255, 77, 77, 0.2)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleAdd}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#bbb', marginBottom: '8px', fontSize: '14px' }}>ID Number</label>
                        <input 
                            style={inputStyle}
                            placeholder="Enter ID" 
                            required
                            value={formData.tz}
                            onChange={e => setFormData({...formData, tz: e.target.value})} 
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#bbb', marginBottom: '8px', fontSize: '14px' }}>Full Name</label>
                        <input 
                            style={inputStyle}
                            placeholder="Enter Full Name" 
                            required
                            value={formData.fullName}
                            onChange={e => setFormData({...formData, fullName: e.target.value})} 
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#bbb', marginBottom: '8px', fontSize: '14px' }}>Password</label>
                        <input 
                            type="password" 
                            style={inputStyle}
                            placeholder="Enter Password" 
                            required
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})} 
                        />
                    </div>
                    <div style={{ marginBottom: '35px' }}>
                        <label style={{ display: 'block', color: '#bbb', marginBottom: '8px', fontSize: '14px' }}>Assigned Grade & Class</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select 
                                style={inputStyle} 
                                required 
                                value={gradeLevel}
                                onChange={(e) => setGradeLevel(e.target.value)}
                            >
                                <option value="">Grade</option>
                                {gradeLevels.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>       
                            <select 
                                style={inputStyle} 
                                required 
                                value={classNum}
                                onChange={(e) => setClassNum(e.target.value)}
                            >
                                <option value="">No.</option>
                                {classNumbers.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        {formData.grade && (
                            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--primary)' }}>
                                Will be registered to: <strong>{formData.grade}</strong>
                            </div>
                        )}
                    </div>
                    <button 
                        type="submit" 
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
                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                        }}
                    >
                        {loading ? "saving..." : "save teacher"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTeacherPage;