import { createApi } from '@reduxjs/toolkit/query/react'
import { preloadCards } from '../services/preloaders'
import { Collection } from '../types'

const baseQueryWithPreload = async (url: string) => {
    try {
        let response = await fetch(url)
        let result = await response.json()
        result = await preloadCards(result, true)
        return { data: result }
    } catch (error) {
        return { error: { data: error } }
    }
}

export const collectionApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: baseQueryWithPreload,
    endpoints: (builder) => ({

        // Collection ----------------------------------------------------------------------
        getMoviesCollection: builder.query<Collection, number>({
            query: (id) => `https://api.rutmdb.ru/api/collection/${id}`
        }),
    }),
})

export const {
    useGetMoviesCollectionQuery
} = collectionApi