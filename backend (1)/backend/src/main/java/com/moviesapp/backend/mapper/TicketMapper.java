package com.moviesapp.backend.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.moviesapp.backend.dto.SeatDTO;
import com.moviesapp.backend.dto.TicketDTO;
import com.moviesapp.backend.model.Seat;
import com.moviesapp.backend.model.Ticket;

import java.util.List;

public class TicketMapper {
    private static final ObjectMapper objectMapper = new ObjectMapper();


    public static TicketDTO ticketEntityToTicketDTO(Ticket ticket){
        TicketDTO ticketDTO = new TicketDTO();
        ticketDTO.setId(ticket.getId());
        ticketDTO.setMovieId(ticket.getMovieId());
        ticketDTO.setUserId(ticket.getUserId());
        try {
            List<Long> selectedSeats = objectMapper.readValue(ticket.getSelectedSeats(), objectMapper.getTypeFactory().constructCollectionType(List.class, Long.class));
            ticketDTO.setSelectedSeats(selectedSeats);
        } catch (JsonProcessingException e) {
            // Handle the exception as needed
            e.printStackTrace();
        }
        return ticketDTO;

    }

    public static Ticket ticketDTOToTicketEntity(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        ticket.setId(ticketDTO.getId());
        ticket.setMovieId(ticketDTO.getMovieId());
        ticket.setUserId(ticketDTO.getUserId());
        // Serialize the selected seat IDs from a list to a JSON string
        try {
            String selectedSeatsJson = objectMapper.writeValueAsString(ticketDTO.getSelectedSeats());
            ticket.setSelectedSeats(selectedSeatsJson);
        } catch (JsonProcessingException e) {
            // Handle the exception as needed
            e.printStackTrace();
        }
        return ticket;
    }
}
