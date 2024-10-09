package com.moviesapp.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

@Table("tickets")
@Data
public class Ticket {
    @Id
    private Long id;
    private Long movieId;
    private String userId;
    private String selectedSeats;
    private String bookingDate;
}
