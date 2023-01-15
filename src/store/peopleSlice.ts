import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import imageLoader from './imageLoader'

const preloadImages = async (content: { [index: string]: any }, size: string) => {
  let array = await Promise.all(content.results.map(async (item: { [index: string]: any }) => {
    item.profile_path = await imageLoader('https://image.tmdb.org/t/p/' + size + item.profile_path);
    return item;
  }));
  return array;
}

// -------------- People ------------------------------------------------------------------------------------------------------------------
export const fetchPopularPeople = createAsyncThunk('people/popular', async () => {
  const response = await fetch(`/api/person/popular`);
  let array = await response.json();
  let content = await preloadImages(array, 'w300');
  return content;
})

export const peopleContentSlice = createSlice({
  name: 'people',
  initialState: {
    popular: { status: 'idle', content: [] },
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPopularPeople.pending, (state) => {
        state.popular.status = 'loading'
      })
      .addCase(fetchPopularPeople.fulfilled, (state, action: PayloadAction<any>) => {
        state.popular.status = 'complete'
        state.popular.content = action.payload
      })
  },
})