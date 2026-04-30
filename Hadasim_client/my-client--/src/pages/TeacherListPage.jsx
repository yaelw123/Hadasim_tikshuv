
import React, { useState, useEffect } from 'react';
import teachersService from "../services/teacherService";
import { useNavigate } from 'react-router-dom';

const TeachersListPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudent] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate();
    const [searchTz, setSearchTz] = useState("");
    const currentUser = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        loadTeachers();
    }, []);
    const loadTeachers = async () => {
        setLoading(true);
        try {
            const data = await teachersService.loadTeachers();
            setTeachers(data);
        } catch (err) {
            setErrorMessage("failed loading teachers ");
        } finally {
            setLoading(false);
        }
    };

    const teacherSearch = async (tz) => {
        if (!tz) return loadTeachers();
        setLoading(true);
        try {
            const data = await teachersService.getById(tz);
            setTeachers(data ? [data] : []);
        } catch (err) {
            setErrorMessage("Teacher not found");
            setTeachers([]);
        } finally {
            setLoading(false);
        }
    };

    const studentForTeacher = async (tz) => {
        setLoading(true);
        try {
            const res = await teachersService.getStudentForTeacher(tz);
            setStudent(res);
            setShowModal(true); 
        } catch (err) {
            setErrorMessage("Cannot load students list");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="root" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="table-container" style={{ width: '100%', maxWidth: '850px' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '30px' }}>Teacher Management System</h2>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                    <input
                        type="text"
                        placeholder="Search by ID "
                        value={searchTz}
                        onChange={(e) => setSearchTz(e.target.value)}
                        style={{ flex: 1, background: '#222', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '5px' }}
                    />
                    <button onClick={() => teacherSearch(searchTz)} style={{ minWidth: '100px' }}>SEARCH</button>
                    <button onClick={() => {setSearchTz(""); loadTeachers();}} style={{ backgroundColor: '#444' }}>RESET</button>
                </div>
                <table className="styled-table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '25%', textAlign: 'center' }}>ID Number</th>
                            <th style={{ width: '40%', textAlign: 'center' }}>Full Name</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Grade</th>
                            <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.tz}>
                                <td style={{ textAlign: 'center' }}>{teacher.tz}</td>
                                <td style={{ textAlign: 'center' }}>{teacher.fullName}</td>
                                <td style={{ textAlign: 'center' }}>{teacher.grade}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button className="btn-action" onClick={() => studentForTeacher(teacher.tz)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px',
                        width: '90%', maxWidth: '450px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                            <h3 style={{ color: 'var(--primary)', margin: 0 }}>Students List</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>×</button>
                        </div>
                        
                        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                            {students.length > 0 ? (
                                students.map(s => (
                                    <div key={s.id} style={{ padding: '12px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ color: '#fff', fontWeight: 'bold' }}>{s.fullName}</div>
                                            <div style={{ color: '#666', fontSize: '12px' }}>ID: {s.tz}</div>
                                        </div>
                                        <div style={{ color: 'var(--primary)', fontSize: '13px' }}>Grade: {s.grade}</div>
                                    </div>
                                ))
                            ) : <p style={{ textAlign: 'center', color: '#666' }}>No students found.</p>}
                        </div>
                        <button 
                            onClick={() => setShowModal(false)} 
                            style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: '#fff', borderRadius: '6px', border: 'none' }}
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeachersListPage;