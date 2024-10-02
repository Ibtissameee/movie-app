package com.moviesapp.backend.model;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Table;
import reactor.core.publisher.Mono;

@Table(name = "favorite_movies")
@Data
public class FavoriteMovies {
    private String userId;

    private Long movieId;
}
