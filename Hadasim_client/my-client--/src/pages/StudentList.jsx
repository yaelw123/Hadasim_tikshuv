import { useState, useEffect } from "react";
import studentService from "../services/studentService";
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudent] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTz, setSearchTz] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        loadStudents();
    }, []);
    const loadStudents = async () => {
        setLoading(true);
        try {
            const data = await studentService.getAllStudents();
            setStudent(data);
            setErrorMessage("");
        } catch (err) {
            setErrorMessage("Failed to load students list.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const handleSearch = async () => {
        if (!searchTz) {
            loadStudents();
            return;
        }
        setLoading(true);
        try {
            const res = await studentService.getStudentByTz(searchTz);
            setStudent([res]);
            setErrorMessage("");
        } catch (err) {
            setErrorMessage("Student not found.");
            setStudent([]);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div id="root" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="table-container" style={{ width: '100%', maxWidth: '850px' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '30px' }}>Student Management</h2>
                <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    marginBottom: '25px',
                    padding: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px'
                }}>
                    <input 
                        type="text" 
                        placeholder="Search by ID Number..." 
                        value={searchTz}
                        onChange={(e) => setSearchTz(e.target.value)}
                        style={{ flex: 1, background: '#222', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '5px' }}
                    />
                    <button onClick={handleSearch} style={{ minWidth: '100px', height: '45px' }}>SEARCH</button>
                    <button onClick={() => {setSearchTz(""); loadStudents();}} style={{ height: '45px', backgroundColor: '#444' }}>RESET</button>
                </div>
                {loading && <div style={{ color: 'var(--primary)', textAlign: 'center', marginBottom: '15px' }}>Loading...</div>}
                {errorMessage && <div style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px' }}>{errorMessage}</div>}
                <table className="styled-table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '25%', textAlign: 'center' }}>ID Number</th>
                            <th style={{ width: '35%', textAlign: 'center' }}>Full Name</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Grade</th>
                            <th style={{ width: '25%', textAlign: 'center' }}>Teacher ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.id || student.tz}>
                                    <td style={{ textAlign: 'center' }}>{student.tz}</td>
                                    <td style={{ textAlign: 'center', fontWeight: '500' }}>{student.fullName}</td>
                                    <td style={{ textAlign: 'center' }}>{student.grade}</td>
                                    <td style={{ textAlign: 'center', color: 'var(--primary)' }}>{student.teacherTz || '---'}</td>
                                </tr>
                            ))
                        ) : (
                            !loading && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>No students found in the system.</td></tr>
                        )}
                    </tbody>
                </table>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button 
                        onClick={() => navigate('/add-student')}
                        style={{ 
                            padding: '12px 25px', 
                            borderRadius: '30px', 
                            border: '1px solid var(--primary)', 
                            background: 'transparent', 
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        + ADD NEW STUDENT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentList;