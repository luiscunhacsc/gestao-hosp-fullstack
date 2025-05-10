import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import api from '../api/api';

const emptyRoom = {
  number: '',
  type: '',
  floor: '',
  capacity: ''
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(emptyRoom);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await api.get('/rooms');
    setRooms(res.data);
  };
  const openNew = () => {
    setRoom(emptyRoom);
    setIsEdit(false);
    setDialogVisible(true);
  };
  const openEdit = (rowData) => {
    setRoom({ ...rowData });
    setIsEdit(true);
    setDialogVisible(true);
  };
  const hideDialog = () => {
    setDialogVisible(false);
  };
  const saveRoom = async () => {
    if (isEdit) {
      await api.put(`/rooms/${room.id}`, room);
    } else {
      await api.post('/rooms', room);
    }
    fetchRooms();
    setDialogVisible(false);
  };
  const deleteRoom = async (rowData) => {
    await api.delete(`/rooms/${rowData.id}`);
    fetchRooms();
  };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4" style={{ borderBottom: '1px solid #e3e9f1', paddingBottom: 10 }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, color: '#1a355e', margin: 0 }}>Rooms</h2>
        <Button 
          label="Add Room" 
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
        value={rooms} 
        paginator 
        rows={10} 
        dataKey="id" 
        responsiveLayout="scroll"
        emptyMessage={<div style={{ textAlign: 'center', padding: 40, color: '#8fa3bf' }}>
          <i className="pi pi-building" style={{ fontSize: 48, marginBottom: 16, color: '#d0e2ff' }}></i>
          <div style={{ fontSize: 20, fontWeight: 500 }}>No rooms yet</div>
          <div style={{ marginTop: 8 }}>Click <b>Add Room</b> to create one.</div>
        </div>}
      >
        <Column field="number" header="Number" sortable />
        <Column field="type" header="Type" sortable />
        <Column field="floor" header="Floor" />
        <Column field="capacity" header="Capacity" />
        <Column
          body={(rowData) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-text p-mr-2" onClick={() => openEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => deleteRoom(rowData)} />
            </>
          )}
          header="Actions"
        />
      </DataTable>

      <Dialog visible={dialogVisible} style={{ width: '450px' }} header={isEdit ? 'Edit Room' : 'New Room'} modal className="p-fluid" footer={
        <>
          <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveRoom} />
        </>
      } onHide={hideDialog}>
        <div className="field">
          <label htmlFor="number">Number</label>
          <InputText id="number" value={room.number} onChange={e => setRoom({ ...room, number: e.target.value })} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="type">Type</label>
          <InputText id="type" value={room.type} onChange={e => setRoom({ ...room, type: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="floor">Floor</label>
          <InputText id="floor" value={room.floor} onChange={e => setRoom({ ...room, floor: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="capacity">Capacity</label>
          <InputText id="capacity" value={room.capacity} onChange={e => setRoom({ ...room, capacity: e.target.value })} />
        </div>
      </Dialog>
    </div>
  );
}
