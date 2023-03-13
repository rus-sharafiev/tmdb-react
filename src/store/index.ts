import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import listPageReduces from './listPageSlice'
import { cardsApi } from '../services/api/cardsApi'
import { collectionApi } from '../services/api/collectionApi'
import { seasonApi } from '../services/api/seasonApi'

export const store = configureStore({
    reducer: {
        page: listPageReduces,

        [cardsApi.reducerPath]: cardsApi.reducer,
        [collectionApi.reducerPath]: collectionApi.reducer,
        [seasonApi.reducerPath]: seasonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
            .concat(cardsApi.middleware)
            .concat(collectionApi.middleware)
            .concat(seasonApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch