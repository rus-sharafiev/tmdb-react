import { MovieCards } from "./cards"

interface Collection {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string
}

interface Genre {
    id: number,
    name: string
}

interface ProductionCompanie {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

interface ProductionCountrie {
    iso_3166_1: string,
    name: string
}

interface SpokenLanguage {
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

interface Image {
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

interface Crew {
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

export default interface Movie {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: Collection | null,
    budget: number,
    credits: Credits,
    genres: Genre[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string
    popularity: number,
    poster_path: string,
    production_companies: ProductionCompanie[],
    production_countries: ProductionCountrie[],
    recommendations: MovieCards,
    release_date: string,
    revenue: number,
    runtime: number,
    similar: MovieCards,
    spoken_languages: SpokenLanguage[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    videos: {
        results: Video[]
    },
    images: {
        backdrops: Image[],
        logos: Image[],
        posters: Image[]
    }
}