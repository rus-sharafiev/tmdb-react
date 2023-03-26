import { createApi } from '@reduxjs/toolkit/query/react'
import api, { ApiError } from '..'
import { preloadCollection } from '../../services/preloaders'
import { Collection } from '../../types/collection'

const baseQueryWithPreload = async (url: string) => {
    let result = await api.get(url) as Collection | ApiError
    if ('error' in result) return result

    result = await preloadCollection(result)
    return { data: result }
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