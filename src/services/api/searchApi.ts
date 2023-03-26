import { BaseQueryApi, createApi } from '@reduxjs/toolkit/query/react'
import api, { ApiError } from '..'
import { preloadCards } from '../preloaders'
import { MovieCard, MovieCards, PersonCard, PersonCards, TvCard, TvCards } from '../../types/cards'
import { setMoviesSearchResults, setPeopleSearchResults, setTvsSearchResults } from '../../store/reducers/searchResultsSlice'

const baseQueryWithPreload = async (url: string, baseQueryApi: BaseQueryApi) => {
    let result = await api.get(url) as MovieCards | TvCards | PersonCards | ApiError
    if ('error' in result) return result

    let type = url.split('/')[3]

    if (type === 'movie')
        baseQueryApi.dispatch(setMoviesSearchResults({
            pages: result.total_pages,
            qtt: result.results.length
        }))

    if (type === 'tv')
        baseQueryApi.dispatch(setTvsSearchResults({
            pages: result.total_pages,
            qtt: result.results.length
        }))

    if (type === 'person')
        baseQueryApi.dispatch(setPeopleSearchResults({
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
    keepUnusedDataFor: 10 * 60,
    endpoints: (builder) => ({


        // Search --------------------------------------------------------------------------
        searchMovies: builder.query<MovieCard[], string>({
            query: (query) => `/api/search/movie/${query}`, ...mergeArgs
        }),
        searchTvs: builder.query<TvCard[], string>({
            query: (query) => `/api/search/tv/${query}`, ...mergeArgs
        }),
        searchPeople: builder.query<PersonCard[], string>({
            query: (query) => `/api/search/person/${query}`, ...mergeArgs
        })
    }),
})

export const {
    useSearchMoviesQuery,
    useSearchTvsQuery,
    useSearchPeopleQuery
} = searchApi