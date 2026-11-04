import { apiRequest } from "./client";

export function searchTitles(query) {
    return apiRequest(`/titles/search?query=${encodeURIComponent(query)}`)
}