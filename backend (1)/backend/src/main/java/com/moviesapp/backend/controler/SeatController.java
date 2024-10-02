package com.moviesapp.backend.controler;

import com.moviesapp.backend.dto.SeatDTO;
import com.moviesapp.backend.mapper.MovieMapper;
import com.moviesapp.backend.mapper.SeatMapper;
import com.moviesapp.backend.model.Seat;
import com.moviesapp.backend.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

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
}
