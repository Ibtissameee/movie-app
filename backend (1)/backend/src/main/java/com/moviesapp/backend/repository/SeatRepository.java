package com.moviesapp.backend.repository;

import com.moviesapp.backend.model.Seat;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface SeatRepository extends R2dbcRepository<Seat, Long> {
}
