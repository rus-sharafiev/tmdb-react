import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { preloadCards } from "../services/preloaders"
import { recommendationsSwiperBreakpoints } from "../ui/swiperBreakpoints"
import { MovieCard, MovieCards, TvCard, TvCards } from "../types/cards"
import Rating from "../ui/rating"

const Recommendations: React.FC<{ cards?: MovieCards | TvCards | undefined, type?: 'movie' | 'tv', qtt?: number }> = ({ cards, type, qtt }) => {
    const [recommendations, setRecommendations] = useState<MovieCard[] | TvCard[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(false)
        cards &&
            preloadCards(JSON.parse(JSON.stringify(cards)))
                .then(recommendations => setRecommendations(recommendations as MovieCard[] | TvCard[]))
                .then(() => setIsLoaded(true))
    }, [cards])

    return (
        recommendations.length > 0 && isLoaded
            ?
            <div className="recommendations">
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
                    {recommendations
                        .map((recommendation: MovieCard | TvCard) =>
                            <SwiperSlide key={'part-' + recommendation.id}>
                                <Link to={`/${type}/${recommendation.id}`} className='card' >
                                    <img src={recommendation.poster_path} />
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
            </div>
            :
            qtt
                ?
                <div className="recommendations-skeleton">
                    {[...Array(qtt > 10 ? 10 : qtt)].map((e, i) =>
                        <div className="recommendations-card" key={`recommendations-card-${i}`}><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                    )}
                </div>
                : null
    )
}

export default Recommendations