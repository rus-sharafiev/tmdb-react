import { Crew, Actor } from './'

export interface Episode {
    air_date: string,
    episode_number: number,
    id: number,
    name: string,
    overview: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number,
    vote_count: number,
    crew: Crew[],
    guest_stars: Actor[]
}

export interface Season {
    _id: string,
    air_date: string,
    episodes: Episode[],
    name: string,
    overview: string,
    id: number,
    poster_path: string,
    season_number: number,
    credits: {
        cast: Actor[],
        crew: Crew[]
    }
}