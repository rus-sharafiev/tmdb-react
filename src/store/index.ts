import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import contentReducer from './contentSlice'
import { cardsApi } from '../services/api/cardsApi'
import { collectionApi } from '../services/api/collectionApi'
import { seasonApi } from '../services/api/seasonApi'
import { mediaApi } from '../services/api/mediaApi'
import { recommendationsApi } from '../services/api/recommendationsApi'

export const store = configureStore({
    reducer: {
        content: contentReducer,

        [cardsApi.reducerPath]: cardsApi.reducer,
        [collectionApi.reducerPath]: collectionApi.reducer,
        [seasonApi.reducerPath]: seasonApi.reducer,
        [mediaApi.reducerPath]: mediaApi.reducer,
        [recommendationsApi.reducerPath]: recommendationsApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
            .concat(cardsApi.middleware)
            .concat(collectionApi.middleware)
            .concat(seasonApi.middleware)
            .concat(mediaApi.middleware)
            .concat(recommendationsApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch