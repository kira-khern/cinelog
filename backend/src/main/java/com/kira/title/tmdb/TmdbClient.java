package com.kira.title.tmdb;

import com.kira.common.exception.ExternalServiceException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Component
public class TmdbClient {

    private final RestClient restClient;

    public TmdbClient(TmdbProperties properties){
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(properties.timeout());
        requestFactory.setReadTimeout(properties.timeout());

        this.restClient = RestClient.builder()
                .baseUrl(properties.baseUrl())
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + properties.apiToken())
                .requestFactory(requestFactory)
                .build();
    }

    public TmdbSearchResponse searchMulti(String query){
        try{
            return restClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/search/multi")
                            .queryParam("query", query)
                            .queryParam("include_adult", false)
                            .queryParam("language", "en-US")
                            .build())
                    .retrieve()
                    .body(TmdbSearchResponse.class);
        } catch (RestClientException e) {
            throw new ExternalServiceException("Movie search is temporarily unavailable", e);
        }
    }
}
