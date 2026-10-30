package com.kira.backend.auth;

public record LoginResponse(String accessToken, String tokenType, long expiresIn) {
}
