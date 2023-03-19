import { BaseQueryApi, createApi } from '@reduxjs/toolkit/query/react'
import api, { ApiError } from '..'
import { preloadCards } from '../preloaders'
import { MovieCard, MovieCards, PersonCard, PersonCards, TvCard, TvCards } from '../../types/cards'
import { setMoviesResults, setPeopleResults, setTvsResults } from '../../store/reducers/searchResultsSlice'

const baseQueryWithPreload = async (url: string, baseQueryApi: BaseQueryApi) => {
    let result = await api.get(`https://api.rutmdb.ru${url}`) as MovieCards | TvCards | PersonCards | ApiError
    if ('error' in result) return result

    let type = url.split('/')[3]

    if (type === 'movie')
        baseQueryApi.dispatch(setMoviesResults({
            pages: result.total_pages,
            qtt: result.results.length
        }))

    if (type === 'tv')
        baseQueryApi.dispatch(setTvsResults({
            pages: result.total_pages,
            qtt: result.results.length
        }))

    if (type === 'person')
        baseQueryApi.dispatch(setPeopleResults({
            pages: result.total_pages,
            qtt: result.results.length
        }))

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
    forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
    }
}

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: baseQueryWithPreload,
    keepUnusedDataFor: 12 * 60 * 60,
    endpoints: (builder) => ({


        // Search --------------------------------------------------------------------------
        searchMovies: builder.query<MovieCard[], { query: string, page: number }>({
            query: ({ query, page }) => `/api/search/movie/${query}/${page}`, ...mergeArgs
        }),
        searchTvs: builder.query<TvCard[], { query: string, page: number }>({
            query: ({ query, page }) => `/api/search/tv/${query}/${page}`, ...mergeArgs
        }),
        searchPeople: builder.query<PersonCard[], { query: string, page: number }>({
            query: ({ query, page }) => `/api/search/person/${query}/${page}`, ...mergeArgs
        })
    }),
})

export const {
    useSearchMoviesQuery,
    useSearchTvsQuery,
    useSearchPeopleQuery
} = searchApi