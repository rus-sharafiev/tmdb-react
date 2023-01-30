import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import proxyImageLoader from "../helpers/proxyImageLoader"
import { Movie } from "../types/movie"
import useVibrant from "../hooks/useVibrant"
import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities"
import Rating from "../ui/rating"
import CircularProgress from '../ui/cpi'

const preloadMovie = async (content: Movie) => {
    content.backdrop_path = await proxyImageLoader(content.backdrop_path, 'w1280')
    content.poster_path = await proxyImageLoader(content.poster_path, 'w780')
    if (content.belongs_to_collection)
        content.belongs_to_collection.poster_path = await proxyImageLoader(content.belongs_to_collection.poster_path, 'w342')
    // content.images.logos.length > 0 &&
    //     content.images.logos.map(async (logo) => logo.file_path = await proxyImageLoader(logo.file_path, 'w500'))
    return content;
}

const Movie: React.FC = () => {
    let { id } = useParams()
    const [movie, setMovie] = useState<Movie>()
    const [vibrantPalette, setImgForVibrant] = useVibrant()

    // Fetch movie JSON
    useEffect(() => {
        fetch(`/api/movie/${id}`)
            .then(res => res.json())
            .then(obj => preloadMovie(obj))
            .then(movie => setMovie(movie))
    }, [id])

    // Get Vibrant palette
    useEffect(() => {
        movie && console.log(movie)
        movie && setImgForVibrant(movie.poster_path)
    }, [movie])

    // Set Material Theme
    useEffect(() => {
        if (vibrantPalette && vibrantPalette.Vibrant && vibrantPalette.Muted) {
            const theme = themeFromSourceColor(argbFromHex(vibrantPalette.Vibrant));
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(theme, { target: document.body, dark: false });
        }
        return () => document.body.removeAttribute('style')

    }, [vibrantPalette])

    // Long russian date converter
    const localDate = (d: string) => {
        let date = new Date(d)
        return date.toLocaleString('ru', { dateStyle: "long" })
    }

    if (!movie) return <CircularProgress />

    return (
        <main className="movie">
            <img src={movie.backdrop_path} alt='backdrop' className="backdrop" />
            <div className="color-overlay" />
            <img src={movie.poster_path} alt='poster' className="poster" />
            <div className="info">
                <div className="title">
                    {movie.title}
                    <span>{movie.original_title}</span>
                </div>
                <div className="tagline">{movie.tagline}</div>
                <div className="overview"><span>Обзор</span>{movie.overview}</div>
                <div className="release_date"><span>Дата премьеры</span>{localDate(movie.release_date)}</div>
                <div className="budget"><span>Бюджет</span>$ {movie.budget.toLocaleString('ru')}</div>
                <div className="revenue"><span>Сборы</span>$ {movie.revenue.toLocaleString('ru')}</div>
            </div>
            <div className="rating-container">
                <Rating
                    radius={40.5}
                    rating={parseFloat(movie.vote_average ? movie.vote_average.toFixed(1) : '0')}
                    votes={movie.vote_count}
                />
                <span>Голосов {movie.vote_count}</span>
            </div>
            {movie.belongs_to_collection &&
                <div className="collection">
                    <img src={movie.belongs_to_collection.poster_path} alt="collection poster" />
                    <div>{movie.belongs_to_collection.name}</div>
                </div>}
            {movie.videos.results.length > 0 &&
                <div className="video">
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${movie.videos.results[0].key}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen
                    />
                </div>}


        </main>
    )
}

export default Movie