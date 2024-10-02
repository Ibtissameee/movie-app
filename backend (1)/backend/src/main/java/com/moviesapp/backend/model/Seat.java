package com.moviesapp.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table(name="seats")
public class Seat {
    @Id
    private Long id;

    private String rowNumber;

    private int columnNumber;

    private boolean isOccupied;
}
