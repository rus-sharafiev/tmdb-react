import { Actor, Season } from "../types"
import { MovieCard, MovieCards, PersonCard, PersonCards, TvCard, TvCards } from "../types/cards"
import { Collection, Part } from "../types/collection"
import Movie from "../types/movie"
import Tv from "../types/tv"
import imageLoader, { imageSize } from "./imageLoader"

// Proxy and preload images
export const preloadMedia = async (content: Movie | Tv) => {
    content.backdrop_path = await imageLoader(content.backdrop_path, imageSize.backdrop.w780)
    content.poster_path = await imageLoader(content.poster_path, imageSize.poster.w780)
    content.production_companies = await Promise.all(
        content.production_companies.map(async (company) => {
            company.logo_path = await imageLoader(company.logo_path, imageSize.logo.w300)
            return company
        })
    )
    return content
}

export const preloadCollection = async (content: Collection) => {
    content.backdrop_path = await imageLoader(content.backdrop_path, imageSize.backdrop.w780)
    content.poster_path = await imageLoader(content.poster_path, imageSize.poster.w185)
    content.parts = await Promise.all(
        content.parts.map(async (part: Part) => {
            part.poster_path = await imageLoader(part.poster_path, imageSize.poster.w185, content.poster_path)
            return part
        })
    )
    return content
}

export const preloadCast = async (castArr: Actor[]) => {
    return await Promise.all(
        castArr.map(async (cast: Actor) => {
            cast.profile_path = await imageLoader(cast.profile_path, imageSize.profile.w185, cast.gender === 1 ? '/img/female.png' : '/img/male.png')
            return cast
        })
    )
}

export const preloadSeasons = async (seasons: Season[]): Promise<Season[]> => {
    return await Promise.all(seasons.map(async (season: Season) => {
        season.poster_path = await imageLoader(season.poster_path, imageSize.poster.w342)
        return season
    }))
}

export const preloadCards = async (content: MovieCards | TvCards | PersonCards, w342?: boolean): Promise<MovieCard[] | TvCard[] | PersonCard[]> => {
    return await Promise.all(
        content.results.map(async (item: MovieCard | TvCard | PersonCard) => {
            if ((item as MovieCard | TvCard).poster_path)
                (item as MovieCard | TvCard).poster_path = await imageLoader((item as MovieCard | TvCard).poster_path, w342 ? imageSize.poster.w342 : imageSize.poster.w185, '/img/no_image.png')
            if ((item as PersonCard).profile_path)
                (item as PersonCard).profile_path = await imageLoader((item as PersonCard).profile_path, imageSize.profile.w185, (item as PersonCard).gender === 1 ? '/img/female.png' : '/img/male.png')
            return item
        })) as MovieCard[] | TvCard[] | PersonCard[]
}