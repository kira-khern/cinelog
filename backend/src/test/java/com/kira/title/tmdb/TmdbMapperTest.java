package com.kira.title.tmdb;

import com.kira.title.*;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class TmdbMapperTest {

    @Test
    void mapsMovieWithTitleAndReleaseYear() {
        TmdbSearchResult movie = new TmdbSearchResult(
                157336L, "movie", "Interstellar", null,
                "2014-11-05", null, "/poster.jpg", "A team of explorers...");

        List<TitleSearchResult> results = TmdbMapper.toSearchResults(new TmdbSearchResponse(List.of(movie)));

        assertThat(results).hasSize(1);
        TitleSearchResult result = results.get(0);
        assertThat(result.tmdbId()).isEqualTo(157336L);
        assertThat(result.mediaType()).isEqualTo(MediaType.MOVIE);
        assertThat(result.title()).isEqualTo("Interstellar");
        assertThat(result.releaseYear()).isEqualTo(2014);
        assertThat(result.posterPath()).isEqualTo("/poster.jpg");
    }

    @Test
    void mapsTvShowAsSeriesUsingNameAndFirstAirDate() {
        TmdbSearchResult series = new TmdbSearchResult(
                1396L, "tv", null, "Breaking Bad",
                null, "2008-01-20", "/bb.jpg", "A chemistry teacher...");

        List<TitleSearchResult> results = TmdbMapper.toSearchResults(new TmdbSearchResponse(List.of(series)));

        assertThat(results).hasSize(1);
        assertThat(results.get(0).mediaType()).isEqualTo(MediaType.SERIES);
        assertThat(results.get(0).title()).isEqualTo("Breaking Bad");
        assertThat(results.get(0).releaseYear()).isEqualTo(2008);
    }

    @Test
    void skipsPeopleAndOtherMediaTypes() {
        TmdbSearchResult person = new TmdbSearchResult(
                1L, "person", null, "Bryan Cranston",
                null, null, null, null);

        List<TitleSearchResult> results = TmdbMapper.toSearchResults(new TmdbSearchResponse(List.of(person)));

        assertThat(results).isEmpty();
    }

    @Test
    void skipsResultsWithoutTitle() {
        TmdbSearchResult movieWithoutTitle = new TmdbSearchResult(
                2L, "movie", " ", null,
                "2020-01-01", null, null, null);

        List<TitleSearchResult> results = TmdbMapper.toSearchResults(new TmdbSearchResponse(List.of(movieWithoutTitle)));

        assertThat(results).isEmpty();
    }

    @Test
    void returnsEmptyListForNullResponse() {
        assertThat(TmdbMapper.toSearchResults(null)).isEmpty();
        assertThat(TmdbMapper.toSearchResults(new TmdbSearchResponse(null))).isEmpty();
    }

    @Test
    void releaseYearIsNullForMissingOrInvalidDate() {
        assertThat(TmdbMapper.toYear(null)).isNull();
        assertThat(TmdbMapper.toYear("")).isNull();
        assertThat(TmdbMapper.toYear("abc")).isNull();
        assertThat(TmdbMapper.toYear("abcd-01-01")).isNull();
    }
}