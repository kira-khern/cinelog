package com.kira.title;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TitleSearchService {

    private final TmdbClient tmdbClient;

    public TitleSearchService(TmdbClient tmdbClient){
        this.tmdbClient = tmdbClient;
    }

    @Cacheable(cacheNames = "titleSearch", key = "#query.trim().toLowerCase()")
    public List<TitleSearchResult> search(String query){
        TmdbSearchResponse response = tmdbClient.searchMulti(query.trim());
        return TmdbMapper.toSearchResults(response);
    }
}
