package com.moviesapp.backend.service;

import com.moviesapp.backend.keycloak.KeycloakUserService;
import com.moviesapp.backend.model.FavoriteMovies;
import com.moviesapp.backend.model.Ticket;
import com.moviesapp.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private KeycloakUserService keycloakUserService;


    public Mono<Ticket> saveTicket(Ticket ticket){
        return keycloakUserService.getCurrentUserId()
                .flatMap(currentUserId -> {

                    ticket.setUserId(currentUserId);
                    return ticketRepository.save(ticket);
                });
    }
}
