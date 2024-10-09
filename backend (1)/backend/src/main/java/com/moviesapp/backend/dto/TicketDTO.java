package com.moviesapp.backend.dto;


import lombok.Data;

import java.util.List;
@Data
public class TicketDTO {
    private Long id;
    private Long movieId;
    private String userId;
    private List<Long> selectedSeats;
}
