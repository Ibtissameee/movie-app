package com.moviesapp.backend.service;

import com.moviesapp.backend.model.Movie;
import com.moviesapp.backend.repository.MovieDetailsRepository;
import com.moviesapp.backend.repository.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
@Service
public class MovieServiceImpl implements MovieService{
    @Autowired
    private MovieRepository movieRepository;

   /* @Autowired
    private MovieDetailsRepository movieDetailsRepository;
    @Autowired
    private MovieDetailsService movieDetailsService;*/
    @Override
    public Mono<Movie> saveMovie(Movie movie) {
        if (movie != null) {

            return movieRepository.save(movie);

        } else {
            // If no movieDetailsId is provided, save the movie without details
            return Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST, "MovieDetails must not be null"));
        }
    }

    @Override
    public Mono<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    @Override
    public Flux<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
}
