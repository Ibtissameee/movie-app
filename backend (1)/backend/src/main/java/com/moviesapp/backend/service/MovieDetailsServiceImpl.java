package com.moviesapp.backend.service;

import com.moviesapp.backend.model.MovieDetails;
import com.moviesapp.backend.repository.MovieDetailsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
/*@Service
public class MovieDetailsServiceImpl implements MovieDetailsService{

    @Autowired
    private MovieDetailsRepository movieDetailsRepository;
    @Override
    public Mono<MovieDetails> saveMovieDetails(MovieDetails movieDetails) {
        if(movieDetails.getPreviewImgPath()!= null && movieDetails.getBgImgPath() != null
                && movieDetails.getTrailer()!= null && movieDetails.getTitle() != null
                && movieDetails.getReleaseYear()!= 0  && movieDetails.getLength() != null
                && movieDetails.getDate() != null && movieDetails.getCategory() != null
                && movieDetails.getType() != null && movieDetails.getDescription() != null){
            return movieDetailsRepository.save(movieDetails);
        }else {
            return Mono.error(new BadRequestException("All fields of MovieDetails must be provided!"));
        }
    }
}
*/