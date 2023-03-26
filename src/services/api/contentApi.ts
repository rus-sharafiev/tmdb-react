import { createApi } from '@reduxjs/toolkit/query/react'
import api, { ApiError } from '..'
import { Content } from '../../types'
import Movie from '../../types/movie'
import Tv from '../../types/tv'

const baseQueryWithTransform = async (url: string) => {
    let result = await api.get(url) as Tv | Movie | ApiError
    if ('error' in result) return result

    let content: Content = { recommendations: result.recommendations.results.length }

    if ('belongs_to_collection' in result)
        content = { ...content, collections: result.belongs_to_collection ? true : false }

    if ('seasons' in result)
        content = { ...content, seasons: result.seasons.length }

    return { data: content }
}

export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: baseQueryWithTransform,
    keepUnusedDataFor: 10 * 60,
    endpoints: (builder) => ({
        getMovieContent: builder.query<Content, string>({
            query: (id) => `/api/movie/${id}`
        }),
        getTvContent: builder.query<Content, string>({
            query: (id) => `/api/tv/${id}`
        })
    }),
})

export const {
    useGetMovieContentQuery,
    useGetTvContentQuery
} = contentApi