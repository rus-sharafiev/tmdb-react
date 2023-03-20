import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useGetMovieCreditsQuery, useGetTvCreditsQuery } from "../services/api/creditsApi"
import { Actor, Creator } from "../types"
import { actorsSwiperBreakpoints } from "../ui/swiperBreakpoints"

const Credits: React.FC<{ id?: number | null, creator?: Creator[] }> = ({ id, creator }) => {
    const [isVisible, setIsVisible] = useState(false)

    const credits = id
        ? creator
            ? useGetTvCreditsQuery(id)
            : useGetMovieCreditsQuery(id)
        : undefined

    useEffect(() => {
        setIsVisible(false)
    }, [id])

    useEffect(() => {
        !credits?.isFetching && setIsVisible(true)
    }, [credits])

    return (
        <>
            {credits?.data && !credits?.isFetching &&
                <>
                    <div className={isVisible ? 'crew' : 'crew hidden'}>
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
                                    <span>{credits.data.crew.map(p =>
                                        p.job === 'Director' &&
                                        <Link to={`/person/${p.id}`} key={'crew-' + p.id}>{p.name}</Link>)}</span>
                                </div>
                                <div className="screenplay">
                                    <span>Сценарий</span>
                                    <span>{credits.data.crew.map(p =>
                                        (p.job === 'Writer' || p.job === 'Screenplay') &&
                                        <Link to={`/person/${p.id}`} key={'crew-' + p.id}>{p.name}</Link>)}</span>
                                </div>
                            </>
                        }
                        <div className="producer">
                            <span>Продюсер</span>
                            <span>{credits.data.crew.map(p =>
                                p.job === 'Producer' &&
                                <Link to={`/person/${p.id}`} key={'crew-' + p.id}>{p.name}</Link>)}</span>
                        </div>
                    </div>

                    <div className={credits?.isFetching ? 'cast hidden' : 'cast'}>
                        <button type="button" className='cast-prev-btn material-symbols-rounded unselectable'>navigate_before</button>
                        <Swiper
                            breakpoints={actorsSwiperBreakpoints}
                            modules={[Navigation]}
                            navigation={{
                                prevEl: '.cast-prev-btn',
                                nextEl: '.cast-next-btn',
                            }}
                        >
                            {credits.data.cast.map(actor =>
                                <SwiperSlide key={'actor-' + actor.id}>
                                    <Link
                                        to={`/person/${actor.id}`}
                                        className={actor.no_poster ? 'card unselectable no-poster' : 'card unselectable'}
                                    >
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
                </>}

            {(credits?.isFetching || !id) &&
                <>
                    <div className="crew-skeleton">
                        {[...Array(creator ? 2 : 3)].map((e, i) =>
                            <div key={`skeleton-crew-${i}`}>
                                <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                                <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                            </div>
                        )}
                    </div>
                    <div className="cast-skeleton">
                        {[...Array(10)].map((e, i) =>
                            <div className="skeleton-cast-card" key={`skeleton-cast-card-${i}`}><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                        )}
                    </div>
                </>}
        </>
    )
}

export default Credits