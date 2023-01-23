import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import imageLoader from './imageLoader';

const preloadImages = async (content: { [index: string]: any }, size: string, person?: boolean) => {
  let array = await Promise.all(content.results.map(async (item: { [index: string]: any }) => {
    item.poster_path = item.poster_path ? await imageLoader('https://image.tmdb.org/t/p/' + size + item.poster_path) : '/img/no_image.png'
    return item;
  }));
  return array;
}

// -------------- Movies ------------------------------------------------------------------------------------------------------------------
export const fetchPopularMovies = createAsyncThunk('movies/popular', async (page: number) => {
  const response = await fetch(`/api/movie/popular/${page}`);
  let array = await response.json();
  let content = await preloadImages(array, 'w300');
  return content;
})

export const fetchTopRatedMovies = createAsyncThunk('movies/top_rated', async (page: number) => {
  const response = await fetch(`/api/movie/top_rated/${page}`);
  let array = await response.json();
  let content = await preloadImages(array, 'w300');
  return content;
})

export const fetchUpcomingMovies = createAsyncThunk('movies/upcoming', async (page: number) => {
  try {
    const response = await fetch(`/api/movie/upcoming/${page}`);
    let array = await response.json();
    let content = await preloadImages(array, 'w300');
    return content;
  } catch (e) {
    console.log(e)
  }
})

export const moviesContentSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: { status: 'idle', content: [], page: 1, firstLoadDone: false },
    top_rated: { status: 'idle', content: [], page: 1, firstLoadDone: false },
    upcoming: { status: 'idle', content: [], page: 1, firstLoadDone: false }
  },
  reducers: {
    pmNext: state => { state.popular.page++ },
    trmNext: state => { state.top_rated.page++ },
    umNext: state => { state.upcoming.page++ }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.status = 'loading'
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action: PayloadAction<any>) => {
        state.popular.status = 'complete'
        state.popular.content = state.popular.content.concat(action.payload)
        state.popular.firstLoadDone = true
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.top_rated.status = 'loading'
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action: PayloadAction<any>) => {
        state.top_rated.status = 'complete'
        state.top_rated.content = state.top_rated.content.concat(action.payload)
        state.top_rated.firstLoadDone = true
      })
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.upcoming.status = 'loading'
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action: PayloadAction<any>) => {
        state.upcoming.status = 'complete'
        state.upcoming.content = state.upcoming.content.concat(action.payload)
        state.upcoming.firstLoadDone = true
      })
  },
})

export const { pmNext, trmNext, umNext } = moviesContentSlice.actions