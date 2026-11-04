const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export function posterUrl(posterPath, size = 'w342'){
    if(!posterPath){
        return null
    }
    return `${IMAGE_BASE_URL}/${size}${posterPath}`
}