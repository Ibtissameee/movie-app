package com.moviesapp.backend.repository;

import com.moviesapp.backend.model.Ticket;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

public interface TicketRepository extends R2dbcRepository<Ticket, Long> {

}
