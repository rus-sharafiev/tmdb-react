import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { peopleContentSlice } from './peopleSlice'
import { moviesContentSlice } from './moviesSlice'
import { tvsContentSlice } from './tvsSlice'
import { cardsApi } from './cardsApi'

export const store = configureStore({
    reducer: {
        movies: moviesContentSlice.reducer,
        tvs: tvsContentSlice.reducer,
        people: peopleContentSlice.reducer,

        [cardsApi.reducerPath]: cardsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardsApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch