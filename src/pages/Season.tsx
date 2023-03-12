import { applyTheme } from "@material/material-color-utilities"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Episodes from "../components/Episodes"
import { localDate } from "../services/dateConverter"
import { useGetSeasonQuery } from "../store/api/seasonApi"
import { SeasonSkeleton } from "../ui/skeletons"

const Season: React.FC = () => {
    const { tvId, seasonNumber } = useParams()
    const season = tvId && seasonNumber ? useGetSeasonQuery({ tvId, seasonNumber }) : undefined

    useEffect(() => {
        if (!season?.isSuccess) return window.scrollTo({ top: 0, behavior: 'smooth' })

        season.data?.theme &&
            applyTheme(season.data.theme, { target: document.body, dark: false })

        return () => document.body.removeAttribute('style')

    }, [season])

    return (
        season && season.data
            ?
            <main className='season'>
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
                {season.data.episodes.length > 0 && <Episodes data={season.data.episodes} />}
            </main>
            :
            <main className='season skeleton'>
                <SeasonSkeleton />
            </main>
    )
}

export default Season