import React, { useEffect, useState } from "react"
import convertRuntime from "../services/convertRuntime"
import { preloadEpisodes } from "../services/preloaders"
import { Episode } from "../types/season"

const Episodes: React.FC<{ data: Episode[] }> = ({ data }) => {
    const [episodes, setEpisodes] = useState<Episode[] | undefined>(undefined)

    useEffect(() => {
        data &&
            preloadEpisodes(data)
                .then(episodes => setEpisodes(episodes))
    }, [data])

    return (
        <div className='episodes'>
            {episodes &&
                episodes.map((episode: Episode) =>
                    <div className='episode' key={`episode-${episode.id}`}>
                        <img src={episode.still_path} alt='poster' />
                        <div className='name'><span>#{episode.episode_number}</span>{episode.name}</div>
                        <div className='overview'>{episode.overview}</div>
                        <div className='runtime'>{convertRuntime(episode.runtime)}</div>
                    </div>
                )}
        </div>
    )
}

export default Episodes