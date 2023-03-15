import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface ListPagePayload {
    type: string,
    page: number
}

interface ContentPayload {
    recommendations: number,
    seasons?: number,
    collections?: boolean
}

const initialState = {
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
    },
    content: {
        seasons: 0,
        recommendations: 0,
        collections: false
    }
}

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setMoviesPage: (state, action: PayloadAction<ListPagePayload>) => {
            state.movies = { ...state.movies, [action.payload.type]: action.payload.page }
        },
        setTvsPage: (state, action: PayloadAction<ListPagePayload>) => {
            state.tvs = { ...state.tvs, [action.payload.type]: action.payload.page }
        },
        setPeoplePage: (state, action: PayloadAction<ListPagePayload>) => {
            state.people = { ...state.people, [action.payload.type]: action.payload.page }
        },
        setContent: (state, action: PayloadAction<ContentPayload>) => {
            state.content = { ...state.content, ...action.payload }
        }
    }
})

export const { setMoviesPage, setTvsPage, setPeoplePage, setContent } = contentSlice.actions

export default contentSlice.reducer