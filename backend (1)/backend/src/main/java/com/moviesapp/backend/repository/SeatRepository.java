package com.moviesapp.backend.repository;

import com.moviesapp.backend.model.Seat;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Mono;

public interface SeatRepository extends R2dbcRepository<Seat, Long> {

    Mono<Seat> findByRowNumberAndColumnNumber(String rowNumber, int columnNumber);
}
