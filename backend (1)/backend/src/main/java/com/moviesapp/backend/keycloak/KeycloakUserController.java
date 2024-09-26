package com.moviesapp.backend.keycloak;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class KeycloakUserController {
    @Autowired
    private KeycloakUserService keycloakUserService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Void> register(@RequestBody UserRepresentation user){
        return keycloakUserService.createUserInKeycloak(user);
    }

    @PostMapping("/login")
    public Mono<String> login(@RequestBody LoginRequest loginRequest){
       return keycloakUserService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
    }

    @PostMapping("/logout")
    public Mono<Void> logout(@RequestHeader("refresh_token") String refreshToken) {
        return keycloakUserService.logoutUser(refreshToken);
    }

}
