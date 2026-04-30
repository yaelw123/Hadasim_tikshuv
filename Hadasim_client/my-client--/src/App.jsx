import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import LoginPage from './pages/LoginPage';
import TeacherListPage from './pages/TeacherListPage';
import StudentList from './pages/StudentList'; 
import AddStudent from './pages/AddStudent';
import AddTeacher from './pages/AddTeacher';
import StdudentMap from './pages/StudentMap';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("user"));
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}

      <div className="container" style={{ paddingTop: '30px' }}>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/teachers" />} />
          <Route path="/teachers" element={isAuthenticated ? <TeacherListPage /> : <Navigate to="/" />} />
          <Route path="/add-teacher" element={isAuthenticated ? <AddTeacher /> : <Navigate to="/" />} />
          
          <Route path="/students" element={isAuthenticated ? <StudentList /> : <Navigate to="/" />} />
          <Route path="/add-student" element={isAuthenticated ? <AddStudent /> : <Navigate to="/" />} />

          <Route path="/map" element={isAuthenticated ? <StdudentMap /> : <Navigate to="/" />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;