import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { preloadCollection } from "../services/preloaders"
import { collectionSwiperBreakpoints } from "../ui/swiperBreakpoints"
import { Collection, Part } from "../types/collection"
import Rating from "../ui/rating"

// Sort collection movies by release date
const releaseDateAsc = (a: Part, b: Part) => {
    const strA = a.release_date === '' ? '3000-01-01' : a.release_date
    const strB = b.release_date === '' ? '3000-01-01' : b.release_date
    if (strA < strB) {
        return -1;
    }
    if (strA > strB) {
        return 1;
    }
    return 0;
}

const Collection: React.FC<{ id: number | null }> = ({ id }) => {
    const [collection, setCollection] = useState<Collection>()

    useEffect(() => {
        if (id)
            fetch(`/api/collection/${id}`)
                .then(res => res.json())
                .then(obj => preloadCollection(obj))
                .then(collection => setCollection(collection))
    }, [id])

    return (
        id && collection
            ?
            <div className="collection">
                <img
                    className="collection-backdrop"
                    src={collection.backdrop_path}
                    alt="collection backdrop"
                />
                <div className="collection-overlay">
                    <div>{collection.name}</div>
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
                    {collection.parts
                        .sort(releaseDateAsc)
                        .map((part: Part) =>
                            <SwiperSlide key={'part-' + part.id}>
                                <Link to={`/movie/${part.id}`} className='card' >
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
            </div>
            :
            <div className="collection-skeleton">
                <div ><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                <div className="collection-card"><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                <div className="collection-card"><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
                <div ><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
            </div>
    )
}

export default Collection