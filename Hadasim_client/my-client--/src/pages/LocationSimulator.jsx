
import React, { useState, useEffect } from 'react';
import locationService from '../services/locationService';
import studentService from '../services/studentService'; 
const LocationSimulator = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null)
    const updateAllStudents = async () => {
        try {
            const students = await studentService.getAllStudents();    
            if (!students || students.length === 0) return;
            const updatePromises = students.map(student => {
                const baseLat = 31.5;
                const baseLon = 34.8;
                const lat = baseLat + (Math.random() - 0.5) * 0.1;
                const lon = baseLon + (Math.random() - 0.5) * 0.1;
                const mockDeviceData = {
                    ID: student.tz, 
                    Coordinates: {
                        Longitude: {
                            Degrees: Math.floor(lon).toString(),
                            Minutes: Math.floor((lon % 1) * 60).toString(),
                            Seconds: Math.floor(((lon % 1) * 3600) % 60).toString()
                        },
                        Latitude: {
                            Degrees: Math.floor(lat).toString(),
                            Minutes: Math.floor((lat % 1) * 60).toString(),
                            Seconds: Math.floor(((lat % 1) * 3600) % 60).toString()
                        }
                    },
                    Time: new Date().toISOString()
                };
                return locationService.updateStudentLocation(mockDeviceData);
            });
            await Promise.all(updatePromises);
            console.log(`updated locations for ${students.length} `);
            
        } catch (err) {
            console.error("Simulation failed", err);
        }
    };
    const toggleSimulator = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
            setIntervalId(null);
        } else {
            updateAllStudents();
            const id = setInterval(updateAllStudents, 60000); 
            setIntervalId(id);
            setIsRunning(true);
        }
    };
    useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);
    return (
        <div style={{ 
            padding: '15px', 
            backgroundColor: '#1a1a1a', 
            borderRadius: '10px', 
            marginBottom: '20px',
            border: '1px solid #333',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#fff', fontSize: '16px' }}>
                System-Wide Simulator
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button 
                    onClick={toggleSimulator}
                    style={{
                        backgroundColor: isRunning ? '#ff4d4d' : '#4CAF50',
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 20px', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {isRunning ? "STOP SIMULATION" : "START ALL STUDENTS MOVEMENT"}
                </button>
                {isRunning && (
                    <span style={{ color: '#4CAF50', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span className="spinner-grow spinner-grow-sm" style={{width: '10px', height: '10px'}}></span>
                        Updating all students every 60s...
                    </span>
                )}
            </div>
        </div>
    );
};

export default LocationSimulator;