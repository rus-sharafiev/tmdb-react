import { createApi } from '@reduxjs/toolkit/query/react'
import api, { ApiError } from '..'
import { Credits } from '../../types'
import { preloadCast } from '../preloaders'

const baseQueryWithPreload = async (url: string) => {
    let result = await api.get(url) as Credits | ApiError
    if ('error' in result) return result

    if (result.cast.length >= 20)
        result.cast = result.cast.slice(0, 20)

    result.cast = await preloadCast(result.cast)
    return { data: result }
}

export const creditsApi = createApi({
    reducerPath: 'creditsApi',
    baseQuery: baseQueryWithPreload,
    keepUnusedDataFor: 10 * 60,
    endpoints: (builder) => ({
        getMovieCredits: builder.query<Credits, number>({
            query: (id) => `/api/movie/${id}/credits`
        }),

        getTvCredits: builder.query<Credits, number>({
            query: (id) => `/api/tv/${id}/credits`
        })
    }),
})

export const {
    useGetMovieCreditsQuery,
    useGetTvCreditsQuery
} = creditsApi