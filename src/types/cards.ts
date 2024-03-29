// Cards containers
export interface MovieCards {
    page: number,
    results: MovieCard[],
    total_pages: number,
    total_results: number
}
export interface TvCards {
    page: number,
    results: TvCard[],
    total_pages: number,
    total_results: number
}
export interface PersonCards {
    page: number,
    results: PersonCard[],
    total_pages: number,
    total_results: number
}

// Movie card
export interface MovieCard {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    no_poster?: boolean
}

// TV card
export interface TvCard {
    backdrop_path: string,
    first_air_date: string,
    genre_ids: number[],
    id: number,
    name: string,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    vote_average: number,
    vote_count: number,
    no_poster?: boolean
}

// Person card
export interface PersonCard {
    adult: boolean,
    gender: number,
    id: number,
    known_for: [MovieCard | TvCard],
    known_for_department: string,
    name: string,
    popularity: number,
    profile_path: string
}