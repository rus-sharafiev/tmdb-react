import { createApi } from '@reduxjs/toolkit/query/react'
import api, { ApiError } from '..'
import { preloadCards } from '../../services/preloaders'
import { MovieCard, MovieCards, PersonCard, PersonCards, TvCard, TvCards } from '../../types/cards'

const baseQueryWithPreload = async (url: string) => {
    let result = await api.get(`https://api.rutmdb.ru${url}`) as MovieCards | TvCards | PersonCards | ApiError
    if ('error' in result) return result

    let cards = await preloadCards(result, true)
    return { data: cards }
}

const mergeArgs = {
    serializeQueryArgs: ({ endpointName }: { endpointName: string }) => {
        return endpointName;
    },
    merge: (currentCache: MovieCard[] | TvCard[] | PersonCard[], newItems: MovieCard[] & TvCard[] & PersonCard[]) => {
        currentCache.push(...newItems);
    },
    forceRefetch({ currentArg, previousArg }: { currentArg: number | undefined, previousArg: number | undefined }) {
        return currentArg !== previousArg;
    }
}

export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: baseQueryWithPreload,
    keepUnusedDataFor: 12 * 60 * 60,
    endpoints: (builder) => ({

        // Movies --------------------------------------------------------------------------
        getPopularMovies: builder.query<MovieCard[], number>({
            query: (page) => `/api/movie/popular/${page}`, ...mergeArgs
        }),
        getTopRatedMovies: builder.query<MovieCard[], number>({
            query: (page) => `/api/movie/top_rated/${page}`, ...mergeArgs
        }),
        getUpcomingMovies: builder.query<MovieCard[], number>({
            query: (page) => `/api/movie/upcoming/${page}`, ...mergeArgs
        }),

        // Tvs -----------------------------------------------------------------------------
        getPopularTvs: builder.query<TvCard[], number>({
            query: (page) => `/api/tv/popular/${page}`, ...mergeArgs
        }),
        getTopRatedTvs: builder.query<TvCard[], number>({
            query: (page) => `/api/tv/top_rated/${page}`, ...mergeArgs
        }),
        getAiringTodayTvs: builder.query<TvCard[], number>({
            query: (page) => `/api/tv/airing_today/${page}`, ...mergeArgs
        }),

        // People --------------------------------------------------------------------------
        getPopularPeople: builder.query<PersonCard[], number>({
            query: (page) => `/api/person/popular/${page}`, ...mergeArgs
        })
    }),
})

export const {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetPopularTvsQuery,
    useGetTopRatedTvsQuery,
    useGetAiringTodayTvsQuery,
    useGetPopularPeopleQuery
} = cardsApi