package com.moviesapp.backend.controler;

import com.moviesapp.backend.model.FavoriteMovies;
import com.moviesapp.backend.model.Movie;
import com.moviesapp.backend.service.FavoriteMoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000")

public class FavoriteMoviesController {
    @Autowired
    private FavoriteMoviesService favoriteMoviesService;

    @PostMapping("/add-favorite-movie")
    public Mono<FavoriteMovies> addFavoriteMovie(@RequestBody Long movieId) {
        return favoriteMoviesService.addFavoriteMovie(movieId);
    }

    @GetMapping("/all-favorite-movies")
    public Flux<Movie> getFavoriteMovies() {
        return favoriteMoviesService.getFavoriteMoviesForCurrentUser();
    }

    @DeleteMapping("/delete-favorite-movie")
    public Mono<Void> removeFavoriteMovie(@RequestBody Long movieId) {
        return favoriteMoviesService.removeFavoriteMovie(movieId);
    }
}
