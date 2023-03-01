import { Actor } from "../types"
import { MovieCard, MovieCards, PersonCard, PersonCards, TvCard, TvCards } from "../types/cards"
import { Collection, Part } from "../types/collection"
import Movie from "../types/movie"
import Tv from "../types/tv"
import imageLoader, { imageSize } from "./imageLoader"

// Proxy and preload images
export const preloadMovie = async (content: Movie) => {
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
export const preloadTv = async (content: Tv) => {
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
    castArr = await Promise.all(
        castArr.map(async (cast: Actor) => {
            cast.profile_path = await imageLoader(cast.profile_path, imageSize.profile.w185, cast.gender === 1 ? '/img/female.png' : '/img/male.png')
            return cast
        })
    )
    return castArr
}

export const preloadMovieCards = async (content: MovieCards, w342?: boolean): Promise<MovieCard[]> => {
    let contentResults = await Promise.all(
        content.results.map(async (item: MovieCard) => {
            item.poster_path = await imageLoader(item.poster_path, w342 ? imageSize.poster.w342 : imageSize.poster.w185, '/img/no_image.png')
            return item
        }))
    return contentResults
}

export const preloadTvCards = async (content: TvCards, w342?: boolean): Promise<TvCard[]> => {
    let contentResults = await Promise.all(
        content.results.map(async (item: TvCard) => {
            item.poster_path = await imageLoader(item.poster_path, w342 ? imageSize.poster.w342 : imageSize.poster.w185, '/img/no_image.png')
            return item
        }))
    return contentResults
}

export const preloadPersonCards = async (content: PersonCards): Promise<PersonCard[]> => {
    let contentResults = await Promise.all(
        content.results.map(async (person: PersonCard) => {
            person.profile_path = await imageLoader(person.profile_path, imageSize.profile.w185, person.gender === 1 ? '/img/female.png' : '/img/male.png')
            return person
        }));
    return contentResults
}