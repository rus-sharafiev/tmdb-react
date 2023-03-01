import { Collection, Credits, Genre, ProductionCompanie, ProductionCountrie, SpokenLanguage, Video, Image } from "."
import { MovieCards } from "./cards"

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