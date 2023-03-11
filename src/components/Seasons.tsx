import React, { useEffect, useState } from "react"
import { localDate } from "../services/dateConverter"
import { preloadSeasons } from "../services/preloaders"
import { Season } from "../types"

const SeasonCard: React.FC<{ season: Season | undefined, fallBackImage: string }> = ({ season, fallBackImage }) => {
    if (!season) return null

    return (
        <div className="season-card">
            <div className="season-number">{season.season_number !== 0 && <span>#</span>}{season.season_number !== 0 ? season.season_number : '#'}</div>
            <img
                src={season.poster_path !== '' ? season.poster_path : fallBackImage}
                alt={season.name}
                className={season.poster_path === '' ? 'no-poster' : undefined}
            />
            <div className="season-name">{season.name}</div>
            <div className="season-air-date">{localDate(season.air_date)}</div>
            <div className="season-episode-count">Серий {season.episode_count}</div>
        </div>
    )
}

const Seasons: React.FC<{ data?: Season[] | undefined, qtt?: number, fallBackImage?: string }> = ({ data, qtt, fallBackImage }) => {
    const [seasons, setSeasons] = useState<Season[] | null>(null)

    useEffect(() => {
        data &&
            preloadSeasons(data)
                .then((seasons: Season[]) => setSeasons(seasons))
    }, [data])

    return (
        seasons
            ?
            <div className="seasons">
                <div>Сезоны</div>
                {seasons.map((season: Season) =>
                    season.season_number !== 0 &&
                    <SeasonCard season={season} key={`season-${season.id}`} fallBackImage={fallBackImage ?? ''} />
                )}
                <SeasonCard season={seasons.find(season => season.season_number === 0)} fallBackImage={fallBackImage ?? ''} />
            </div>
            :
            qtt
                ?
                <div className="seasons-skeleton">
                    {[...Array(qtt)].map((e, i) =>
                        <div className="season-card" key={`season-card-${i}`}><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                    )}
                </div>
                : null
    )
}

export default Seasons