import { Theme } from '@material/material-color-utilities'
import { Creator, Credits, EpisodeToAir, Genre, Network, ProductionCompanie, ProductionCountrie, TvSeason, SpokenLanguage, Video } from '.'
import { TvCards } from './cards'

export default interface Tv {
    adult: boolean,
    backdrop_path: string,
    created_by: Creator[],
    episode_run_time: number[],
    first_air_date: string,
    genres: Genre[],
    homepage: string,
    id: number,
    in_production: boolean,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: EpisodeToAir,
    name: string,
    next_episode_to_air: EpisodeToAir,
    networks: Network[],
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: ProductionCompanie[],
    production_countries: ProductionCountrie[],
    seasons: TvSeason[],
    spoken_languages: SpokenLanguage[],
    status: string,
    tagline: string,
    type: string,
    vote_average: number,
    vote_count: number,
    videos: {
        results: Video[]
    },
    credits: Credits,
    recommendations: TvCards,
    theme?: Theme
}