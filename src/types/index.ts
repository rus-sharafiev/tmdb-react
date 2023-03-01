
export interface Collection {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string
}

export interface Genre {
    id: number,
    name: string
}

export interface ProductionCompanie {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

export interface ProductionCountrie {
    iso_3166_1: string,
    name: string
}

export interface SpokenLanguage {
    english_name: string,
    iso_639_1: string,
    name: string
}

export interface Video {
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: string,
    type: string,
    official: boolean,
    published_at: string,
    id: string
}

export interface Image {
    aspect_ratio: number,
    height: number,
    iso_639_1: string,
    file_path: string,
    vote_average: number,
    vote_count: number,
    width: number
}

export interface Credits {
    cast: Actor[],
    crew: Crew[]
}

export interface Actor {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}

export interface Crew {
    adult: boolean,
    gender: number | null,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string | null,
    credit_id: string,
    department: string,
    job: string
}


export interface Content {
    collections: Collection | null,
    recomm: []
}

export interface CreatedBy {
    id: number,
    credit_id: string,
    name: string,
    gender: number,
    profile_path: string
}

export interface EpisodeToAir {
    id: number,
    name: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    air_date: string,
    episode_number: number,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string
}

export interface Network {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

export interface Season {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
}

export interface Image {
    aspect_ratio: number,
    height: number,
    iso_639_1: string,
    file_path: string,
    vote_average: number,
    vote_count: number,
    width: number
}