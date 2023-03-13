import { Actor, TvSeason } from "../types"
import { MovieCard, MovieCards, PersonCard, PersonCards, TvCard, TvCards } from "../types/cards"
import { Collection, Part } from "../types/collection"
import Movie from "../types/movie"
import { Episode, Season } from "../types/season"
import Tv from "../types/tv"
import imageLoader, { imageSize } from "./imageLoader"
import themeFromImageBitmap from "./themeFromImageBitmap"

// Proxy and preload images
export const preloadMedia = async (content: Movie | Tv) => {
    content.backdrop_path = await imageLoader(content.backdrop_path, imageSize.backdrop.w780) as string
    let posterData = await imageLoader(content.poster_path, imageSize.poster.w780, '', true) as { img: string, bitmap: ImageBitmap }
    content.poster_path = posterData.img
    content.production_companies = await Promise.all(
        content.production_companies.map(async (company) => {
            company.logo_path = await imageLoader(company.logo_path, imageSize.logo.w300) as string
            return company
        })
    )
    content = { ...content, poster_bitmap: posterData.bitmap }
    return content
}

export const preloadSeason = async (content: Season): Promise<Season> => {
    let posterData = await imageLoader(content.poster_path, imageSize.poster.w500, '', true) as { img: string, bitmap: ImageBitmap }
    content.poster_path = posterData.img
    content.episodes = await Promise.all(
        content.episodes.map(async (episode: Episode) => {
            episode.still_path = await imageLoader(episode.still_path, imageSize.still.w300) as string
            return episode
        })
    )
    let theme = await themeFromImageBitmap(posterData.bitmap)
    content = { ...content, theme }
    return content
}

// export const preloadEpisodes = async (content: Episode[]): Promise<Episode[]> => {
//     return await Promise.all(
//         content.slice().map(async (episode: Episode) => {
//             let resultEpisode: Episode = { ...{}, ...episode }
//             resultEpisode.still_path = await imageLoader(episode.still_path, imageSize.still.w300) as string
//             return resultEpisode
//         })
//     )
// }

export const preloadCollection = async (content: Collection) => {
    content.backdrop_path = await imageLoader(content.backdrop_path, imageSize.backdrop.w780) as string
    content.poster_path = await imageLoader(content.poster_path, imageSize.poster.w185) as string
    content.parts = await Promise.all(
        content.parts.map(async (part: Part) => {
            part.poster_path = await imageLoader(part.poster_path, imageSize.poster.w185, content.poster_path) as string
            return part
        })
    )
    return content
}

export const preloadCast = async (castArr: Actor[]) => {
    return await Promise.all(
        castArr.map(async (cast: Actor) => {
            cast.profile_path = await imageLoader(cast.profile_path, imageSize.profile.w185, cast.gender === 1 ? '/img/female.png' : '/img/male.png') as string
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
            if ((item as MovieCard | TvCard).poster_path)
                (item as MovieCard | TvCard).poster_path = await imageLoader((item as MovieCard | TvCard).poster_path, w342 ? imageSize.poster.w342 : imageSize.poster.w185, '/img/no_image.png') as string
            if ((item as PersonCard).profile_path)
                (item as PersonCard).profile_path = await imageLoader((item as PersonCard).profile_path, imageSize.profile.w185, (item as PersonCard).gender === 1 ? '/img/female.png' : '/img/male.png') as string
            return item
        })) as MovieCard[] | TvCard[] | PersonCard[]
}