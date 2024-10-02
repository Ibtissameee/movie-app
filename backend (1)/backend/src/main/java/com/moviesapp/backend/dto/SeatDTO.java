package com.moviesapp.backend.dto;

import lombok.Data;

@Data
public class SeatDTO {
    private Long id;

    private String rowNumber;

    private int columnNumber;

    private boolean isOccupied;
}
