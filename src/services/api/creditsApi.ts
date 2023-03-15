import { createApi } from '@reduxjs/toolkit/query/react'
import { Credits } from '../../types'
import Movie from '../../types/movie'
import Tv from '../../types/tv'
import { preloadCast } from '../preloaders'

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
        result.cast = await preloadCast(result.cast)
        return { data: result }

    } catch (error) {
        return {
            error: {
                data: error
            }
        }
    }
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