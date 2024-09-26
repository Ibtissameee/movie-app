package com.moviesapp.backend.controler;

import com.moviesapp.backend.dto.MovieDTO;
import com.moviesapp.backend.mapper.MovieMapper;
import com.moviesapp.backend.model.Movie;
import com.moviesapp.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping(value = "/add-movie", consumes = "multipart/form-data")
    public Mono<ResponseEntity<MovieDTO>> moviePost(
            @RequestPart("movie") MovieDTO movieDTO,
            @RequestPart("previewImg") FilePart previewImg,
            @RequestPart("bgImg") FilePart bgImg) {

        Movie movieToAdd = MovieMapper.movieDTOToMovieEntity(movieDTO);

        Mono<byte[]> previewImgMono = filePartToBytes(previewImg);
        Mono<byte[]> bgImgMono = filePartToBytes(bgImg);

        return Mono.zip(previewImgMono, bgImgMono)
                .flatMap(tuple -> {
                    byte[] previewImgBytes = tuple.getT1();
                    byte[] bgImgBytes = tuple.getT2();

                    movieToAdd.setPreviewImgPath(previewImgBytes);
                    movieToAdd.setBgImgPath(bgImgBytes);

                    return movieService.saveMovie(movieToAdd)
                            .map(savedMovie -> {
                                MovieDTO responseDTO = MovieMapper.movieEntityToMovieDTO(savedMovie);
                                return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
                            });
                });
    }

    @GetMapping("/all-movies")
    public Flux<MovieDTO> getAllMovies() {
        return movieService.getAllMovies()
                .map(MovieMapper::movieEntityToMovieDTO);
    }

    private Mono<byte[]> filePartToBytes(FilePart filePart) {
        return DataBufferUtils.join(filePart.content())
                .map(dataBuffer -> {
                    byte[] bytes = new byte[dataBuffer.readableByteCount()];
                    dataBuffer.read(bytes);
                    DataBufferUtils.release(dataBuffer); // Properly release the buffer
                    return bytes;
                });
    }
}