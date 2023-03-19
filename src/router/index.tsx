import React, { ReactNode } from "react"
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom"

import App from "../App"
import Home from '../pages/Home'
import Movies from '../pages/Movies'
import Movie from '../pages/Movie'
import Tvs from '../pages/Tvs'
import Tv from '../pages/Tv'
import People from '../pages/People'
import Person from '../pages/Person'
import Season from '../pages/Season'
import Search from "../pages/Search"

export const AppRoutes: ReactNode =
    <Route path="/" element={<App />}>

        <Route index element={<Home />} />

        <Route path="/movie" element={<Navigate to="/movie/list" replace={true} />} />
        <Route path="/movie/list/:list?" element={<Movies />} />
        <Route path="/movie/:id" element={<Movie />} />

        <Route path="/tv" element={<Navigate to="/tv/list" replace={true} />} />
        <Route path="/tv/list/:list?" element={<Tvs />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/tv/:tvId/season/:seasonNumber" element={<Season />} />

        <Route path="/person" element={<Navigate to="/person/list" replace={true} />} />
        <Route path="/person/list/:list?" element={<People />} />
        <Route path="/person/:id" element={<Person />} />

        <Route path="/search/:list/:query" element={<Search />} />

    </Route>

const router = createBrowserRouter(
    createRoutesFromElements(AppRoutes)
)

export default router