import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Movie from "../types/movie"
import Rating from "../ui/rating"
import CircularProgress from '../ui/cpi'
import { preloadMovie } from "../services/preloaders"
import Recommendations from "../components/recommendations"
import Collection from "../components/collection"
import Credits from "../components/credits"
import Videos from "../components/videos"
import useMaterialTheme from "../hooks/useMaterialTheme"
import { MovieSkeleton } from "../ui/skeletons"


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
    const [movie, setMovie] = useState<Movie>()
    const [themeLoaded, setThemeImage, setThemeLoaded] = useMaterialTheme()
    const [watchProviders, setWatchProviders] = useState()

    // Fetch movie JSON
    useEffect(() => {

        setMovie(undefined)
        setThemeLoaded(false)

        id &&
            fetch(`/api/movie/${id}`)
                .then(res => res.json())
                .then(obj => preloadMovie(obj))
                .then(movie => setMovie(movie))
    }, [id])

    // Set Material theme
    useEffect(() => {
        if (!movie) return window.scrollTo({ top: 0, behavior: 'smooth' })

        console.log(movie)

        // fetch(`/api/movie/${id}/watch`)
        //     .then(res => res.json())
        //     .then(watchProviders => setWatchProviders(watchProviders?.results?.RU))

    }, [movie])

    // Long russian date converter
    const localDate = (d: string) => {
        if (!d) return 'Не объявлена'
        let date = new Date(d)
        return date.toLocaleString('ru', { dateStyle: "long" })
    }

    return (
        <>
            {movie &&
                <main className={themeLoaded ? 'movie' : 'movie hidden'}>
                    {movie.backdrop_path && <img src={movie.backdrop_path} alt='backdrop' className="backdrop" />}
                    <div className="color-overlay" />
                    <img
                        src={movie?.poster_path}
                        alt='poster'
                        className="poster"
                        onLoad={(e) => setThemeImage(e.target as HTMLImageElement)}
                        crossOrigin='anonymous'
                    />
                    <div className="info">
                        <div className="top">
                            <div className="title">{movie.title}</div>
                            <div className="original_title">{movie.original_title}</div>
                            <div className="tagline">{movie.tagline}</div>
                            {movie.genres.length > 0 &&
                                <div className="genres">Жанр<span>{movie.genres.map(genre =>
                                    <div key={`genre-${genre.id}`}>{genre.name}</div>
                                )}</span></div>}
                            {movie.overview && <div className="overview">Обзор<span>{movie.overview}</span></div>}
                        </div>
                        <div className="bottom">
                            <div className="status">Статус<span>{status(movie.status)}</span></div>
                            <div className="release_date">Дата премьеры<span>{localDate(movie.release_date)}</span></div>
                            <div className="budget">Бюджет<span>$ {movie?.budget.toLocaleString('ru')}</span></div>
                            <div className="revenue">Сборы<span>$ {movie?.revenue.toLocaleString('ru')}</span></div>

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
                    {movie.videos.results.length > 0 && <Videos yt={movie.videos.results} />}
                    {themeLoaded && movie.credits && <Credits data={movie.credits} />}
                    {themeLoaded && movie.belongs_to_collection && <Collection id={movie.belongs_to_collection.id} />}
                    {themeLoaded && movie.recommendations.results.length > 0 && <Recommendations cards={movie.recommendations} />}

                </main>}
            {!themeLoaded &&
                <main className='movie skeleton'>
                    <MovieSkeleton />
                    <Credits data={null} />
                </main>}
        </>
    )
}

export default Movie