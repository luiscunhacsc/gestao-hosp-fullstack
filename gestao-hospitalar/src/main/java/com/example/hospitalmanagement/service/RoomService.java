package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.model.Room;
import com.example.hospitalmanagement.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room updatedRoom) {
        updatedRoom.setId(id);
        return roomRepository.save(updatedRoom);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
