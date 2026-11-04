package com.kira.title;

import com.kira.title.tmdb.TmdbClient;
import com.kira.title.tmdb.TmdbMapper;
import com.kira.title.tmdb.TmdbSearchResponse;
import com.kira.title.tmdb.TmdbSearchResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TitleSearchService {

    private final TmdbClient tmdbClient;

    public TitleSearchService(TmdbClient tmdbClient){
        this.tmdbClient = tmdbClient;
    }

    public List<TitleSearchResult> search(String query){
        TmdbSearchResponse response = tmdbClient.searchMulti(query.trim());
        return TmdbMapper.toSearchResults(response);
    }
}
