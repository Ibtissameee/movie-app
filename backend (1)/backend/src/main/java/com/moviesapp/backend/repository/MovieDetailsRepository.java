package com.moviesapp.backend.repository;

import com.moviesapp.backend.model.Movie;
import com.moviesapp.backend.model.MovieDetails;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface MovieDetailsRepository extends ReactiveCrudRepository<MovieDetails, Integer> {

}
