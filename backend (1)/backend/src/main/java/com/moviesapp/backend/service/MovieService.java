package com.moviesapp.backend.service;

import com.moviesapp.backend.model.Movie;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface MovieService {

    public Mono<Movie> saveMovie(Movie movie);

    public Mono<Movie> getMovieById(Long id);

    public Flux<Movie> getAllMovies();
}
