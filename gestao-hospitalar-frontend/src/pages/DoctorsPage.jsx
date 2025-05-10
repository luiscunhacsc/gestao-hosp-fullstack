import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import api from '../api/api';

const specialtyOptions = [
  { label: 'Cardiology', value: 'CARDIOLOGY' },
  { label: 'Dermatology', value: 'DERMATOLOGY' },
  { label: 'Neurology', value: 'NEUROLOGY' },
  { label: 'Pediatrics', value: 'PEDIATRICS' },
  { label: 'General Surgery', value: 'GENERAL_SURGERY' },
  { label: 'Psychiatry', value: 'PSYCHIATRY' },
  { label: 'Other', value: 'OTHER' }
];

const emptyDoctor = {
  name: '',
  specialty: '',
  phone: '',
  email: '',
  nif: '',
  address: '',
  licenseNumber: ''
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(emptyDoctor);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await api.get('/doctors');
    setDoctors(res.data);
  };

  const openNew = () => {
    setDoctor(emptyDoctor);
    setIsEdit(false);
    setDialogVisible(true);
  };

  const openEdit = (rowData) => {
    setDoctor({ ...rowData });
    setIsEdit(true);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const saveDoctor = async () => {
    if (isEdit) {
      await api.put(`/doctors/${doctor.id}`, doctor);
    } else {
      await api.post('/doctors', doctor);
    }
    fetchDoctors();
    setDialogVisible(false);
  };

  const deleteDoctor = async (rowData) => {
    await api.delete(`/doctors/${rowData.id}`);
    fetchDoctors();
  };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4" style={{ borderBottom: '1px solid #e3e9f1', paddingBottom: 10 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, color: '#1a355e', margin: 0 }}>Doctors</h2>
        <Button 
          label="Add Doctor" 
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
        value={doctors} 
        paginator 
        rows={10} 
        dataKey="id" 
        responsiveLayout="scroll"
        emptyMessage={<div style={{ textAlign: 'center', padding: 40, color: '#8fa3bf' }}>
          <i className="pi pi-user-md" style={{ fontSize: 48, marginBottom: 16, color: '#d0e2ff' }}></i>
          <div style={{ fontSize: 20, fontWeight: 500 }}>No doctors yet</div>
          <div style={{ marginTop: 8 }}>Click <b>Add Doctor</b> to create one.</div>
        </div>}
      >
        <Column field="name" header="Name" sortable />
        <Column field="specialty" header="Specialty" sortable />
        <Column field="phone" header="Phone" />
        <Column field="email" header="Email" />
        <Column field="nif" header="NIF" />
        <Column field="address" header="Address" />
        <Column field="licenseNumber" header="License Number" />
        <Column
          body={(rowData) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-text p-mr-2" onClick={() => openEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => deleteDoctor(rowData)} />
            </>
          )}
          header="Actions"
        />
      </DataTable>

      <Dialog visible={dialogVisible} style={{ width: '450px' }} header={isEdit ? 'Edit Doctor' : 'New Doctor'} modal className="p-fluid" footer={
        <>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveDoctor} />
        </>
      } onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={doctor.name} onChange={e => setDoctor({ ...doctor, name: e.target.value })} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="specialty">Specialty</label>
          <Dropdown id="specialty" value={doctor.specialty} options={specialtyOptions} onChange={e => setDoctor({ ...doctor, specialty: e.value })} placeholder="Select Specialty" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <InputText id="phone" value={doctor.phone} onChange={e => setDoctor({ ...doctor, phone: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={doctor.email} onChange={e => setDoctor({ ...doctor, email: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="nif">NIF</label>
          <InputText id="nif" value={doctor.nif} onChange={e => setDoctor({ ...doctor, nif: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="address">Address</label>
          <InputText id="address" value={doctor.address} onChange={e => setDoctor({ ...doctor, address: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="licenseNumber">License Number</label>
          <InputText id="licenseNumber" value={doctor.licenseNumber} onChange={e => setDoctor({ ...doctor, licenseNumber: e.target.value })} required />
        </div>
      </Dialog>
    </div>
  );
}
