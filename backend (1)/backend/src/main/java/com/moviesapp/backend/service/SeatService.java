package com.moviesapp.backend.service;

import com.moviesapp.backend.model.Seat;
import com.moviesapp.backend.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    public Flux<Seat> getAllSeats(){
        return seatRepository.findAll();
    }
}
