import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import teachersService from '../services/teacherService';
import studentService from '../services/studentService';

const AddStudentPage = () => {
    const [formData, setFormData] = useState({ tz: '', fullName: '', grade: '', teacherTz: '' });
    const [teachers, setTeachers] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await teachersService.loadTeachers();
                setTeachers(data);
            } catch (err) {
                setError("Could not load teachers list.");
            }
        };
        fetchTeachers();
    }, []);

    const handleTeacherChange = (e) => {
        const value = e.target.value;
        const selectedTeacher = teachers.find(t => t.fullName === value)
        if (selectedTeacher) {
            setFormData(prev => ({ 
                ...prev, 
                teacherTz: selectedTeacher.tz,
                grade: selectedTeacher.grade 
            }));
        } else {
            setFormData(prev => ({ ...prev, teacherTz: '', grade: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.teacherTz) {
            setError("Please select a valid teacher from the list.");
            return;
        }

        setLoading(true);
        try {
            await studentService.addStudent(formData);
            alert("Student added successfully!");
            navigate('/students');
        } catch (err) {
            setError("Failed to add student. Please check the details.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '12px', background: '#222', border: '1px solid #333', 
        borderRadius: '8px', color: '#fff', outline: 'none'
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', width: '100%', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '450px', backgroundColor: '#1a1a1a', padding: '40px', borderRadius: '15px', border: '1px solid #333', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
                <h2 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '30px' }}>Register Student</h2>        
                {error && <div style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ color: '#bbb', display: 'block', marginBottom: '8px' }}>Student ID</label>
                        <input style={inputStyle} placeholder="Enter ID" required value={formData.tz} onChange={e => setFormData({...formData, tz: e.target.value})} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ color: '#bbb', display: 'block', marginBottom: '8px' }}>Full Name</label>
                        <input style={inputStyle} placeholder="Enter Name" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ color: '#bbb', display: 'block', marginBottom: '8px' }}>Assign Teacher (Search by Name or Class)</label>
                        <input 
                            list="teachers-list" 
                            style={inputStyle} 
                            placeholder="Start typing teacher name or class..." 
                            required 
                            onChange={handleTeacherChange} 
                        />
                        <datalist id="teachers-list">
                            {teachers.map(t => (
                                <option key={t.tz} value={t.fullName}>
                                    {t.grade}
                                </option>
                            ))}
                        </datalist>
                    </div>
                    {formData.grade && (
                        <div style={{ 
                            marginBottom: '30px', 
                            padding: '12px', 
                            background: 'rgba(76, 175, 80, 0.1)', 
                            borderRadius: '8px', 
                            border: '1px solid rgba(76, 175, 80, 0.3)',
                            textAlign: 'center' 
                        }}>
                            <span style={{ color: '#bbb', fontSize: '14px' }}>Target Class: </span>
                            <strong style={{ color: '#4CAF50' }}>{formData.grade}</strong>
                        </div>
                    )}
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', transition: '0.3s' }}>
                        {loading ? "saving.." : "save student"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddStudentPage;