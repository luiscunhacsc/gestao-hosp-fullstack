import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientsPage from './pages/PatientsPage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import RoomsPage from './pages/RoomsPage';
import EmployeesPage from './pages/EmployeesPage';
import HospitalizationsPage from './pages/HospitalizationsPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import ExamsPage from './pages/ExamsPage';
import SidebarMenu from './components/SidebarMenu';
import { Button } from 'primereact/button';
import { useState } from 'react';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <Router>
      <SidebarMenu visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f6fbff' }}>
        <div style={{ position: 'fixed', top: 28, left: 28, zIndex: 110 }}>
          <Button 
            icon="pi pi-bars" 
            className="p-button-rounded p-button-primary shadow-4" 
            style={{ background: '#1976d2', border: 'none', width: 54, height: 54, fontSize: 28, boxShadow: '0 4px 16px #1976d266' }}
            onClick={() => setSidebarVisible(true)} 
            aria-label="Menu" 
          />
        </div>
        <div style={{ flex: 1, marginLeft: 0, padding: '40px 24px 24px 100px', width: '100%' }}>
          <Routes>
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/hospitalizations" element={<HospitalizationsPage />} />
            <Route path="/prescriptions" element={<PrescriptionsPage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="*" element={<div style={{ fontSize: 24, color: '#1976d2', fontWeight: 700, marginTop: 60 }}>Welcome to Hospital Management System</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
