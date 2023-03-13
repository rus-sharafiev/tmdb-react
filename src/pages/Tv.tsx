import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Tv from "../types/tv"
import Rating from "../ui/rating"
import Recommendations from "../components/Recommendations"
import Credits from "../components/Credits"
import Videos from "../components/Videos"
import { MovieSkeleton } from "../ui/skeletons"
import { Content } from "../types"
import Seasons from "../components/Seasons"
import { localDate } from "../services/dateConverter"
import { useGetTvQuery } from "../services/api/mediaApi"
import { applyTheme } from "@material/material-color-utilities"

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
    const [watchProviders, setWatchProviders] = useState()
    const [content, setContent] = useState<Content>({ seasons: 0, recommendations: 0 })

    const tv = id ? useGetTvQuery(id) : undefined
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(false)
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }))

        id &&
            fetch(`https://api.rutmdb.ru/api/tv/${id}`)
                .then(res => res.json())
                .then((rawTv: Tv) =>
                    setContent({        // Check seasons and recommendations
                        seasons: Object.keys(rawTv.seasons).length,
                        recommendations: rawTv.recommendations.results.length
                    }))
    }, [id])

    useEffect(() => {
        if (tv?.isFetching) return

        tv?.data?.theme &&
            applyTheme(tv.data.theme, { target: document.body, dark: false })

        setTimeout(() => setIsVisible(true), 10)

        return () => document.body.removeAttribute('style')

    }, [tv])

    return (
        <>
            {tv?.data &&
                <main className={isVisible ? 'movie-tv' : 'movie-tv hidden'}>
                    {tv.data.backdrop_path &&
                        <img
                            src={tv.data.backdrop_path}
                            alt='backdrop'
                            className="backdrop"
                        />}
                    <div className="color-overlay" />
                    <img
                        src={tv.data.poster_path}
                        alt='poster'
                        className="poster"
                    />
                    <div className="info">
                        <div className="top">
                            <div className="title">{tv.data.name}</div>
                            <div className="original_title">{tv.data.original_name}</div>
                            <div className="tagline">{tv.data.tagline}</div>
                            {tv.data.genres.length > 0 &&
                                <div className="genres">Жанр<span>{tv.data.genres.map(genre =>
                                    <div key={`genre-${genre.id}`}>{genre.name}</div>
                                )}</span></div>}
                            {tv.data.overview && <div className="overview">Обзор<span>{tv.data.overview}</span></div>}
                        </div>
                        <div className="bottom">
                            <div className="first-air-date">Первая серия<span>{localDate(tv.data.first_air_date)}</span></div>
                            <div className="last-air-date">Посленияя серияы<span>{localDate(tv.data.last_air_date)}</span></div>
                            <div className="status">Статус<span>{status(tv.data.status)}</span></div>
                            <div className="number-of-episodes">Всего серий<span>{tv.data.number_of_episodes}</span></div>
                        </div>
                    </div>
                    {tv.data.production_companies.length > 0 &&
                        <div className="companies">
                            {tv.data.production_companies.map((company) =>
                                company.logo_path &&
                                <img src={company.logo_path} alt='logo' key={'conpany-' + company.id} />)}
                        </div>}
                    <div className="rating-container">
                        <span>Пользовательский рейтинг</span>
                        <Rating
                            radius={40.5}
                            rating={parseFloat(tv.data.vote_average ? tv.data.vote_average.toFixed(1) : '0')}
                            votes={tv.data.vote_count}
                        />
                        <span>Голосов {tv.data.vote_count}</span>
                    </div>
                    {tv.data.videos.results.length > 0 && <Videos yt={tv.data.videos.results} />}
                    {tv.isSuccess && tv.data.credits &&
                        <Credits credits={tv.data.credits} creator={tv.data.created_by} />}
                    {tv.isSuccess && tv.data.seasons.length > 0 &&
                        <Seasons data={tv.data.seasons} qtt={content.seasons} fallBackImage={tv.data.poster_path} tvId={tv.data.id} />}
                    {tv.isSuccess && tv.data.recommendations.results.length > 0 &&
                        <Recommendations cards={tv.data.recommendations} type='tv' qtt={content.recommendations} />}
                </main>}
            {tv?.isFetching &&
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