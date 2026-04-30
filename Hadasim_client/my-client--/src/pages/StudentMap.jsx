
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import locationService from '../services/locationService';
import LocationSimulator from './LocationSimulator';


const createCustomIcon = (isFar, isAdmin) => {
    const statusClass = (isFar && !isAdmin) ? 'far' : 'near';
    return new L.DivIcon({
        className: 'custom-leaflet-icon',
        html: `
            <div class="marker-container ${statusClass}">
                <div class="marker-dot"></div>
                ${(isFar && !isAdmin) ? '<div class="marker-pulse"></div>' : ''}
            </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};
const MapFocusHandler = ({ targetPos }) => {
    const map = useMap();
    useEffect(() => {
        if (targetPos) map.flyTo(targetPos, 16, { duration: 2 });
    }, [targetPos, map]);
    return null;
};
const StdudentMap = () => {
    const [locations, setLocations] = useState([]);
    const [distantIds, setDistantIds] = useState([]);
    const [searchId, setSearchId] = useState(""); 
    const [focusPos, setFocusPos] = useState(null); 
    const [userRole, setUserRole] = useState("");
    const loadData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const myTz = user?.tz;
            const role = user?.role;
            setUserRole(role);
            const allData = await locationService.getAllLocations();
            setLocations(allData || []);
            if (role === 'TEACHER' && myTz) {
                const farData = await locationService.getDistantStudents(myTz);
                setDistantIds(farData.map(s => s.tz));
            } else {
                setDistantIds([]);
            }
        } catch (err) {
            console.error("Failed to load map data", err);
        }
    };
    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = () => {
        const student = locations.find(loc => loc.tz === searchId);
        if (student) setFocusPos([student.lat, student.lon]);
    };
    const isAdmin = userRole === 'ADMIN';
    return (
        <div style={{ direction: 'ltr', padding: '20px', backgroundColor: '#121212', minHeight: '100vh' }}>
            <style>{`
                .leaflet-tooltip { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
                .leaflet-tooltip::before { display: none !important; }
                .marker-container { position: relative; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; }
                .marker-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; z-index: 2; box-shadow: 0 0 5px rgba(0,0,0,0.5); }
                .near .marker-dot { background-color: #2196F3; }
                .far .marker-dot { background-color: #ff4d4d; }
                .marker-pulse {
                    position: absolute; width: 12px; height: 12px; border-radius: 50%;
                    background-color: #ff4d4d; opacity: 0.6;
                    animation: pulse-ring 1.5s infinite;
                }
                @keyframes pulse-ring { 0% { transform: scale(.33); } 80%, 100% { opacity: 0; transform: scale(3); } }
            `}</style>
            
            <LocationSimulator />

            <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <input 
                    type="text" 
                    placeholder="Search Student ID..." 
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff', width: '250px' }}
                />
                <button onClick={handleSearch} style={{ padding: '12px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    🔍 Focus
                </button>
                {!isAdmin && (
                    <div style={{ padding: '10px 15px', borderRadius: '8px', backgroundColor: distantIds.length > 0 ? 'rgba(255, 77, 77, 0.1)' : 'rgba(76, 175, 80, 0.1)', color: distantIds.length > 0 ? '#ff4d4d' : '#4CAF50', fontWeight: 'bold', border: `1px solid ${distantIds.length > 0 ? '#ff4d4d' : '#4CAF50'}` }}>
                        {distantIds.length > 0 ? ` ALERT: ${distantIds.length} students out of range` : " All students are close"}
                    </div>
                )}
                {isAdmin && (
                    <div style={{ padding: '10px 15px', borderRadius: '8px', backgroundColor: 'rgba(33, 150, 243, 0.1)', color: '#2196F3', fontWeight: 'bold', border: '1px solid #2196F3' }}>
                        🌐 Admin View: Monitoring {locations.length} total users
                    </div>
                )}
            </div>
            <div style={{ height: '700px', width: '100%', borderRadius: '20px', overflow: 'hidden', border: '2px solid #333' }}>
                <MapContainer center={[31.49, 34.76]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" attribution='&copy; Google' />
                    <MapFocusHandler targetPos={focusPos} />

                    <MarkerClusterGroup maxClusterRadius={40}>
                        {locations.map((loc) => {
                            if (!loc.tz || (loc.lat === 0 && loc.lon === 0)) return null;
                            const isFar = !isAdmin && distantIds.includes(loc.tz);
                            return (
                                <Marker 
                                    key={loc.tz} 
                                    position={[loc.lat, loc.lon]} 
                                    icon={createCustomIcon(isFar, isAdmin)}
                                >
                                    <Tooltip permanent={true} direction="top" offset={[0, -10]}>
                                        <div style={{ 
                                            backgroundColor: isFar ? '#ff4d4d' : '#2196F3', 
                                            color: 'white', padding: '4px 10px', borderRadius: '20px', 
                                            fontWeight: 'bold', fontSize: '11px', border: '2px solid white'
                                        }}>
                                            {isFar ? "🚨 " : "👤 "}{loc.tz}
                                        </div>
                                    </Tooltip>
                                </Marker>
                            );
                        })}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </div>
    );
};

export default StdudentMap;