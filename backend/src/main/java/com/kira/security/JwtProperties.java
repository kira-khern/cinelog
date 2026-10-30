package com.kira.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@ConfigurationProperties(prefix = "cinelog.jwt")
public record JwtProperties(String secret, Duration expiration) {
}
