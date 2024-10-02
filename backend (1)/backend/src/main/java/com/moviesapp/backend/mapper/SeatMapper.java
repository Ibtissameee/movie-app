package com.moviesapp.backend.mapper;

import com.moviesapp.backend.dto.SeatDTO;
import com.moviesapp.backend.model.Seat;

public class SeatMapper {

    public static SeatDTO seatEntityToSeatDTO(Seat seat){
        SeatDTO seatDTO = new SeatDTO();
        seatDTO.setId(seat.getId());
        seatDTO.setRowNumber(seat.getRowNumber());
        seatDTO.setColumnNumber(seat.getColumnNumber());
        seatDTO.setOccupied(seat.isOccupied());
        return seatDTO;

    }

    public static Seat seatDTOToSeatEntity(SeatDTO seatDTO){
        Seat seat = new Seat();
        seat.setId(seatDTO.getId());
        seat.setRowNumber(seatDTO.getRowNumber());
        seat.setColumnNumber(seatDTO.getColumnNumber());
        seat.setOccupied(seatDTO.isOccupied());
        return seat;

    }
}
