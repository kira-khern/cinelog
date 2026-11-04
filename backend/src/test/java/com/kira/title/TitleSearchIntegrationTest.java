package com.kira.title;

import com.kira.TestcontainersConfiguration;
import com.kira.common.exception.ExternalServiceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Import(TestcontainersConfiguration.class)
class TitleSearchIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CacheManager cacheManager;

    @MockitoBean
    private TmdbClient tmdbClient;

    @BeforeEach
    void clearCache() {
        for (String name : cacheManager.getCacheNames()) {
            cacheManager.getCache(name).clear();
        }
    }

    @Test
    void searchReturnsMoviesAndSeries() throws Exception {
        TmdbSearchResponse response = new TmdbSearchResponse(List.of(
                new TmdbSearchResult(157336L, "movie", "Interstellar", null, "2014-11-05", null, "/poster.jpg", "Space"),
                new TmdbSearchResult(1396L, "tv", null, "Breaking Bad", null, "2008-01-20", "/bb.jpg", "Chemistry")
        ));
        when(tmdbClient.searchMulti("interstellar")).thenReturn(response);

        mockMvc.perform(get("/api/titles/search")
                        .param("query", "interstellar")
                        .with(jwt()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Interstellar"))
                .andExpect(jsonPath("$[0].mediaType").value("MOVIE"))
                .andExpect(jsonPath("$[0].releaseYear").value(2014))
                .andExpect(jsonPath("$[1].title").value("Breaking Bad"))
                .andExpect(jsonPath("$[1].mediaType").value("SERIES"));
    }

    @Test
    void blankQueryReturnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/titles/search")
                        .param("query", " ")
                        .with(jwt()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void searchWithoutTokenReturnsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/titles/search")
                        .param("query", "interstellar"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void tmdbFailureReturnsServiceUnavailable() throws Exception {
        when(tmdbClient.searchMulti("interstellar"))
                .thenThrow(new ExternalServiceException("Movie search is temporarily unavailable", new RuntimeException("timeout")));

        mockMvc.perform(get("/api/titles/search")
                        .param("query", "interstellar")
                        .with(jwt()))
                .andExpect(status().isServiceUnavailable())
                .andExpect(jsonPath("$.status").value(503))
                .andExpect(jsonPath("$.detail").value("Movie search is temporarily unavailable"));
    }

    @Test
    void repeatedSearchIsServedFromCache() throws Exception {
        when(tmdbClient.searchMulti("Interstellar")).thenReturn(new TmdbSearchResponse(List.of()));

        mockMvc.perform(get("/api/titles/search").param("query", "Interstellar").with(jwt()))
                .andExpect(status().isOk());
        mockMvc.perform(get("/api/titles/search").param("query", "interstellar ").with(jwt()))
                .andExpect(status().isOk());

        verify(tmdbClient, times(1)).searchMulti("Interstellar");
        verifyNoMoreInteractions(tmdbClient);
    }
}