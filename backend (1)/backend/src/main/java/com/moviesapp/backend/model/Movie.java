package com.moviesapp.backend.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;


@Data
@Table(name="movies")

public class Movie {
    @Id
    private Long id;

  /*  private int movieDetailsId;

    private MovieDetails movieDetails;*/
  private byte[] previewImgPath;

    private byte[] bgImgPath;

    private String trailer;

    private String title;

    private Integer releaseYear;

    private String length;

    private String date;

    private String category;

    private String type;

    private String description;

    private boolean isActive;




}
