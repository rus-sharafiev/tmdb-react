import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import imageLoader from '../services/imageLoader'

const preloadImages = async (content: { [index: string]: any }) => {
  let array = await Promise.all(content.results.map(async (item: { [index: string]: any }) => {
    item.poster_path = await imageLoader(item.poster_path, 'w300', '/img/no_image.png')
    return item
  }));
  return array
}

// -------------- Tvs ------------------------------------------------------------------------------------------------------------------
export const fetchPopularTvs = createAsyncThunk('tvs/popular', async (page: number) => {
  const response = await fetch(`/api/tv/popular/${page}`)
  let array = await response.json()
  let content = await preloadImages(array)
  return content
})

export const fetchTopRatedTvs = createAsyncThunk('tvs/top_rated', async (page: number) => {
  const response = await fetch(`/api/tv/top_rated/${page}`)
  let array = await response.json()
  let content = await preloadImages(array)
  return content
})

export const fetchAiringTodayTvs = createAsyncThunk('tvs/airing_today', async (page: number) => {
  try {
    const response = await fetch(`/api/tv/airing_today/${page}`)
    let array = await response.json()
    let content = await preloadImages(array)
    return content
  } catch (e) {
    console.log(e)
  }
})

export const tvsContentSlice = createSlice({
  name: 'tvs',
  initialState: {
    popular: { status: 'idle', content: [], page: 1, firstLoadDone: false },
    top_rated: { status: 'idle', content: [], page: 1, firstLoadDone: false },
    airing_today: { status: 'idle', content: [], page: 1, firstLoadDone: false }
  },
  reducers: {
    ptNext: state => { state.popular.page++ },
    trtNext: state => { state.top_rated.page++ },
    attNext: state => { state.airing_today.page++ }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularTvs.pending, (state) => {
        state.popular.status = 'loading'
      })
      .addCase(fetchPopularTvs.fulfilled, (state, action: PayloadAction<any>) => {
        state.popular.status = 'complete'
        state.popular.content = state.popular.content.concat(action.payload)
        state.popular.firstLoadDone = true
      })
      .addCase(fetchTopRatedTvs.pending, (state) => {
        state.top_rated.status = 'loading'
      })
      .addCase(fetchTopRatedTvs.fulfilled, (state, action: PayloadAction<any>) => {
        state.top_rated.status = 'complete'
        state.top_rated.content = state.top_rated.content.concat(action.payload)
        state.top_rated.firstLoadDone = true
      })
      .addCase(fetchAiringTodayTvs.pending, (state) => {
        state.airing_today.status = 'loading'
      })
      .addCase(fetchAiringTodayTvs.fulfilled, (state, action: PayloadAction<any>) => {
        state.airing_today.status = 'complete'
        state.airing_today.content = state.airing_today.content.concat(action.payload)
        state.airing_today.firstLoadDone = true
      })
  },
})

export const { ptNext, trtNext, attNext } = tvsContentSlice.actions