import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import proxyImageLoader from "../helpers/proxyImageLoader"
import { Movie } from "../types/movie"
import useVibrant from "../hooks/useVibrant"
import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities"

const preloadMovie = async (content: Movie) => {
    content.backdrop_path = await proxyImageLoader(content.backdrop_path, 'w1280')
    content.poster_path = await proxyImageLoader(content.poster_path, 'w500')
    return content;
}

const Movie: React.FC = () => {
    let { id } = useParams()
    const [movie, setMovie] = useState<Movie>()
    const [vibrantPalette, setImgForVibrant] = useVibrant()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(`/api/movie/${id}`)
            .then(res => res.json())
            .then(obj => preloadMovie(obj))
            .then(movie => setMovie(movie))
            .finally(() => setIsLoaded(true))
    }, [id])

    useEffect(() => {
        movie && console.log(movie)
        movie && setImgForVibrant(movie.poster_path)
    }, [movie])

    useEffect(() => {
        if (vibrantPalette && vibrantPalette.Vibrant && vibrantPalette.Muted) {
            const theme = themeFromSourceColor(argbFromHex(vibrantPalette.Vibrant));
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(theme, { target: document.body, dark: false });
        }
        return () => document.body.removeAttribute('style')

    }, [vibrantPalette])

    if (!movie) return null

    return (
        <main className="movie">
            <img src={movie.backdrop_path} alt='backdrop' className="backdrop" />
            <div className="color-overlay" />
            <img src={movie.poster_path} alt='poster' className="poster" />
            <div className="info">
            </div>
        </main>
    )
}

export default Movie