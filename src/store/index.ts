import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { rootReducer, middlewareArray } from './reducers'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) =>
        gDM({ serializableCheck: false }).concat(middlewareArray)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch