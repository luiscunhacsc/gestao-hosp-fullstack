package com.example.hospitalmanagement.repository;

import com.example.hospitalmanagement.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
