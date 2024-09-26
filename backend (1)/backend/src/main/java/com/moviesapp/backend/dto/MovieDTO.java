package com.moviesapp.backend.dto;

import lombok.Data;

@Data
public class MovieDTO {

    private Long id;


    private String previewImgPath;

    private String bgImgPath;

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
