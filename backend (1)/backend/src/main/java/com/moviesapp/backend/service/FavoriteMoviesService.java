package com.moviesapp.backend.service;

import com.moviesapp.backend.keycloak.KeycloakUserService;
import com.moviesapp.backend.model.FavoriteMovies;
import com.moviesapp.backend.model.Movie;
import com.moviesapp.backend.repository.FavoriteMoviesRepository;
import com.moviesapp.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class FavoriteMoviesService {

    @Autowired
    private FavoriteMoviesRepository favoriteMoviesRepository;

    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private KeycloakUserService keycloakUserService;

    public Mono<FavoriteMovies> addFavoriteMovie(Long movieId) {
        return keycloakUserService.getCurrentUserId()
                .flatMap(currentUserId -> {
                    FavoriteMovies favoriteMovie = new FavoriteMovies();
                    favoriteMovie.setUserId(currentUserId);  // Use the resolved String value for userId
                    favoriteMovie.setMovieId(movieId);
                    return favoriteMoviesRepository.save(favoriteMovie);
                });
    }
    public Flux<Movie> getFavoriteMoviesForCurrentUser() {
        return keycloakUserService.getCurrentUserId()
                .flatMapMany(currentUserId -> favoriteMoviesRepository.findByUserId(currentUserId)
                        .flatMap(favoriteMovie -> movieRepository.findById(favoriteMovie.getMovieId())));

    }

    public Mono<Void> removeFavoriteMovie( Long movieId) {
        return keycloakUserService.getCurrentUserId()
                .flatMap(currentUserId -> favoriteMoviesRepository.deleteByUserIdAndMovieId(currentUserId, movieId));

    }

}
