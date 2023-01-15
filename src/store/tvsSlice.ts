import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import imageLoader from './imageLoader';

const preloadImages = async (content: { [index: string]: any }, size: string) => {
  let array = await Promise.all(content.results.map(async (item: { [index: string]: any }) => {
    item.poster_path = await imageLoader('https://image.tmdb.org/t/p/' + size + item.poster_path);
    return item;
  }));
  return array;
}

// -------------- Tvs ------------------------------------------------------------------------------------------------------------------
export const fetchPopularTvs = createAsyncThunk('tvs/popular', async () => {
  const response = await fetch(`/api/tv/popular`);
  let array = await response.json();
  let content = await preloadImages(array, 'w300');
  return content;
})

export const fetchTopRatedTvs = createAsyncThunk('tvs/top_rated', async () => {
  const response = await fetch(`/api/tv/top_rated`);
  let array = await response.json();
  let content = await preloadImages(array, 'w300');
  return content;
})

export const fetchAiringTodayTvs = createAsyncThunk('tvs/airing_today', async () => {
  try {
    const response = await fetch(`/api/tv/airing_today`);
    let array = await response.json();
    let content = await preloadImages(array, 'w300');
    return content;
  } catch (e) {
    console.log(e)
  }
})

export const tvsContentSlice = createSlice({
  name: 'tvs',
  initialState: {
    popular: { status: 'idle', content: [] },
    top_rated: { status: 'idle', content: [] },
    airing_today: { status: 'idle', content: [] }
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPopularTvs.pending, (state) => {
        state.popular.status = 'loading'
      })
      .addCase(fetchPopularTvs.fulfilled, (state, action: PayloadAction<any>) => {
        state.popular.status = 'complete'
        state.popular.content = action.payload
      })
      .addCase(fetchTopRatedTvs.pending, (state) => {
        state.top_rated.status = 'loading'
      })
      .addCase(fetchTopRatedTvs.fulfilled, (state, action: PayloadAction<any>) => {
        state.top_rated.status = 'complete'
        state.top_rated.content = action.payload
      })
      .addCase(fetchAiringTodayTvs.pending, (state) => {
        state.airing_today.status = 'loading'
      })
      .addCase(fetchAiringTodayTvs.fulfilled, (state, action: PayloadAction<any>) => {
        state.airing_today.status = 'complete'
        state.airing_today.content = action.payload
      })
  },
})