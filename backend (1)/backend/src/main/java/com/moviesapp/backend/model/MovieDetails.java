package com.moviesapp.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;


//@Data
public class MovieDetails {
    @Id

    private int id;

    private byte[] previewImgPath;

    private byte[] bgImgPath;

    private String trailer;

    private String title;

    private int releaseYear;

    private String length;

    private String date;

    private String category;

    private String type;

    private String description;


   // private Movie movie;
}
