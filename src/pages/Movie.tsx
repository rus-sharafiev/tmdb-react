import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Movie from "../types/movie"
import Rating from "../components/ui/rating"
import Recommendations from "../components/Recommendations"
import Collection from "../components/Collection"
import Credits from "../components/Credits"
import Videos from "../components/Videos"
import { MovieSkeleton } from "../components/ui/skeletons"
import { Content } from "../types"
import { localDate } from "../services/dateConverter"
import { useGetMovieQuery } from "../services/api/mediaApi"
import { applyTheme } from "@material/material-color-utilities"
import { useGetMovieContentQuery } from "../services/api/contentApi"
import { PosterImagePlaceholder } from "../components/ui/imagePlaceholders"


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
    const { id } = useParams()
    const content = id ? useGetMovieContentQuery(id) : undefined
    const movie = id ? useGetMovieQuery(id) : undefined
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        document.body.removeAttribute('style')
        setIsVisible(false)
    }, [id])

    useEffect(() => {
        if (movie?.isFetching) return

        movie?.data?.theme &&
            applyTheme(movie.data.theme, { target: document.body, dark: false })

        setIsVisible(true)

        return () => document.body.removeAttribute('style')


    }, [movie])

    return (
        <>
            {movie?.data && !movie?.isFetching &&
                <main className={isVisible ? 'movie-tv' : 'movie-tv hidden'}>
                    {movie.data.backdrop_path &&
                        <img
                            src={movie.data.backdrop_path}
                            alt='backdrop'
                            className="backdrop"
                        />}
                    <div className="color-overlay" />
                    {movie.data.poster_path
                        ?
                        <img
                            src={movie.data.poster_path}
                            alt='poster'
                            className="poster"
                        />
                        : <PosterImagePlaceholder />
                    }
                    <div className="info">
                        <div className="top">
                            <div className="title">{movie.data.title}</div>
                            <div className="original_title">{movie.data.original_title}</div>
                            <div className="tagline">{movie.data.tagline}</div>
                            {movie.data.genres.length > 0 &&
                                <div className="genres">Жанр<span>{movie.data.genres.map(genre =>
                                    <div key={`genre-${genre.id}`}>{genre.name}</div>
                                )}</span></div>}
                            {movie.data.overview && <div className="overview">Обзор<span>{movie.data.overview}</span></div>}
                        </div>
                        <div className="bottom">
                            <div className="status">Статус<span>{status(movie.data.status)}</span></div>
                            <div className="release_date">Дата премьеры<span>{localDate(movie.data.release_date)}</span></div>
                            <div className="budget">Бюджет<span>$ {movie.data.budget.toLocaleString('ru')}</span></div>
                            <div className="revenue">Сборы<span>$ {movie.data.revenue.toLocaleString('ru')}</span></div>

                        </div>
                    </div>
                    {movie.data.production_companies.length > 0 &&
                        <div className="companies">
                            {movie.data.production_companies.map((company) =>
                                company.logo_path &&
                                <img src={company.logo_path} alt='logo' key={'conpany-' + company.id} />)}
                        </div>}
                    <div className="rating-container">
                        <span>Пользовательский рейтинг</span>
                        <Rating
                            radius={40.5}
                            rating={parseFloat(movie.data.vote_average ? movie.data.vote_average.toFixed(1) : '0')}
                            votes={movie.data.vote_count}
                        />
                        <span>Голосов {movie.data.vote_count}</span>
                    </div>
                    <Videos yt={movie.data.videos.results} />
                    <Credits id={movie.data.id} />
                    {!content?.isFetching && content?.data?.collections &&
                        <Collection id={movie.data.belongs_to_collection?.id} />}
                    {!content?.isFetching && content?.data?.recommendations && content.data.recommendations > 0 &&
                        <Recommendations id={movie.data.id} type='movie' qtt={content.data.recommendations} />}
                </main>}

            {movie?.isFetching &&
                <main className='movie-tv skeleton'>
                    <MovieSkeleton />
                    <Credits />
                    {!content?.isFetching && content?.data?.collections && <Collection />}
                    {!content?.isFetching && content?.data?.recommendations && content.data.recommendations > 0 &&
                        <Recommendations qtt={content.data.recommendations} />}
                </main>}
        </>
    )
}

export default Movie