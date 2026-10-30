package com.kira.user;

import java.time.Instant;

public record UserResponse(Long id, String username, String bio, Instant createdAt) {
    public static UserResponse from(User user){
        return new UserResponse(user.getId(), user.getUsername(), user.getBio(), user.getCreatedAt());
    }
}
