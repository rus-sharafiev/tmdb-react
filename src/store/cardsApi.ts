import { createApi, fetchBaseQuery, defaultSerializeQueryArgs, BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { preloadCards } from '../services/preloaders'
import { MovieCard, TvCard, TvCards } from '../types/cards'

const axiosBaseQueryWithPreload = async (url: string) => {
    try {
        const result = await axios(url)
        if (result.data) {
            result.data = await preloadCards(result.data, true)
        }
        return { data: result.data }
    } catch (axiosError) {
        let err = axiosError as AxiosError
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}

export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: axiosBaseQueryWithPreload,
    endpoints: (builder) => ({

        // Movies --------------------------------------------------------------------------
        getPopularMovies: builder.query<MovieCard[], number>({
            query: (page) => `/api/movie/popular/${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        getTopRatedMovies: builder.query<MovieCard[], number>({
            query: (page) => `/api/movie/top_rated/${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        getUpcomingMovies: builder.query<MovieCard[], number>({
            query: (page) => `/api/movie/upcoming/${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),

        // Tvs -----------------------------------------------------------------------------
        getPopularTvs: builder.query<TvCard[], number>({
            query: (page) => `/api/tv/popular/${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        getTopRatedTvs: builder.query<TvCard[], number>({
            query: (page) => `/api/tv/top_rated/${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        getAiringTodayTvs: builder.query<TvCard[], number>({
            query: (page) => `/api/tv/airing_today/${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),

        // People --------------------------------------------------------------------------
        getPopularPeople: builder.query<TvCard[], number>({
            query: (page) => `/api/person/popular/${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
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