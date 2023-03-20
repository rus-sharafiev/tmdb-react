import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { recommendationsSwiperBreakpoints } from "../ui/swiperBreakpoints"
import { MovieCard, MovieCards, TvCard, TvCards } from "../types/cards"
import Rating from "../ui/rating"
import { useGetMovieRecommendationsQuery, useGetTvRecommendationsQuery } from "../services/api/recommendationsApi"
import { CardImagePlaceholder } from "../ui/imagePlaceholders"

const Recommendations: React.FC<{ id?: number, type?: 'movie' | 'tv', qtt?: number }> = ({ id, type, qtt }) => {
    const [isVisible, setIsVisible] = useState(false)

    const recommendations = id
        ? type === 'movie'
            ? useGetMovieRecommendationsQuery(id)
            : useGetTvRecommendationsQuery(id)
        : undefined

    useEffect(() => {
        setIsVisible(false)
    }, [id])

    useEffect(() => {
        !recommendations?.isFetching && setIsVisible(true)
    }, [recommendations])

    return (
        <>
            {!recommendations?.isFetching &&
                <div className={isVisible ? 'recommendations' : 'recommendations hidden'}>
                    <div>Рекомендации</div>
                    <button
                        type="button"
                        className='recommendations-prev-btn material-symbols-rounded unselectable'
                    >
                        navigate_before
                    </button>
                    <Swiper
                        breakpoints={recommendationsSwiperBreakpoints}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: '.recommendations-prev-btn',
                            nextEl: '.recommendations-next-btn',
                        }}
                    >
                        {recommendations?.data?.map((recommendation: MovieCard | TvCard) =>
                            <SwiperSlide key={'part-' + recommendation.id}>
                                <Link to={`/${type}/${recommendation.id}`} className='card' >
                                    {recommendation.no_poster
                                        ? <CardImagePlaceholder />
                                        : <img src={recommendation.poster_path} />
                                    }
                                    {/* <img src={recommendation.poster_path} /> */}
                                    <Rating
                                        radius={18}
                                        rating={parseFloat(recommendation.vote_average ? recommendation.vote_average.toFixed(1) : '0')}
                                        votes={recommendation.vote_count}
                                    />
                                    <div className='title'>
                                        <span>{(recommendation as MovieCard).title ?? (recommendation as TvCard).name}</span>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <button
                        type="button"
                        className='recommendations-next-btn material-symbols-rounded unselectable'
                    >
                        navigate_next
                    </button>
                </div>}

            {(recommendations?.isFetching || !id) && qtt &&
                <div className="recommendations-skeleton">
                    {[...Array(qtt > 10 ? 10 : qtt)].map((e, i) =>
                        <div className="recommendations-card" key={`recommendations-card-${i}`}><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                    )}
                </div>}
        </>
    )
}

export default Recommendations