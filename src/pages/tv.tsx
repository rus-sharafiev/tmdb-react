import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Tv from "../types/tv"
import Rating from "../ui/rating"
import { preloadTv } from "../services/preloaders"
import Recommendations from "../components/recommendations"
import Credits from "../components/credits"
import Videos from "../components/videos"
import useMaterialTheme from "../hooks/useMaterialTheme"
import { MovieSkeleton } from "../ui/skeletons"
import { Content } from "../types"

// Tv status
const status = (status: string) => {
    switch (status) {
        case 'Rumored': return 'Слухи'
        case 'Planned': return 'Планируется'
        case 'Returning Series': return 'Продолжается'
        case 'Ended': return 'Завершился'
        case 'Released': return 'Выпущен'
        case 'Canceled': return 'Отменен'
    }
}

const Tv: React.FC = () => {
    let { id } = useParams()
    const [tv, setTv] = useState<Tv>()
    const [themeLoaded, setThemeImage, setThemeLoaded] = useMaterialTheme()
    const [watchProviders, setWatchProviders] = useState()
    const [content, setContent] = useState<Content>({ collections: null, recomm: [] })

    // Fetch movie JSON
    useEffect(() => {

        setTv(undefined)
        setThemeLoaded(false)

        // Check collection and recommendations
        id &&
            fetch(`/api/tv/${id}`)
                .then(res => res.json())
                .then(tv => setContent({
                    collections: null,
                    recomm: tv.recommendations.results
                }))

        // Get movie
        id &&
            fetch(`/api/tv/${id}`)
                .then(res => res.json())
                .then(obj => preloadTv(obj))
                .then(tv => setTv(tv))
    }, [id])

    // Set Material theme
    useEffect(() => {
        if (!tv) return window.scrollTo({ top: 0, behavior: 'smooth' })

        console.log(tv)

        // fetch(`/api/tv/${id}/watch`)
        //     .then(res => res.json())
        //     .then(watchProviders => setWatchProviders(watchProviders?.results?.RU))

    }, [tv])

    // Date converter to long russian date
    const localDate = (d: string) => {
        if (!d) return 'Не объявлена'
        let date = new Date(d)
        return date.toLocaleString('ru', { dateStyle: "long" })
    }

    return (
        <>
            {tv &&
                <main className={themeLoaded ? 'movie-tv' : 'movie-tv hidden'}>
                    {tv.backdrop_path && <img src={tv.backdrop_path} alt='backdrop' className="backdrop" />}
                    <div className="color-overlay" />
                    <img
                        src={tv?.poster_path}
                        alt='poster'
                        className="poster"
                        onLoad={(e) => setThemeImage(e.target as HTMLImageElement)}
                        crossOrigin='anonymous'
                    />
                    <div className="info">
                        <div className="top">
                            <div className="title">{tv.name}</div>
                            <div className="original_title">{tv.original_name}</div>
                            <div className="tagline">{tv.tagline}</div>
                            {tv.genres.length > 0 &&
                                <div className="genres">Жанр<span>{tv.genres.map(genre =>
                                    <div key={`genre-${genre.id}`}>{genre.name}</div>
                                )}</span></div>}
                            {tv.overview && <div className="overview">Обзор<span>{tv.overview}</span></div>}
                        </div>
                        <div className="bottom">
                            <div className="status">Статус<span>{status(tv.status)}</span></div>
                            <div className="release_date">Дата премьеры<span>{localDate(tv.first_air_date)}</span></div>
                            {/* <div className="budget">Бюджет<span>$ {tv.budget.toLocaleString('ru')}</span></div>
                            <div className="revenue">Сборы<span>$ {tv.revenue.toLocaleString('ru')}</span></div> */}

                        </div>
                    </div>
                    {tv.production_companies.length > 0 &&
                        <div className="companies">
                            {tv.production_companies.map((company) =>
                                company.logo_path &&
                                <img src={company.logo_path} alt='logo' key={'conpany-' + company.id} />)}
                        </div>}
                    <div className="rating-container">
                        <span>Пользовательский рейтинг</span>
                        <Rating
                            radius={40.5}
                            rating={parseFloat(tv.vote_average ? tv.vote_average.toFixed(1) : '0')}
                            votes={tv.vote_count}
                        />
                        <span>Голосов {tv.vote_count}</span>
                    </div>
                    {tv.videos.results.length > 0 && <Videos yt={tv.videos.results} />}
                    {themeLoaded && tv.credits && <Credits data={tv.credits} />}
                    {themeLoaded && tv.recommendations.results.length > 0 && <Recommendations cards={tv.recommendations} type='tv' />}
                </main>}
            {!themeLoaded &&
                <main className='movie-tv skeleton'>
                    <MovieSkeleton />
                    <Credits data={null} />
                    {content.recomm.length > 0 && <Recommendations cards={null} />}
                </main>}
        </>
    )
}

export default Tv