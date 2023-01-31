import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import proxyImageLoader from "../helpers/proxyImageLoader"
import Movie from "../types/movie"
import { Collection, Part } from "../types/collection"
import Rating from "../ui/rating"
import CircularProgress from '../ui/cpi'
import useMaterialTheme from "../hooks/useMaterialTheme"

const preloadCollection = async (content: Collection) => {
    content.backdrop_path = await proxyImageLoader(content.backdrop_path, 'w1280')
    content.poster_path = await proxyImageLoader(content.poster_path, 'w780')
    content.parts = await Promise.all(
        content.parts.map(async (part: Part) => {
            if (!part.poster_path) return part
            part.poster_path = await proxyImageLoader(part.poster_path, 'w300')
            return part
        })
    )
    return content;
}

const preloadMovie = async (content: Movie) => {
    content.backdrop_path = await proxyImageLoader(content.backdrop_path, 'w1280')
    content.poster_path = await proxyImageLoader(content.poster_path, 'w780')
    // content.images.logos.length > 0 &&
    //     content.images.logos.map(async (logo) => logo.file_path = await proxyImageLoader(logo.file_path, 'w500'))
    return content;
}

const Movie: React.FC = () => {
    let { id } = useParams()
    const [movie, setMovie] = useState<Movie>()
    const [collection, setCollection] = useState<Collection>()
    const [themeIsSet, setImagePath] = useMaterialTheme()

    // Fetch movie JSON
    useEffect(() => {
        id &&
            fetch(`/api/movie/${id}`)
                .then(res => res.json())
                .then(obj => preloadMovie(obj))
                .then(movie => setMovie(movie))
    }, [id])

    // Set Material theme & fetch collection
    useEffect(() => {
        if (!movie) return

        // console.log(movie)
        setImagePath(movie.poster_path)

        if (movie.belongs_to_collection)
            fetch(`/api/collection/${movie.belongs_to_collection.id}`)
                .then(res => res.json())
                .then(obj => preloadCollection(obj))
                .then(collection => setCollection(collection))
    }, [movie])

    useEffect(() => {
        // collection && console.log(collection)
    }, [collection])

    // Long russian date converter
    const localDate = (d: string) => {
        let date = new Date(d)
        return date.toLocaleString('ru', { dateStyle: "long" })
    }

    if (!(movie && themeIsSet)) return <CircularProgress />

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
            {movie.videos.results.length > 0 &&
                <div className="video">
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${movie.videos.results[0].key}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen
                    />
                </div>}
            {collection &&
                <>
                    <img
                        className="collection-backdrop"
                        src={collection.backdrop_path}
                        alt="collection backdrop"
                    />
                    <div className="collection-overlay">
                        <div>{collection.name}</div>
                    </div>
                    <div className="collection">
                    </div>
                </>}


        </main>
    )
}

export default Movie