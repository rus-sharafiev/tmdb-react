import React, { useEffect, useState } from "react"
import { Video } from "../types"

const Videos: React.FC<{ yt: Video[] }> = ({ yt }) => {
    const [activeVideo, setActiveVideo] = useState<string>('official')
    const [videos, setVideos] = useState<{
        official: string | undefined,
        ru: string | undefined
    }>()

    useEffect(() => {

        if (yt.length > 0) {
            setVideos({
                official: yt.slice().reverse().find(r => r.type === "Trailer" && r.official && r.iso_639_1 === 'en')?.key,
                ru: yt.slice().reverse().find(r => r.type === "Trailer" && r.iso_639_1 === 'ru')?.key
            })
        }

    }, [yt])


    return (
        videos
            ?
            <div className="video">
                {videos.ru &&
                    <div className="video-languages">
                        <span
                            className={activeVideo === 'official' ? 'active' : ''}
                            onClick={() => setActiveVideo('official')}
                        >Официальный</span>
                        <span
                            className={activeVideo === 'ru' ? 'active' : ''}
                            onClick={() => setActiveVideo('ru')}
                        >Русский</span>
                    </div>}
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo === 'official'
                        ? videos.official
                        : videos.ru
                        }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
            :
            <div className="video" />
    )
}

export default Videos