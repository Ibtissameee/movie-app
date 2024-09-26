package com.moviesapp.backend.mapper;

import com.moviesapp.backend.dto.MovieDTO;
import com.moviesapp.backend.model.Movie;
import org.apache.logging.log4j.util.Base64Util;


import java.util.Base64;

public class MovieMapper {

    public static MovieDTO movieEntityToMovieDTO(Movie movie){
        MovieDTO movieDTO = new MovieDTO();
            movieDTO.setId(movie.getId());
        if(movie.getPreviewImgPath() != null){
            String previewImgBase64 = Base64.getEncoder().encodeToString(movie.getPreviewImgPath());
            movieDTO.setPreviewImgPath(previewImgBase64);
        }
        if(movie.getBgImgPath() != null){
            String bgImgBase64 = Base64.getEncoder().encodeToString(movie.getBgImgPath());
            movieDTO.setBgImgPath(bgImgBase64);
        }
        if(movie.getTrailer() != null){
            movieDTO.setTrailer(movie.getTrailer());
        }
        if(movie.getTitle() != null){
            movieDTO.setTitle((movie.getTitle()));
        }
        if(movie.getReleaseYear() != 0){
            movieDTO.setReleaseYear(movie.getReleaseYear());
        }
        if(movie.getLength() != null){
            movieDTO.setLength(movie.getLength());
        }
        if(movie.getDate() != null){
            movieDTO.setDate(movie.getDate());
        }
        if(movie.getCategory() != null){
            movieDTO.setCategory(movie.getCategory());
        }
        if(movie.getType() != null){
            movieDTO.setType(movie.getType());
        }
        if(movie.getDescription() != null){
            movieDTO.setDescription(movie.getDescription());
        }
        return movieDTO;
    }
    public static Movie movieDTOToMovieEntity(MovieDTO movieDTO){
        Movie movie = new Movie();
     /*   if(movieDTO.getPreviewImgPath() != null){
            movie.getMovieDetails().setPreviewImgPath(movieDTO.getPreviewImgPath());
        }
        if(movieDTO.getBgImgPath() != null){
            movie.getMovieDetails().setBgImgPath(movieDTO.getBgImgPath());
        }*/
        if(movieDTO.getTrailer() != null){
            movie.setTrailer(movieDTO.getTrailer());
        }
        if(movieDTO.getTitle() != null){
            movie.setTitle(movieDTO.getTitle());
        }
        if(movieDTO.getReleaseYear() != 0){
            movie.setReleaseYear(movieDTO.getReleaseYear());
        }
        if(movieDTO.getLength() != null){
            movie.setLength(movieDTO.getLength());
        }
        if(movieDTO.getDate() != null){
            movie.setDate(movieDTO.getDate());
        }
        if(movieDTO.getCategory() != null){
            movie.setCategory(movieDTO.getCategory());
        }
        if(movieDTO.getType() != null){
            movie.setType(movieDTO.getType());
        }
        if(movieDTO.getDescription() != null){
            movie.setDescription(movieDTO.getDescription());
        }
        return movie;
    }
}
