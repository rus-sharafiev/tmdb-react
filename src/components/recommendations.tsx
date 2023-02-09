import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { preloadMovieCards } from "../services/preloaders"
import { collectionSwiperBreakpoints } from "../services/swiperBreakpoints"
import { MovieCard, MovieCards } from "../types/cards"
import Rating from "../ui/rating"

const Recommendations: React.FC<{ data: MovieCards }> = ({ data }) => {
    const [recommendations, setRecommendations] = useState<MovieCard[]>([])

    useEffect(() => {
        preloadMovieCards(data)
            .then(movies => setRecommendations(movies))
    }, [])

    return (
        <div className="recommendations">
            <button
                type="button"
                className='recommendations-prev-btn material-symbols-rounded unselectable'
            >
                navigate_before
            </button>
            <Swiper
                // breakpoints={collectionSwiperBreakpoints}
                slidesPerView={8}
                modules={[Navigation]}
                navigation={{
                    prevEl: '.recommendations-prev-btn',
                    nextEl: '.recommendations-next-btn',
                }}
            >
                {recommendations.length > 0 &&
                    recommendations
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
    )
}

export default Recommendations