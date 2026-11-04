package com.kira.title.tmdb;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@ConfigurationProperties(prefix = "cinelog.tmdb")
public record TmdbProperties(String baseUrl, String apiToken, Duration timeout) {
}
