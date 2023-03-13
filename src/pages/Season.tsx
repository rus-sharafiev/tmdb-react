import { applyTheme } from "@material/material-color-utilities"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { localDate } from "../services/dateConverter"
import { useGetSeasonQuery } from "../services/api/seasonApi"
import { SeasonSkeleton } from "../ui/skeletons"
import { Episode } from "../types/season"
import convertRuntime from "../services/convertRuntime"

const Season: React.FC = () => {
    const { tvId, seasonNumber } = useParams()
    const season = tvId && seasonNumber ? useGetSeasonQuery({ tvId, seasonNumber }) : undefined
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (season?.isLoading) return

        season?.data?.theme &&
            applyTheme(season.data.theme, { target: document.body, dark: false })

        setTimeout(() => setIsVisible(true), 10)

        return () => document.body.removeAttribute('style')

    }, [season])

    useEffect(() => {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    }, [])

    return (
        <>
            {season?.data &&
                <main className={isVisible ? 'season' : 'season hidden'}>
                    <div className="color-overlay" />
                    <img className='poster' src={season.data.poster_path} alt='poster' />
                    <div className="info">
                        <div className="top">
                            <div className="title">{season.data.name}</div>
                            {season.data.overview && <div className="overview">Обзор<span>{season.data.overview}</span></div>}
                        </div>
                        <div className="bottom">
                            <div className="first-air-date">Первая серия<span>{localDate(season.data.air_date)}</span></div>
                            <div className="number-of-episodes">Всего серий<span>{season.data.episodes.length}</span></div>
                        </div>
                    </div>
                    <div className='episodes'>
                        {season.data.episodes &&
                            season.data.episodes.map((episode: Episode) =>
                                <div className='episode' key={`episode-${episode.id}`}>
                                    <img src={episode.still_path} alt='poster' />
                                    <div className='name'><span>#{episode.episode_number}</span>{episode.name}</div>
                                    <div className='overview'>{episode.overview}</div>
                                    <div className='runtime'>{convertRuntime(episode.runtime)}</div>
                                </div>
                            )}
                    </div>
                </main>
            }
            {season && season.isFetching &&
                <main className='season skeleton'>
                    <SeasonSkeleton />
                </main>
            }
        </>
    )
}

export default Season