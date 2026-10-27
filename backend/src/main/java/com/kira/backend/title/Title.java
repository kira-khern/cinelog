package com.kira.backend.title;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "titles")
public class Title {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tmdb_id", nullable = false)
    private Long tmdbId;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false, length = 20)
    private MediaType mediaType;

    @Column(nullable = false)
    private String title;

    @Column(name = "release_year")
    private Integer releaseYear;

    @Column(name = "poster_path")
    private String posterPath;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    protected Title(){}

    public Title(Long tmdbId, MediaType mediaType, String title, Integer releaseYear, String posterPath, String overview){
        this.tmdbId = tmdbId;
        this.mediaType = mediaType;
        this.title = title;
        this.releaseYear = releaseYear;
        this.posterPath = posterPath;
        this.overview = overview;
    }

    public Long getId() {
        return id;
    }

    public Long getTmdbId() {
        return tmdbId;
    }

    public MediaType getMediaType() {
        return mediaType;
    }

    public String getTitle() {
        return title;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public String getOverview() {
        return overview;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
