import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import api from '../api/api';

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState({ appointmentId: '', doctorId: '', type: '', result: '' });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchExams();
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchExams = async () => {
    const res = await api.get('/exams');
    setExams(res.data);
  };
  const fetchAppointments = async () => {
    const res = await api.get('/appointments');
    setAppointments(res.data);
  };
  const fetchDoctors = async () => {
    const res = await api.get('/doctors');
    setDoctors(res.data);
  };

  const openNew = () => {
    setExam({ appointmentId: '', doctorId: '', type: '', result: '' });
    setIsEdit(false);
    setDialogVisible(true);
  };
  const openEdit = (rowData) => {
    setExam({ ...rowData });
    setIsEdit(true);
    setDialogVisible(true);
  };
  const hideDialog = () => {
    setDialogVisible(false);
  };
  const saveExam = async () => {
    if (isEdit) {
      await api.put(`/exams/${exam.id}`, exam);
    } else {
      await api.post('/exams', exam);
    }
    fetchExams();
    setDialogVisible(false);
  };
  const deleteExam = async (rowData) => {
    await api.delete(`/exams/${rowData.id}`);
    fetchExams();
  };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4" style={{ borderBottom: '1px solid #e3e9f1', paddingBottom: 10 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, color: '#1a355e', margin: 0 }}>Exams</h2>
        <Button 
          label="Add Exam" 
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
        value={exams} 
        paginator 
        rows={10} 
        dataKey="id" 
        responsiveLayout="scroll"
        emptyMessage={<div style={{ textAlign: 'center', padding: 40, color: '#8fa3bf' }}>
          <i className="pi pi-search" style={{ fontSize: 48, marginBottom: 16, color: '#d0e2ff' }}></i>
          <div style={{ fontSize: 20, fontWeight: 500 }}>No exams yet</div>
          <div style={{ marginTop: 8 }}>Click <b>Add Exam</b> to create one.</div>
        </div>}
      >
        <Column field="appointmentId" header="Appointment" body={rowData => appointments.find(a => a.id === rowData.appointmentId)?.id || ''} />
        <Column field="doctorId" header="Doctor" body={rowData => doctors.find(d => d.id === rowData.doctorId)?.name || ''} />
        <Column field="type" header="Type" sortable />
        <Column field="result" header="Result" />
        <Column
          body={(rowData) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-text p-mr-2" onClick={() => openEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => deleteExam(rowData)} />
            </>
          )}
          header="Actions"
        />
      </DataTable>

      <Dialog visible={dialogVisible} style={{ width: '450px' }} header={isEdit ? 'Edit Exam' : 'New Exam'} modal className="p-fluid" footer={
        <>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveExam} />
        </>
      } onHide={hideDialog}>
        <div className="field">
          <label htmlFor="appointmentId">Appointment</label>
          <Dropdown id="appointmentId" value={exam.appointmentId} options={appointments.map(a => ({ label: a.id, value: a.id }))} onChange={e => setExam({ ...exam, appointmentId: e.value })} placeholder="Select Appointment" />
        </div>
        <div className="field">
          <label htmlFor="doctorId">Doctor</label>
          <Dropdown id="doctorId" value={exam.doctorId} options={doctors.map(d => ({ label: d.name, value: d.id }))} onChange={e => setExam({ ...exam, doctorId: e.value })} placeholder="Select Doctor" />
        </div>
        <div className="field">
          <label htmlFor="type">Type</label>
          <InputText id="type" value={exam.type} onChange={e => setExam({ ...exam, type: e.target.value })} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="result">Result</label>
          <InputText id="result" value={exam.result} onChange={e => setExam({ ...exam, result: e.target.value })} />
        </div>
      </Dialog>
    </div>
  );
}
