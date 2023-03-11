import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cardsApi } from './api/cardsApi'
import { collectionApi } from './api/collectionApi'
import { listPageSlice } from './listPageSlice'

export const store = configureStore({
    reducer: {
        page: listPageSlice.reducer,

        [cardsApi.reducerPath]: cardsApi.reducer,
        [collectionApi.reducerPath]: collectionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(cardsApi.middleware)
            .concat(collectionApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch