import { createApi } from '@reduxjs/toolkit/query/react'
import api, { ApiError } from '..'
import { preloadSeason } from '../../services/preloaders'
import { Season } from '../../types/season'

const baseQueryWithPreload = async (url: string) => {
    let result = await api.get(`https://api.rutmdb.ru${url}`) as Season | ApiError
    if ('error' in result) return result

    result = await preloadSeason(result)
    return { data: result }
}

export const seasonApi = createApi({
    reducerPath: 'seasonApi',
    baseQuery: baseQueryWithPreload,
    keepUnusedDataFor: 10 * 60,
    endpoints: (builder) => ({
        getSeason: builder.query<Season, { tvId: string, seasonNumber: string }>({
            query: ({ tvId, seasonNumber }) => `/api/tv/${tvId}/season/${seasonNumber}`
        }),
    }),
})

export const {
    useGetSeasonQuery
} = seasonApi