import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface listPages {
    movies: {
        popular: number,
        top_rated: number,
        upcoming: number
    },
    tvs: {
        popular: number,
        top_rated: number,
        airing_today: number
    },
    people: {
        popular: number,
    }
}

interface listPayload {
    type: string,
    page: number
}

const initialState: listPages = {
    movies: {
        popular: 1,
        top_rated: 1,
        upcoming: 1
    },
    tvs: {
        popular: 1,
        top_rated: 1,
        airing_today: 1
    },
    people: {
        popular: 1,
    }
}

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setMoviesPage: (state, action: PayloadAction<listPayload>) => {
            state.movies = { ...state.movies, [action.payload.type]: action.payload.page }
        },
        setTvsPage: (state, action: PayloadAction<listPayload>) => {
            state.tvs = { ...state.tvs, [action.payload.type]: action.payload.page }
        },
        setPeoplePage: (state, action: PayloadAction<listPayload>) => {
            state.people = { ...state.people, [action.payload.type]: action.payload.page }
        },
    }
})

export const { setMoviesPage, setTvsPage, setPeoplePage } = contentSlice.actions

export default contentSlice.reducer