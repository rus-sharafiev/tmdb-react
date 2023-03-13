import { createApi } from '@reduxjs/toolkit/query/react'
import { preloadCollection } from '../../services/preloaders'
import { Collection } from '../../types/collection'

const baseQueryWithPreload = async (url: string) => {
    try {
        let response = await fetch(`https://api.rutmdb.ru${url}`)
        let result = await response.json()
        result = await preloadCollection(result)
        return { data: result }
    } catch (error) {
        return { error: { data: error } }
    }
}

export const collectionApi = createApi({
    reducerPath: 'collectionApi',
    baseQuery: baseQueryWithPreload,
    endpoints: (builder) => ({

        // Collection ----------------------------------------------------------------------
        getMoviesCollection: builder.query<Collection, number>({
            query: (id) => `/api/collection/${id}`
        }),
    }),
})

export const {
    useGetMoviesCollectionQuery
} = collectionApi