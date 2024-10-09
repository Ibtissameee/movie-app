package com.moviesapp.backend.controler;

import com.moviesapp.backend.dto.SeatDTO;
import com.moviesapp.backend.mapper.MovieMapper;
import com.moviesapp.backend.mapper.SeatMapper;
import com.moviesapp.backend.model.Seat;
import com.moviesapp.backend.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class SeatController {

    @Autowired
    private SeatService seatService;


    @GetMapping("/all-seats")
    public Flux<SeatDTO> getAllSeats(){
        return seatService.getAllSeats()
                .map(SeatMapper::seatEntityToSeatDTO);
    }

    @GetMapping("/occupied-seats")
    public Flux<SeatDTO> getOccupiedSeats(){
        return seatService.getOccupiedSeats()
                .map(SeatMapper::seatEntityToSeatDTO);
    }

    @GetMapping("/seat-id")
    public Mono<Long> getSeatId(@RequestParam String rowNumber, @RequestParam int columnNumber){
        return seatService.getSeatId(rowNumber, columnNumber);

    }

    @PutMapping("/update-seat")
    public Mono<Seat> updateSeat(@RequestParam String rowNumber, @RequestParam int columnNumber){
        return seatService.updateSeat(rowNumber, columnNumber);
    }
}
