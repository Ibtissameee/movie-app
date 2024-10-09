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

    public Flux<Seat> getOccupiedSeats() {
        return seatRepository.findAll()
                .filter(Seat::isOccupied);
    }

    public Mono<Long> getSeatId(String rowNumber, int columnNumber){
        return seatRepository.findByRowNumberAndColumnNumber(rowNumber, columnNumber)
                .map(Seat::getId)
                .switchIfEmpty(Mono.error(new RuntimeException("Seat Not Found")));
    }

    public Mono<Seat> updateSeat(String rowNumber, int columnNumber){
            return seatRepository.findByRowNumberAndColumnNumber(rowNumber,columnNumber)
                    .flatMap(seat -> {
                        seat.setOccupied(true);
                        return seatRepository.save(seat);
                    });
    }
}
