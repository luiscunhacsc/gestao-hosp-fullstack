import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import api from '../api/api';

export default function HospitalizationsPage() {
  const [hospitalizations, setHospitalizations] = useState([]);
  const [hospitalization, setHospitalization] = useState({ patientId: '', roomId: '', startDate: '', endDate: '' });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchHospitalizations();
    fetchPatients();
    fetchRooms();
  }, []);

  const fetchHospitalizations = async () => {
    const res = await api.get('/hospitalizations');
    setHospitalizations(res.data);
  };
  const fetchPatients = async () => {
    const res = await api.get('/patients');
    setPatients(res.data);
  };
  const fetchRooms = async () => {
    const res = await api.get('/rooms');
    setRooms(res.data);
  };

  const openNew = () => {
    setHospitalization({ patientId: '', roomId: '', startDate: '', endDate: '' });
    setIsEdit(false);
    setDialogVisible(true);
  };
  const openEdit = (rowData) => {
    setHospitalization({ ...rowData });
    setIsEdit(true);
    setDialogVisible(true);
  };
  const hideDialog = () => {
    setDialogVisible(false);
  };
  const saveHospitalization = async () => {
    if (isEdit) {
      await api.put(`/hospitalizations/${hospitalization.id}`, hospitalization);
    } else {
      await api.post('/hospitalizations', hospitalization);
    }
    fetchHospitalizations();
    setDialogVisible(false);
  };
  const deleteHospitalization = async (rowData) => {
    await api.delete(`/hospitalizations/${rowData.id}`);
    fetchHospitalizations();
  };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4" style={{ borderBottom: '1px solid #e3e9f1', paddingBottom: 10 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, color: '#1a355e', margin: 0 }}>Hospitalizations</h2>
        <Button 
          label="Add Hospitalization" 
          icon="pi pi-plus" 
          onClick={openNew}
          className="p-button-raised p-button-primary shadow-4" 
          style={{ 
            fontWeight: 700, fontSize: 18, padding: '14px 32px', 
            background: '#1976d2', border: 'none', color: '#fff', borderRadius: 10, boxShadow: '0 4px 16px #1976d266'
          }}
        />
      </div>
      <DataTable 
        value={hospitalizations} 
        paginator 
        rows={10} 
        dataKey="id" 
        responsiveLayout="scroll"
        emptyMessage={<div style={{ textAlign: 'center', padding: 40, color: '#8fa3bf' }}>
          <i className="pi pi-briefcase" style={{ fontSize: 48, marginBottom: 16, color: '#d0e2ff' }}></i>
          <div style={{ fontSize: 20, fontWeight: 500 }}>No hospitalizations yet</div>
          <div style={{ marginTop: 8 }}>Click <b>Add Hospitalization</b> to create one.</div>
        </div>}
      >
        <Column field="patientId" header="Patient" body={rowData => patients.find(p => p.id === rowData.patientId)?.name || ''} />
        <Column field="roomId" header="Room" body={rowData => rooms.find(r => r.id === rowData.roomId)?.number || ''} />
        <Column field="startDate" header="Start Date" sortable />
        <Column field="endDate" header="End Date" sortable />
        <Column
          body={(rowData) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-text p-mr-2" onClick={() => openEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => deleteHospitalization(rowData)} />
            </>
          )}
          header="Actions"
        />
      </DataTable>

      <Dialog visible={dialogVisible} style={{ width: '450px' }} header={isEdit ? 'Edit Hospitalization' : 'New Hospitalization'} modal className="p-fluid" footer={
        <>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveHospitalization} />
        </>
      } onHide={hideDialog}>
        <div className="field">
          <label htmlFor="patientId">Patient</label>
          <Dropdown id="patientId" value={hospitalization.patientId} options={patients.map(p => ({ label: p.name, value: p.id }))} onChange={e => setHospitalization({ ...hospitalization, patientId: e.value })} placeholder="Select Patient" />
        </div>
        <div className="field">
          <label htmlFor="roomId">Room</label>
          <Dropdown id="roomId" value={hospitalization.roomId} options={rooms.map(r => ({ label: r.number, value: r.id }))} onChange={e => setHospitalization({ ...hospitalization, roomId: e.value })} placeholder="Select Room" />
        </div>
        <div className="field">
          <label htmlFor="startDate">Start Date</label>
          <Calendar id="startDate" value={hospitalization.startDate} onChange={e => setHospitalization({ ...hospitalization, startDate: e.value })} dateFormat="yy-mm-dd" />
        </div>
        <div className="field">
          <label htmlFor="endDate">End Date</label>
          <Calendar id="endDate" value={hospitalization.endDate} onChange={e => setHospitalization({ ...hospitalization, endDate: e.value })} dateFormat="yy-mm-dd" />
        </div>
      </Dialog>
    </div>
  );
}
