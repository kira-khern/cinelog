package com.kira.title.tmdb;

import com.kira.title.MediaType;
import com.kira.title.TitleSearchResult;

import java.util.ArrayList;
import java.util.List;

public final class TmdbMapper {

    private  TmdbMapper() {
    }

    public static List<TitleSearchResult> toSearchResults(TmdbSearchResponse response) {
        List<TitleSearchResult> results = new ArrayList<>();

        if (response == null || response.results() == null) {
            return results;
        }

        for (TmdbSearchResult item : response.results()) {
            MediaType mediaType = toMediatype(item.mediaType());
            if (mediaType == null) {
                continue;
            }

            String title;
            String date;
            if(mediaType == MediaType.MOVIE){
                title = item.title();
                date = item.releaseDate();
            } else{
                title = item.name();
                date = item.firstAirDate();
            }

            if(title == null || title.isBlank()){
                continue;
            }

            results.add(new TitleSearchResult(
                    item.id(),
                    mediaType,
                    title,
                    toYear(date),
                    item.posterPath(),
                    item.overview()
            ));
        }
        return results;
    }

    static MediaType toMediatype(String tmdbMediaType){
        if("movie".equals(tmdbMediaType)) {
            return MediaType.MOVIE;
        }
        if("tv".equals(tmdbMediaType)) {
            return MediaType.SERIES;
        }
        return null;
    }

    static Integer toYear(String date){
        if(date == null || date.length() < 4){
            return null;
        }
        try{
            return Integer.parseInt(date.substring(0,4));
        }catch (NumberFormatException ex){
            return null;
        }
    }
}
