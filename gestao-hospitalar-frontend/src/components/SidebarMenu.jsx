import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Patients', icon: 'pi pi-users', path: '/patients' },
  { label: 'Doctors', icon: 'pi pi-user-md', path: '/doctors' },
  { label: 'Appointments', icon: 'pi pi-calendar', path: '/appointments' },
  { label: 'Rooms', icon: 'pi pi-building', path: '/rooms' },
  { label: 'Employees', icon: 'pi pi-id-card', path: '/employees' },
  { label: 'Hospitalizations', icon: 'pi pi-briefcase', path: '/hospitalizations' },
  { label: 'Prescriptions', icon: 'pi pi-file', path: '/prescriptions' },
  { label: 'Exams', icon: 'pi pi-search', path: '/exams' },
];

export default function SidebarMenu({ visible, onHide }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar visible={visible} onHide={onHide} showCloseIcon={false} style={{ width: '220px', background: '#f4f9fd' }}>
      <div className="mb-4 mt-2 flex align-items-center justify-content-center" style={{ gap: 12 }}>
        <img src="/hospital-logo.png" alt="Hospital Logo" style={{ width: 56, height: 56, borderRadius: 14, background: '#fff', boxShadow: '0 2px 8px #1976d233', objectFit: 'contain' }} />
        <span style={{ fontWeight: 700, fontSize: 22, color: '#1976d2', letterSpacing: 1 }}>Hospital</span>
      </div>
      <div>
        {menuItems.map(item => (
          <Button
            key={item.path}
            label={item.label}
            icon={item.icon}
            className={`p-button-lg w-full mb-2 shadow-2 ${location.pathname === item.path ? 'p-button-primary' : ''}`}
            style={{
              justifyContent: 'flex-start',
              fontWeight: location.pathname === item.path ? 700 : 400,
              background: location.pathname === item.path ? '#1976d2' : '#fff',
              color: location.pathname === item.path ? '#fff' : '#1a355e',
              borderRadius: 8,
              border: location.pathname === item.path ? 'none' : '1.5px solid #e3e9f1',
              boxShadow: location.pathname === item.path ? '0 4px 16px #1976d266' : 'none',
              marginBottom: 12
            }}
            onClick={() => { navigate(item.path); onHide(); }}
          />
        ))}
      </div>
    </Sidebar>
  );
}
