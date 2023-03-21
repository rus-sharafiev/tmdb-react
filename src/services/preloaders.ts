import { Actor, TvSeason } from "../types"
import { MovieCard, MovieCards, PersonCard, PersonCards, TvCard, TvCards } from "../types/cards"
import { Collection, Part } from "../types/collection"
import Movie from "../types/movie"
import { Episode, Season } from "../types/season"
import Tv from "../types/tv"
import imageLoader, { imageSize } from "./imageLoader"
import themeFromImageBitmap from "./themeFromImageBitmap"

export const preloadMedia = async (content: Movie | Tv) => {
    let resolvedData = await Promise.all([
        imageLoader(content.backdrop_path, imageSize.backdrop.w780) as Promise<string>,
        imageLoader(content.poster_path, imageSize.poster.w780, '', true) as Promise<{ img: string, bitmap: ImageBitmap }>,
        Promise.all(
            content.production_companies.map(async (company) => {
                company.logo_path = await imageLoader(company.logo_path, imageSize.logo.w300) as string
                return company
            })
        )
    ])
    content.backdrop_path = resolvedData[0]
    content.poster_path = resolvedData[1].img
    content.production_companies = resolvedData[2]
    let theme = await themeFromImageBitmap(resolvedData[1].bitmap)
    content = { ...content, theme }
    return content
}

export const preloadSeason = async (content: Season): Promise<Season> => {
    let resolvedData = await Promise.all([
        imageLoader(content.poster_path, imageSize.poster.w500, '', true) as Promise<{ img: string, bitmap: ImageBitmap }>,
        Promise.all(
            content.episodes.map(async (episode: Episode) => {
                episode.still_path = await imageLoader(episode.still_path, imageSize.still.w300) as string
                return episode
            })
        )
    ])
    content.episodes = resolvedData[1]
    content.poster_path = resolvedData[0].img
    let theme = await themeFromImageBitmap(resolvedData[0].bitmap)
    content = { ...content, theme }
    return content
}

export const preloadCollection = async (content: Collection) => {
    content.backdrop_path = await imageLoader(content.backdrop_path, imageSize.backdrop.w780) as string
    content.poster_path = await imageLoader(content.poster_path, imageSize.poster.w185) as string
    content.parts = await Promise.all(
        content.parts.map(async (part: Part) => {
            if (!part.poster_path)
                part = { ...part, no_poster: true }
            part.poster_path = await imageLoader(part.poster_path, imageSize.poster.w185, content.poster_path) as string
            return part
        })
    )
    return content
}

export const preloadCast = async (castArr: Actor[]) => {
    return await Promise.all(
        castArr.map(async (cast: Actor) => {
            if (!cast.profile_path) cast = { ...cast, no_poster: true }
            cast.profile_path = await imageLoader(cast.profile_path, imageSize.profile.w185, cast.gender === 1 ? '/images/female.png' : '/images/male.png') as string
            return cast
        })
    )
}

export const preloadSeasons = async (seasons: TvSeason[]): Promise<TvSeason[]> => {
    return await Promise.all(seasons.map(async (season: TvSeason) => {
        season.poster_path = await imageLoader(season.poster_path, imageSize.poster.w342) as string
        return season
    }))
}

export const preloadCards = async (content: MovieCards | TvCards | PersonCards, w342?: boolean): Promise<MovieCard[] | TvCard[] | PersonCard[]> => {
    return await Promise.all(
        content.results.map(async (item: MovieCard | TvCard | PersonCard) => {

            if ('poster_path' in item && !item.poster_path) item = { ...item, no_poster: true }
            if ('poster_path' in item)
                item.poster_path = await imageLoader(item.poster_path, w342 ? imageSize.poster.w342 : imageSize.poster.w185) as string

            if ('profile_path' in item)
                item.profile_path = await imageLoader(item.profile_path, imageSize.profile.w185, item.gender === 1 ? '/images/female.png' : '/images/male.png') as string

            return item
        })) as MovieCard[] | TvCard[] | PersonCard[]
}