import { combineReducers } from "@reduxjs/toolkit"

import pagesReducer from './pagesSlice'
import searchResultsReducer from './searchResultsSlice'
import { cardsApi } from '../../services/api/cardsApi'
import { collectionApi } from '../../services/api/collectionApi'
import { seasonApi } from '../../services/api/seasonApi'
import { mediaApi } from '../../services/api/mediaApi'
import { recommendationsApi } from '../../services/api/recommendationsApi'
import { creditsApi } from '../../services/api/creditsApi'
import { contentApi } from '../../services/api/contentApi'
import { searchApi } from "../../services/api/searchApi"

export const rootReducer = combineReducers({
    pages: pagesReducer,
    searchResults: searchResultsReducer,

    [cardsApi.reducerPath]: cardsApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [seasonApi.reducerPath]: seasonApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    [recommendationsApi.reducerPath]: recommendationsApi.reducer,
    [creditsApi.reducerPath]: creditsApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
})

export const middlewareArray = [
    cardsApi.middleware,
    collectionApi.middleware,
    seasonApi.middleware,
    mediaApi.middleware,
    recommendationsApi.middleware,
    creditsApi.middleware,
    contentApi.middleware,
    searchApi.middleware
]