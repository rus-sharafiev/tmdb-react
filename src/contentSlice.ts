import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

const imageLoader = async (url: string) => {
  return new Promise((res) => {
      let img = new Image();
      img.src = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=' + encodeURIComponent(url);
      img.onload = () => {
          res(img.src)
      }
  });
}

const preloadImages = async (content: {[index: string]: any}, size: string, person?: boolean) => {
  let array = await Promise.all( content.results.map( async (item: {[index: string]: any}) => {
      if (person) {
          item.profile_path = await imageLoader('https://image.tmdb.org/t/p/' + size + item.profile_path);
      } else {
          item.poster_path = await imageLoader('https://image.tmdb.org/t/p/' + size + item.poster_path);
      }
      return item;
  }));
  return array;
}

// -------------- Movies ------------------------------------------------------------------------------------------------------------------
export const fetchMoviesContent = createAsyncThunk('movies/content', async (list: string) => {
    const response = await fetch(`/api/movie/${list}`);
    let array = await response.json();
    let content = await preloadImages(array, 'w300');
    return content;
})

export const moviesContentSlice = createSlice({
  name: 'content',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMoviesContent.fulfilled, (state, action: PayloadAction<any>) => {
      return action.payload
    })
  },
})

// -------------- Tvs ---------------------------------------------------------------------------------------------------------------------
export const fetchTvsContent = createAsyncThunk('tvs/content', async (list: string) => {
  const response = await fetch(`/api/tv/${list}`);
  let array = await response.json();
  let content = await preloadImages(array, 'w300');
  return content;
})

export const tvsContentSlice = createSlice({
name: 'content',
initialState: [],
reducers: {},
extraReducers(builder) {
  builder.addCase(fetchTvsContent.fulfilled, (state, action: PayloadAction<any>) => {
    return action.payload
  })
},
})

// -------------- People ------------------------------------------------------------------------------------------------------------------
export const fetchPeopleContent = createAsyncThunk('people/content', async (list: string) => {
  const response = await fetch(`/api/person/${list}`);
  let array = await response.json();
  let content = await preloadImages(array, 'w300', true);
  return content;
})

export const peopleContentSlice = createSlice({
name: 'content',
initialState: [],
reducers: {},
extraReducers(builder) {
  builder.addCase(fetchPeopleContent.fulfilled, (state, action: PayloadAction<any>) => {
    return action.payload
  })
},
})