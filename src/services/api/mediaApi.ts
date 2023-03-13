import { createApi } from '@reduxjs/toolkit/query/react'
import Movie from '../../types/movie'
import Tv from '../../types/tv'
import { preloadMedia } from '../preloaders'

const baseQueryWithPreload = async (url: string) => {
    try {
        let response = await fetch(`https://api.rutmdb.ru${url}`)
        if (response.status !== 200)
            return {
                error: {
                    status: response.status,
                    data: response.statusText
                }
            }
        let result = await response.json()
        result = await preloadMedia(result)
        return { data: result }

    } catch (error) {
        return {
            error: {
                data: error
            }
        }
    }
}

export const mediaApi = createApi({
    reducerPath: 'mediaApi',
    baseQuery: baseQueryWithPreload,
    keepUnusedDataFor: 10 * 60,
    endpoints: (builder) => ({
        getMovie: builder.query<Movie, string>({
            query: (id) => `/api/movie/${id}`
        }),

        getTv: builder.query<Tv, string>({
            query: (id) => `/api/tv/${id}`
        })
    }),
})

export const {
    useGetMovieQuery,
    useGetTvQuery
} = mediaApi