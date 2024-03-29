export interface Part {
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

export interface Collection {
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    backdrop_path: string,
    parts: Part[]
}