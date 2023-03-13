import { createApi } from '@reduxjs/toolkit/query/react'
import { preloadSeason } from '../../services/preloaders'
import { Season } from '../../types/season'

const baseQueryWithPreload = async (url: string) => {
    try {
        let response = await fetch(`https://api.rutmdb.ru${url}`)
        if (response.status !== 200)
            return {
                error: {
                    status: response.status,
                    data: response.statusText
                }
            }
        let result = await response.json()
        result = await preloadSeason(result) as Season
        return { data: result }

    } catch (error) {
        return {
            error: {
                data: error
            }
        }
    }
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