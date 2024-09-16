package com.moviesapp.backend.repository;

import com.moviesapp.backend.model.Movie;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

public interface MovieRepository extends R2dbcRepository<Movie, Long> {



}
