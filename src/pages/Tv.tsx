import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Tv from "../types/tv"
import Rating from "../ui/rating"
import { preloadMedia } from "../services/preloaders"
import Recommendations from "../components/Recommendations"
import Credits from "../components/Credits"
import Videos from "../components/videos"
import useMaterialTheme from "../hooks/useMaterialTheme"
import { MovieSkeleton } from "../ui/skeletons"
import { Content } from "../types"
import Seasons from "../components/Seasons"
import { localDate } from "../services/dateConverter"

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
    const [content, setContent] = useState<Content>({ seasons: 0, recommendations: 0 })

    // Fetch tv JSON
    useEffect(() => {

        setTv(undefined)
        setThemeLoaded(false)

        // Get tv
        id &&
            fetch(`https://api.rutmdb.ru/api/tv/${id}`)
                .then(res => res.json())
                .then((rawTv: Tv) => {
                    setContent({        // Check seasons and recommendations
                        seasons: Object.keys(rawTv.seasons).length,
                        recommendations: rawTv.recommendations.results.length
                    })
                    return preloadMedia(rawTv) as Promise<Tv>
                })
                .then(tv => {
                    setTv(tv)
                    tv.poster_bitmap
                        ? setThemeImage(tv.poster_bitmap)
                        : setThemeLoaded(true)
                })
    }, [id])

    useEffect(() => {
        if (!tv) return window.scrollTo({ top: 0, behavior: 'smooth' })

        // fetch(`https://api.rutmdb.ru/api/tv/${id}/watch`)
        //     .then(res => res.json())
        //     .then(watchProviders => setWatchProviders(watchProviders?.results?.RU))

    }, [tv])

    return (
        <>
            {tv &&
                <main className={themeLoaded ? 'movie-tv' : 'movie-tv hidden'}>
                    {tv.backdrop_path && <img src={tv.backdrop_path} alt='backdrop' className="backdrop" />}
                    <div className="color-overlay" />
                    <img src={tv?.poster_path} alt='poster' className="poster" />
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
                            <div className="first-air-date">Первая серия<span>{localDate(tv.first_air_date)}</span></div>
                            <div className="last-air-date">Посленияя серияы<span>{localDate(tv.last_air_date)}</span></div>
                            <div className="status">Статус<span>{status(tv.status)}</span></div>
                            <div className="number-of-episodes">Всего серий<span>{tv.number_of_episodes}</span></div>
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
                    {themeLoaded && tv.credits && <Credits credits={tv.credits} creator={tv.created_by} />}
                    {themeLoaded && tv.seasons.length > 0 && <Seasons data={tv.seasons} qtt={content.seasons} fallBackImage={tv.poster_path} tvId={tv.id} />}
                    {themeLoaded && tv.recommendations.results.length > 0 && <Recommendations cards={tv.recommendations} type='tv' qtt={content.recommendations} />}
                </main>}
            {!themeLoaded &&
                <main className='movie-tv skeleton'>
                    <MovieSkeleton />
                    <Credits credits={null} creator={[]} />
                    {content.seasons !== 0 && <Seasons qtt={content.seasons} />}
                    {content.recommendations !== 0 && <Recommendations qtt={content.recommendations} />}
                </main>}
        </>
    )
}

export default Tv