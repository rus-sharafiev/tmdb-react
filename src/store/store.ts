import { configureStore } from '@reduxjs/toolkit'
import { moviesContentSlice, tvsContentSlice, peopleContentSlice } from './contentSlice'

export const store = configureStore({
  reducer: {
    movies: moviesContentSlice.reducer,
    tvs: tvsContentSlice.reducer,
    people: peopleContentSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch