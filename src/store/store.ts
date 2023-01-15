import { configureStore } from '@reduxjs/toolkit'
import { peopleContentSlice } from './peopleSlice'
import { moviesContentSlice } from './moviesSlice'
import { tvsContentSlice } from './tvsSlice'

export const store = configureStore({
  reducer: {
    movies: moviesContentSlice.reducer,
    tvs: tvsContentSlice.reducer,
    people: peopleContentSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch