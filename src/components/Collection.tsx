import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { collectionSwiperBreakpoints } from "../ui/swiperBreakpoints"
import { Collection, Part } from "../types/collection"
import Rating from "../ui/rating"
import { useGetMoviesCollectionQuery } from "../services/api/collectionApi"
import releaseDateAsc from "../services/sortReleaseDate"

const Collection: React.FC<{ id?: number }> = ({ id }) => {
    const [isVisible, setIsVisible] = useState(false)

    const collection = id ? useGetMoviesCollectionQuery(id) : undefined

    useEffect(() => {
        setIsVisible(false)
    }, [id])

    useEffect(() => {
        !collection?.isFetching && setIsVisible(true)
    }, [collection])

    return (
        <>
            {collection?.data && !collection?.isFetching &&
                <div className={isVisible ? 'collection' : 'collection hidden'}>
                    <img
                        className="collection-backdrop"
                        src={collection.data.backdrop_path}
                        alt="collection backdrop"
                    />
                    <div className="collection-overlay unselectable">
                        <div>{collection.data.name}</div>
                    </div>
                    <button
                        type="button"
                        className='collection-prev-btn material-symbols-rounded unselectable'
                    >
                        navigate_before
                    </button>
                    <Swiper
                        breakpoints={collectionSwiperBreakpoints}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: '.collection-prev-btn',
                            nextEl: '.collection-next-btn',
                        }}
                    >
                        {collection.data.parts
                            .slice()
                            .sort(releaseDateAsc)
                            .map((part: Part) =>
                                <SwiperSlide key={'part-' + part.id}>
                                    <Link to={`/movie/${part.id}`} className={part.no_poster ? 'card no-poster' : 'card'} >
                                        <img src={part.poster_path} />
                                        <Rating radius={18} rating={parseFloat(part.vote_average ? part.vote_average.toFixed(1) : '0')} votes={part.vote_count} />
                                        <div className='title'>
                                            <span>{part.title}</span>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )}
                    </Swiper>
                    <button
                        type="button"
                        className='collection-next-btn material-symbols-rounded unselectable'
                    >
                        navigate_next
                    </button>
                </div>}

            {(collection?.isFetching || !id) &&
                <div className="collection-skeleton">
                    <div ><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                    <div className="collection-card"><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                    <div className="collection-card"><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                    <div ><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                </div>}
        </>
    )
}

export default Collection