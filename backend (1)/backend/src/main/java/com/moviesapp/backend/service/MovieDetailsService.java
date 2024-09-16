package com.moviesapp.backend.service;

import com.moviesapp.backend.model.MovieDetails;
import reactor.core.publisher.Mono;

public interface MovieDetailsService {

    public Mono<MovieDetails> saveMovieDetails(MovieDetails movieDetails);
}
