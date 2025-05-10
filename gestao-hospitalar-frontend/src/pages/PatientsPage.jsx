import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import api from '../api/api';

const genderOptions = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
];

const emptyPatient = {
  name: '',
  birthDate: '',
  gender: '',
  phone: '',
  email: '',
  nif: '',
  address: '',
  healthNumber: ''
};

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(emptyPatient);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await api.get('/patients');
    setPatients(res.data);
  };

  const openNew = () => {
    setPatient(emptyPatient);
    setIsEdit(false);
    setDialogVisible(true);
  };

  const openEdit = (rowData) => {
    setPatient({ ...rowData, birthDate: rowData.birthDate });
    setIsEdit(true);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const savePatient = async () => {
    if (isEdit) {
      await api.put(`/patients/${patient.id}`, patient);
    } else {
      await api.post('/patients', patient);
    }
    fetchPatients();
    setDialogVisible(false);
  };

  const deletePatient = async (rowData) => {
    await api.delete(`/patients/${rowData.id}`);
    fetchPatients();
  };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4" style={{ borderBottom: '1px solid #e3e9f1', paddingBottom: 10 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, color: '#1a355e', margin: 0 }}>Patients</h2>
        <Button 
          label="Add Patient" 
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
        value={patients} 
        paginator 
        rows={10} 
        dataKey="id" 
        responsiveLayout="scroll"
        emptyMessage={<div style={{ textAlign: 'center', padding: 40, color: '#8fa3bf' }}>
          <i className="pi pi-users" style={{ fontSize: 48, marginBottom: 16, color: '#d0e2ff' }}></i>
          <div style={{ fontSize: 20, fontWeight: 500 }}>No patients yet</div>
          <div style={{ marginTop: 8 }}>Click <b>Add Patient</b> to create one.</div>
        </div>}
      >
        <Column field="name" header="Name" sortable />
        <Column field="birthDate" header="Birth Date" sortable />
        <Column field="gender" header="Gender" sortable />
        <Column field="phone" header="Phone" />
        <Column field="email" header="Email" />
        <Column field="nif" header="NIF" />
        <Column field="address" header="Address" />
        <Column field="healthNumber" header="Health Number" />
        <Column
          body={(rowData) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-text p-mr-2" onClick={() => openEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => deletePatient(rowData)} />
            </>
          )}
          header="Actions"
        />
      </DataTable>

      <Dialog visible={dialogVisible} style={{ width: '450px' }} header={isEdit ? 'Edit Patient' : 'New Patient'} modal className="p-fluid" footer={
        <>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={savePatient} />
        </>
      } onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={patient.name} onChange={e => setPatient({ ...patient, name: e.target.value })} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="birthDate">Birth Date</label>
          <InputText id="birthDate" value={patient.birthDate} onChange={e => setPatient({ ...patient, birthDate: e.target.value })} required placeholder="YYYY-MM-DD" />
        </div>
        <div className="field">
          <label htmlFor="gender">Gender</label>
          <Dropdown id="gender" value={patient.gender} options={genderOptions} onChange={e => setPatient({ ...patient, gender: e.value })} placeholder="Select Gender" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <InputText id="phone" value={patient.phone} onChange={e => setPatient({ ...patient, phone: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={patient.email} onChange={e => setPatient({ ...patient, email: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="nif">NIF</label>
          <InputText id="nif" value={patient.nif} onChange={e => setPatient({ ...patient, nif: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="address">Address</label>
          <InputText id="address" value={patient.address} onChange={e => setPatient({ ...patient, address: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="healthNumber">Health Number</label>
          <InputText id="healthNumber" value={patient.healthNumber} onChange={e => setPatient({ ...patient, healthNumber: e.target.value })} required />
        </div>
      </Dialog>
    </div>
  );
}
