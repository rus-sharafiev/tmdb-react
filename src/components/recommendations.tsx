import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { preloadMovieCards } from "../services/preloaders"
import { recommendationsSwiperBreakpoints } from "../ui/swiperBreakpoints"
import { MovieCard, MovieCards } from "../types/cards"
import Rating from "../ui/rating"

const Recommendations: React.FC<{ cards: MovieCards | null }> = ({ cards }) => {
    const [recommendations, setRecommendations] = useState<MovieCard[]>([])

    useEffect(() => {
        cards &&
            preloadMovieCards(cards)
                .then(movies => setRecommendations(movies))
    }, [])

    return (
        recommendations.length > 0
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
                        .map((movie: MovieCard) =>
                            <SwiperSlide key={'part-' + movie.id}>
                                <Link to={`/movie/${movie.id}`} className='card' >
                                    <img src={movie.poster_path} />
                                    <Rating
                                        radius={18}
                                        rating={parseFloat(movie.vote_average ? movie.vote_average.toFixed(1) : '0')}
                                        votes={movie.vote_count}
                                    />
                                    <div className='title'>
                                        <span>{movie.title}</span>
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
            <div className="recommendations-skeleton">
                {[...Array(10)].map((e, i) =>
                    <div className="recommendations-card" key={`recommendations-card-${i}`}><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                )}
            </div>
    )
}

export default Recommendations