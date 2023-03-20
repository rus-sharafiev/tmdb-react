import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface ListPagePayload {
    type: string,
    page: number
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
    search: {
        movie: 1,
        tv: 1,
        person: 1
    }
}

const pagesSlice = createSlice({
    name: 'pages',
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
        setSearchPage: (state, action: PayloadAction<ListPagePayload>) => {
            state.search = { ...state.search, [action.payload.type]: action.payload.page }
        },
        resetSearchPages: (state) => {
            state.search = initialState.search
        }
    }
})

export const { setMoviesPage, setTvsPage, setPeoplePage, setSearchPage, resetSearchPages } = pagesSlice.actions

export default pagesSlice.reducer