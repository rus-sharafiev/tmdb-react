import React from "react"
import { createBrowserRouter } from "react-router-dom"

import App from './app'
import Start from './pages/start'
import Movies from './pages/movies'
import Movie from './pages/MOVIE'
import Tvs from './pages/tvs'
import Tv from './pages/TV'
import People from './pages/people'
import Person from './pages/PERSON'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Start />,
            },
            {
                path: "movies",
                element: <Movies />,
                children: [
                    {
                        path: ":list",
                        element: <Movies />,
                    }
                ]
            },
            {
                path: "tvs",
                element: <Tvs />,
                children: [
                    {
                        path: ":list",
                        element: <Tvs />,
                    }
                ]
            },
            {
                path: "people",
                element: <People />,
                children: [
                    {
                        path: ":list",
                        element: <People />,
                    }
                ]
            },
            {
                path: "movie/:id",
                element: <Movie />,
            },
            {
                path: "tv/:id",
                element: <Tv />,
            },
            {
                path: "person/:id",
                element: <Person />,
            },
        ],
    },
]);