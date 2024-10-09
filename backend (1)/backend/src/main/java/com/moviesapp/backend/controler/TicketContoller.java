package com.moviesapp.backend.controler;

import com.moviesapp.backend.dto.TicketDTO;
import com.moviesapp.backend.mapper.TicketMapper;
import com.moviesapp.backend.model.Ticket;
import com.moviesapp.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/movies")
@CrossOrigin("http://localhost:3000")
public class TicketContoller {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/create-ticket")
    public Mono<Ticket> createTicket(@RequestBody TicketDTO ticketDTO){
        Ticket ticket = TicketMapper.ticketDTOToTicketEntity(ticketDTO);
        return ticketService.saveTicket(ticket);
    }

}
