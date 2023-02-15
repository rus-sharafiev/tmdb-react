import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { preloadCast } from "../services/preloaders"
import { actorsSwiperBreakpoints } from "../ui/swiperBreakpoints"
import { Actor, Credits } from "../types/movie"

const Credits: React.FC<{ data: Credits }> = ({ data }) => {
    const [actors, setActors] = useState<Actor[]>([])

    useEffect(() => {
        if (data.cast)
            preloadCast(data.cast)
                .then(actors => setActors(actors))
    }, [])

    if (actors.length === 0) return <><div className="crew" style={{ opacity: '0' }} /><div className="cast" style={{ opacity: '0' }} /></>

    return (
        <>
            <div className="crew">
                <div className="director">
                    <span>Режиссер</span>
                    <span>{data.crew.map(p =>
                        p.job === 'Director' &&
                        <Link to={`/person/${p.id}`} key={'crew-' + p.id}>{p.name}</Link>)}</span>
                </div>
                <div className="screenplay">
                    <span>Сценарий</span>
                    <span>{data.crew.map(p =>
                        (p.job === 'Writer' || p.job === 'Screenplay') &&
                        <Link to={`/person/${p.id}`} key={'crew-' + p.id}>{p.name}</Link>)}</span>
                </div>
                <div className="producer">
                    <span>Продюсер</span>
                    <span>{data.crew.map(p =>
                        p.job === 'Producer' &&
                        <Link to={`/person/${p.id}`} key={'crew-' + p.id}>{p.name}</Link>)}</span>
                </div>
            </div>
            <div className="cast">
                <button type="button" className='cast-prev-btn material-symbols-rounded unselectable'>navigate_before</button>
                <Swiper
                    breakpoints={actorsSwiperBreakpoints}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: '.cast-prev-btn',
                        nextEl: '.cast-next-btn',
                    }}
                >
                    {actors.map((actor: Actor) =>
                        <SwiperSlide key={'actor-' + actor.id}>
                            <Link to={`/person/${actor.id}`} className='card unselectable' >
                                <img src={actor.profile_path} alt='photo' />
                                <div className='name'>
                                    <span>{actor.name}</span>
                                    <span>{actor.character}</span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )}
                </Swiper>
                <button type="button" className='cast-next-btn material-symbols-rounded unselectable'>navigate_next</button>
            </div>
        </>
    )
}

export default Credits