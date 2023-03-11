import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { preloadCast } from "../services/preloaders"
import { Actor, Creator, Credits } from "../types"
import { actorsSwiperBreakpoints } from "../ui/swiperBreakpoints"

const Credits: React.FC<{ credits: Credits | null, creator?: Creator[] }> = ({ credits, creator }) => {
    const [actors, setActors] = useState<Actor[]>([])

    useEffect(() => {
        if (credits)
            preloadCast(credits.cast)
                .then(actors => setActors(actors))
    }, [credits])

    return (
        <>
            {actors.length > 0 && credits // Crew
                ?
                <div className="crew">
                    {creator
                        ?
                        <div className="creator">
                            <span>Создатель</span>
                            <span>{creator.map(с =>
                                <Link to={`/person/${с.id}`} key={'creator-' + с.id}>{с.name}</Link>)}</span>
                        </div>
                        :
                        <>
                            <div className="director">
                                <span>Режиссер</span>
                                <span>{credits.crew.map(p =>
                                    p.job === 'Director' &&
                                    <Link to={`/person/${p.id}`} key={'crew-' + p.id}>{p.name}</Link>)}</span>
                            </div>
                            <div className="screenplay">
                                <span>Сценарий</span>
                                <span>{credits.crew.map(p =>
                                    (p.job === 'Writer' || p.job === 'Screenplay') &&
                                    <Link to={`/person/${p.id}`} key={'crew-' + p.id}>{p.name}</Link>)}</span>
                            </div>
                        </>
                    }
                    <div className="producer">
                        <span>Продюсер</span>
                        <span>{credits.crew.map(p =>
                            p.job === 'Producer' &&
                            <Link to={`/person/${p.id}`} key={'crew-' + p.id}>{p.name}</Link>)}</span>
                    </div>
                </div>
                :
                <div className="crew-skeleton">
                    {[...Array(creator ? 2 : 3)].map((e, i) =>
                        <div key={`skeleton-crew-${i}`}>
                            <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                        </div>
                    )}
                </div>
            }
            {actors.length > 0 // Actors
                ?
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
                        )
                        }
                    </Swiper>
                    <button type="button" className='cast-next-btn material-symbols-rounded unselectable'>navigate_next</button>
                </div>
                :
                <div className="cast-skeleton">
                    {[...Array(10)].map((e, i) =>
                        <div className="skeleton-cast-card" key={`skeleton-cast-card-${i}`}><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                    )}
                </div>
            }
        </>
    )
}

export default Credits