import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

const initialState: {
    movie: undefined | {
        pages: number,
        qtt: number
    },
    tv: undefined | {
        pages: number,
        qtt: number
    },
    person: undefined | {
        pages: number,
        qtt: number
    },
} = {
    movie: undefined,
    tv: undefined,
    person: undefined,
}

const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        setMoviesResults: (state, action: PayloadAction<typeof initialState.movie>) => {
            state.movie = action.payload
        },
        setTvsResults: (state, action: PayloadAction<typeof initialState.tv>) => {
            state.tv = action.payload
        },
        setPeopleResults: (state, action: PayloadAction<typeof initialState.person>) => {
            state.person = action.payload
        },
        resetResults: (state) => {
            state.movie = initialState.movie,
                state.person = initialState.person,
                state.tv = initialState.tv
        }
    }
})

export const { setMoviesResults, setTvsResults, setPeopleResults, resetResults } = searchResultsSlice.actions

export default searchResultsSlice.reducer