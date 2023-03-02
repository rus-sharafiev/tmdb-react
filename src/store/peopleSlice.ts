import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { preloadCards } from '../services/preloaders'
import { PersonCard } from '../types/cards'

const getRussianName = async (id: number) => {
  const cyrillicPattern = /^[\u0410-\u044F\s]+$/

  let response = await fetch(`/api/person/${id}`)
  let person = await response.json()

  return new Promise<string>((resolve, reject) => {
    person?.also_known_as?.map((name: string) => {
      if (cyrillicPattern.test(name)) {
        return resolve(name)
      }
    })
    resolve(person.name)
  })
}

interface RusNames { id: number, name: string }

const getRussianNamesArray = async (people: PersonCard[]) => {
  let arr: RusNames[] = await Promise.all(people.map(async (person: PersonCard) => {
    let russianName = await getRussianName(person.id)
    return { id: person.id, name: russianName }
  }))
  return arr
}

// -------------- People ------------------------------------------------------------------------------------------------------------------
export const fetchPopularPeople = createAsyncThunk('people/popular', async (page: number) => {
  const response = await fetch(`/api/person/popular/${page}`)
  let array = await response.json()
  let content = await preloadCards(array)
  return content;
})

export const fetchRussianNames = createAsyncThunk('people/russianNames', async (page: number) => {
  const response = await fetch(`/api/person/popular/${page}`)
  let array = await response.json()
  let content = await getRussianNamesArray(array.results)
  return content
})

export const peopleContentSlice = createSlice({
  name: 'people',
  initialState: {
    popular: { status: 'idle', content: [], page: 1 },
    russianNames: { status: 'idle', content: [] }
  },
  reducers: {
    ppNext: state => { state.popular.page++ }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularPeople.pending, (state) => {
        state.popular.status = 'loading'
      })
      .addCase(fetchPopularPeople.fulfilled, (state, action: PayloadAction<any>) => {
        state.popular.status = 'complete'
        state.popular.content = state.popular.content.concat(action.payload)
      })
      .addCase(fetchRussianNames.fulfilled, (state, action: PayloadAction<any>) => {
        state.russianNames.status = 'complete'
        state.russianNames.content = state.russianNames.content.concat(action.payload)
      })
  },
})

export const { ppNext } = peopleContentSlice.actions