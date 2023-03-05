import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { peopleContentSlice } from './peopleSlice'
import { tvsContentSlice } from './tvsSlice'
import { cardsApi } from './cardsApi'
import { listPageSlice } from './listPageSlice'

export const store = configureStore({
    reducer: {
        tvs: tvsContentSlice.reducer,
        people: peopleContentSlice.reducer,
        page: listPageSlice.reducer,

        [cardsApi.reducerPath]: cardsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardsApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch