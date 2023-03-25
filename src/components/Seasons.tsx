import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { localDate } from "../services/dateConverter"
import { preloadSeasons } from "../services/preloaders"
import { TvSeason } from "../types"
import { SeasonCardImagePlaceholder } from "./ui/imagePlaceholders"

const SeasonCard: React.FC<{ season: TvSeason | undefined, fallBackImage: string, tvId?: number }> = ({ season, fallBackImage, tvId }) => {
    if (!season) return null

    return (
        <Link to={`/tv/${tvId}/season/${season.season_number}`} className="season-card">
            <div className="season-number">{season.season_number !== 0 && <span>#</span>}{season.season_number !== 0 ? season.season_number : '#'}</div>
            {fallBackImage
                ?
                <img
                    src={season.poster_path !== '' ? season.poster_path : fallBackImage}
                    alt={season.name}
                    className={season.poster_path === '' ? 'no-poster' : undefined}
                />
                : <SeasonCardImagePlaceholder />}
            <div className="season-name">{season.name}</div>
            <div className="season-air-date">{localDate(season.air_date)}</div>
            <div className="season-episode-count">Серий {season.episode_count}</div>
        </Link>
    )
}

const Seasons: React.FC<{ data?: TvSeason[] | undefined, qtt?: number, fallBackImage?: string, tvId?: number }> = ({ data, qtt, fallBackImage, tvId }) => {
    const [seasons, setSeasons] = useState<TvSeason[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(false)
        data &&
            preloadSeasons(JSON.parse(JSON.stringify(data)))
                .then((seasons: TvSeason[]) => setSeasons(seasons))
                .then(() => setIsLoaded(true))
    }, [data])

    return (
        seasons && isLoaded
            ?
            <div className="seasons">
                <div>Сезоны</div>
                {seasons.map((season: TvSeason) =>
                    season.season_number !== 0 &&
                    <SeasonCard season={season} key={`season-${season.id}`} fallBackImage={fallBackImage ?? ''} tvId={tvId} />
                )}
                <SeasonCard season={seasons.find(season => season.season_number === 0)} fallBackImage={fallBackImage ?? ''} tvId={tvId} />
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