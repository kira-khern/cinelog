package com.kira.backend.auth;

public record LoginResponse(String accesToken, String tokenType, long expiresIn) {
}
