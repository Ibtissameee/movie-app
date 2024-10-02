package com.moviesapp.backend.repository;

import com.moviesapp.backend.model.FavoriteMovies;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FavoriteMoviesRepository extends ReactiveCrudRepository<FavoriteMovies, String> {

    Flux<FavoriteMovies> findByUserId(String userId);

    Mono<Void> deleteByUserIdAndMovieId(String userId, Long movieId);
}
