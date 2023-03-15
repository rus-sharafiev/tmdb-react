import { createApi } from '@reduxjs/toolkit/query/react'
import { MovieCard, TvCard } from '../../types/cards'
import { preloadCards } from '../preloaders'

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
        result = await preloadCards(result)
        return { data: result }

    } catch (error) {
        return {
            error: {
                data: error
            }
        }
    }
}

export const recommendationsApi = createApi({
    reducerPath: 'recommendationsApi',
    baseQuery: baseQueryWithPreload,
    keepUnusedDataFor: 10 * 60,
    endpoints: (builder) => ({
        getMovieRecommendations: builder.query<MovieCard[], number>({
            query: (id) => `/api/movie/${id}/recommendations`
        }),

        getTvRecommendations: builder.query<TvCard[], number>({
            query: (id) => `/api/tv/${id}/recommendations`
        })
    }),
})

export const {
    useGetMovieRecommendationsQuery,
    useGetTvRecommendationsQuery
} = recommendationsApi