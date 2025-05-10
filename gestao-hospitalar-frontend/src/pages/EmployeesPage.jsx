import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import api from '../api/api';

const emptyEmployee = {
  name: '',
  position: '',
  phone: '',
  email: '',
  nif: '',
  address: ''
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(emptyEmployee);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await api.get('/employees');
    setEmployees(res.data);
  };
  const openNew = () => {
    setEmployee(emptyEmployee);
    setIsEdit(false);
    setDialogVisible(true);
  };
  const openEdit = (rowData) => {
    setEmployee({ ...rowData });
    setIsEdit(true);
    setDialogVisible(true);
  };
  const hideDialog = () => {
    setDialogVisible(false);
  };
  const saveEmployee = async () => {
    if (isEdit) {
      await api.put(`/employees/${employee.id}`, employee);
    } else {
      await api.post('/employees', employee);
    }
    fetchEmployees();
    setDialogVisible(false);
  };
  const deleteEmployee = async (rowData) => {
    await api.delete(`/employees/${rowData.id}`);
    fetchEmployees();
  };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4" style={{ borderBottom: '1px solid #e3e9f1', paddingBottom: 10 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, color: '#1a355e', margin: 0 }}>Employees</h2>
        <Button 
          label="Add Employee" 
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
        value={employees} 
        paginator 
        rows={10} 
        dataKey="id" 
        responsiveLayout="scroll"
        emptyMessage={<div style={{ textAlign: 'center', padding: 40, color: '#8fa3bf' }}>
          <i className="pi pi-id-card" style={{ fontSize: 48, marginBottom: 16, color: '#d0e2ff' }}></i>
          <div style={{ fontSize: 20, fontWeight: 500 }}>No employees yet</div>
          <div style={{ marginTop: 8 }}>Click <b>Add Employee</b> to create one.</div>
        </div>}
      >
        <Column field="name" header="Name" sortable />
        <Column field="position" header="Position" sortable />
        <Column field="phone" header="Phone" />
        <Column field="email" header="Email" />
        <Column field="nif" header="NIF" />
        <Column field="address" header="Address" />
        <Column
          body={(rowData) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-text p-mr-2" onClick={() => openEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => deleteEmployee(rowData)} />
            </>
          )}
          header="Actions"
        />
      </DataTable>

      <Dialog visible={dialogVisible} style={{ width: '450px' }} header={isEdit ? 'Edit Employee' : 'New Employee'} modal className="p-fluid" footer={
        <>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveEmployee} />
        </>
      } onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={employee.name} onChange={e => setEmployee({ ...employee, name: e.target.value })} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="position">Position</label>
          <InputText id="position" value={employee.position} onChange={e => setEmployee({ ...employee, position: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <InputText id="phone" value={employee.phone} onChange={e => setEmployee({ ...employee, phone: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={employee.email} onChange={e => setEmployee({ ...employee, email: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="nif">NIF</label>
          <InputText id="nif" value={employee.nif} onChange={e => setEmployee({ ...employee, nif: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="address">Address</label>
          <InputText id="address" value={employee.address} onChange={e => setEmployee({ ...employee, address: e.target.value })} />
        </div>
      </Dialog>
    </div>
  );
}
