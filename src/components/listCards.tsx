import React from "react"
import { Link } from "react-router-dom"
import { MovieCard, PersonCard, TvCard } from "../types/cards"
import Rating from "../ui/rating"
import { MediaCardSkeleton } from "../ui/skeletons"

export const MovieCards: React.FC<{ cards: any }> = ({ cards }) => {
    return (
        <>
            {cards.data?.map((movie: MovieCard) =>
                <Link to={`/movie/${movie.id}`} className='card' key={movie.id}>
                    <img src={movie.poster_path} />
                    <Rating radius={22.5} rating={parseFloat(movie.vote_average ? movie.vote_average.toFixed(1) : '0')} votes={movie.vote_count} />
                    <div className='title'>
                        <span>{movie.title}</span>
                        <span>{movie.original_title}</span>
                    </div>
                </Link>
            )}
            {cards.isFetching && [...Array(20)].map((e, i) => <MediaCardSkeleton key={`skeleton-${i}`} />)}
        </>
    )
}

export const TvCards: React.FC<{ cards: any }> = ({ cards }) => {
    return (
        <>
            {cards.data?.map((tv: TvCard) =>
                <Link to={`/tv/${tv.id}`} className='card' key={tv.id}>
                    <img src={tv.poster_path} />
                    <Rating radius={22.5} rating={parseFloat(tv.vote_average ? tv.vote_average.toFixed(1) : '0')} votes={tv.vote_count} />
                    <div className='title'>
                        <span>{tv.name}</span>
                        <span>{tv.original_name}</span>
                    </div>
                </Link>
            )}
            {cards.isFetching && [...Array(20)].map((e, i) => <MediaCardSkeleton key={`skeleton-${i}`} />)}
        </>
    )
}

export const PersonCards: React.FC<{ cards: any }> = ({ cards }) => {
    return (
        <>
            {cards.data?.map((person: PersonCard) =>
                <Link to={`/person/${person.id}`} className='card' key={person.id}>
                    <img src={person.profile_path} alt='image' />
                    <div className='name'>
                        {/* <span>{name}</span> */}
                        <span>{person.name}</span>
                    </div>
                </Link>
            )}
            {cards.isFetching && [...Array(20)].map((e, i) => <MediaCardSkeleton key={`skeleton-${i}`} />)}
        </>
    )
}