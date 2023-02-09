import { Collection, Part } from "../types/collection"
import Movie, { Actor } from "../types/movie"
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
            cast.profile_path = await imageLoader(cast.profile_path, imageSize.profile.w185)
            return cast;
        })
    )
    return castArr
}