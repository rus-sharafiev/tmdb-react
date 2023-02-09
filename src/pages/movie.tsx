import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Movie from "../types/movie"
import Rating from "../ui/rating"
import CircularProgress from '../ui/cpi'
import useMaterialTheme from "../hooks/useMaterialTheme"
import { preloadCollection, preloadMovie } from "../services/preloaders"
import Recommendations from "../components/recommendations"
import Collection from "../components/collection"
import Credits from "../components/credits"


// Movie status
const status = (status: string) => {
    switch (status) {
        case 'Rumored': return 'Слухи'
        case 'Planned': return 'Планируется'
        case 'In Production': return 'В производстве'
        case 'Post Production': return 'Пост-продакшн'
        case 'Released': return 'Выпущен'
        case 'Canceled': return 'Отменен'
    }
}

const Movie: React.FC = () => {
    let { id } = useParams()
    const [themeLoaded, setImagePath, setThemeLoaded] = useMaterialTheme()
    const [movie, setMovie] = useState<Movie>()
    const [activeVideo, setActiveVideo] = useState<string>('official')
    const [collection, setCollection] = useState<Collection>()
    const [videos, setVideos] = useState<{
        official: string | undefined,
        ru: string | undefined
    }>()
    const [watchProviders, setWatchProviders] = useState()

    // Fetch movie JSON
    useEffect(() => {
        // setMovie(undefined) // reset movie
        // setThemeLoaded(false) // reset themeLoaded
        id &&
            fetch(`/api/movie/${id}`)
                .then(res => res.json())
                .then(obj => preloadMovie(obj))
                .then(movie => setMovie(movie))
    }, [id])

    // Set Material theme & fetch collection
    useEffect(() => {
        if (!movie) return

        console.log(movie)
        setImagePath(movie.poster_path) // to generate theme

        if (movie.videos.results.length > 0) {
            setVideos({
                official: movie.videos.results.reverse().find(r => r.type === "Trailer" && r.official && r.iso_639_1 === 'en')?.key,
                ru: movie.videos.results.reverse().find(r => r.type === "Trailer" && r.iso_639_1 === 'ru')?.key
            })
        }

        // Fetch and preload collections
        if (movie.belongs_to_collection)
            fetch(`/api/collection/${movie.belongs_to_collection.id}`)
                .then(res => res.json())
                .then(obj => preloadCollection(obj))
                .then(collection => setCollection(collection))

        // fetch(`/api/movie/${id}/watch`)
        //     .then(res => res.json())
        //     .then(watchProviders => setWatchProviders(watchProviders?.results?.RU))

    }, [movie])

    // Long russian date converter
    const localDate = (d: string) => {
        let date = new Date(d)
        return date.toLocaleString('ru', { dateStyle: "long" })
    }

    if (!(movie)) return <CircularProgress className="cpi" />
    // console.log(watchProviders)

    return (
        <main className="movie">
            {movie.backdrop_path && <img src={movie.backdrop_path} alt='backdrop' className="backdrop" />}
            <div className="color-overlay" />
            <img src={movie.poster_path} alt='poster' className="poster" />
            <div className="info">
                <div className="top">
                    <div className="title">{movie.title}</div>
                    <div className="original_title">{movie.original_title}</div>
                    <div className="tagline">{movie.tagline}</div>
                    <div className="overview">Обзор<span>{movie.overview ?? 'Нет обзора'}</span></div>
                </div>
                <div className="bottom">
                    <div className="status">Статус<span>{status(movie.status)}</span></div>
                    <div className="release_date">Дата премьеры<span>{localDate(movie.release_date)}</span></div>
                    <div className="budget">Бюджет<span>$ {movie.budget.toLocaleString('ru')}</span></div>
                    <div className="revenue">Сборы<span>$ {movie.revenue.toLocaleString('ru')}</span></div>

                </div>
            </div>
            {movie.production_companies.length > 0 &&
                <div className="companies">
                    {movie.production_companies.map((company) =>
                        company.logo_path &&
                        <img src={company.logo_path} alt='logo' key={'conpany-' + company.id} />)}
                </div>}
            <div className="rating-container">
                <span>Пользовательский рейтинг</span>
                <Rating
                    radius={40.5}
                    rating={parseFloat(movie.vote_average ? movie.vote_average.toFixed(1) : '0')}
                    votes={movie.vote_count}
                />
                <span>Голосов {movie.vote_count}</span>
            </div>
            {movie.videos.results.length > 0 && videos &&
                <div className="video">
                    {videos.ru &&
                        <div>
                            <span
                                className={activeVideo === 'official' ? 'active' : ''}
                                onClick={() => setActiveVideo('official')}
                            >Оффициальный трейлер</span>
                            <span
                                className={activeVideo === 'ru' ? 'active' : ''}
                                onClick={() => setActiveVideo('ru')}
                            >Русский трейлер</span>
                        </div>}
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activeVideo === 'official'
                            ? videos.official
                            : videos.ru
                            }`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>}
            {movie.credits && <Credits data={movie.credits} />}
            {collection && <Collection data={collection} />}
            {movie.recommendations?.results?.length > 0 && <Recommendations data={movie.recommendations} />}

        </main>
    )
}

export default Movie