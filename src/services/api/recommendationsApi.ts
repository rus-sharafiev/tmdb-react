import { createApi } from '@reduxjs/toolkit/query/react'
import api, { ApiError } from '..'
import { MovieCard, MovieCards, PersonCards, TvCard, TvCards } from '../../types/cards'
import { preloadCards } from '../preloaders'

const baseQueryWithPreload = async (url: string) => {
    let result = await api.get(`https://api.rutmdb.ru${url}`) as MovieCards | TvCards | PersonCards | ApiError
    if ('error' in result) return result

    let cards = await preloadCards(result)
    return { data: cards }
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