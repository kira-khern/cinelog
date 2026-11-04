package com.kira.title;

public record TitleSearchResult(
        Long tmdbId,
        MediaType mediaType,
        String title,
        Integer releaseYear,
        String posterPath,
        String overview
) {
}
