import { createApi } from '@reduxjs/toolkit/query/react'
import api, { ApiError } from '..'
import Movie from '../../types/movie'
import Tv from '../../types/tv'
import { preloadMedia } from '../preloaders'

const baseQueryWithPreload = async (url: string) => {
    let result = await api.get(`https://api.rutmdb.ru${url}`) as Movie | Tv | ApiError
    if ('error' in result) return result

    result = await preloadMedia(result)
    return { data: result }
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