import React from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks/store"
import { MovieCard, PersonCard, TvCard } from "../types/cards"
import { CardImagePlaceholder } from "../ui/imagePlaceholders"
import Rating from "../ui/rating"
import { MediaCardSkeleton } from "../ui/skeletons"

export const MovieCards: React.FC<{ cards: any, qtt?: number }> = ({ cards, qtt }) => {

    return (
        <>
            {cards.data?.map((movie: MovieCard) =>
                <Link to={`/movie/${movie.id}`} className='card' key={movie.id}>
                    {movie.no_poster
                        ? <CardImagePlaceholder />
                        : <img src={movie.poster_path} />
                    }
                    <Rating radius={22.5} rating={parseFloat(movie.vote_average ? movie.vote_average.toFixed(1) : '0')} votes={movie.vote_count} />
                    <div className='title'>
                        <span>{movie.title}</span>
                        <span>{movie.original_title}</span>
                    </div>
                </Link>
            )}
            {cards.isFetching && qtt && [...Array(qtt)].map((e, i) => <MediaCardSkeleton key={`skeleton-${i}`} />)}
        </>
    )
}

export const TvCards: React.FC<{ cards: any, qtt?: number }> = ({ cards, qtt }) => {

    return (
        <>
            {cards.data?.map((tv: TvCard) =>
                <Link to={`/tv/${tv.id}`} className='card' key={tv.id}>
                    {tv.no_poster
                        ? <CardImagePlaceholder />
                        : <img src={tv.poster_path} />
                    }
                    <Rating radius={22.5} rating={parseFloat(tv.vote_average ? tv.vote_average.toFixed(1) : '0')} votes={tv.vote_count} />
                    <div className='title'>
                        <span>{tv.name}</span>
                        <span>{tv.original_name}</span>
                    </div>
                </Link>
            )}
            {cards.isFetching && qtt && [...Array(qtt)].map((e, i) => <MediaCardSkeleton key={`skeleton-${i}`} />)}
        </>
    )
}

export const PersonCards: React.FC<{ cards: any, qtt?: number }> = ({ cards, qtt }) => {

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
            {cards.isFetching && qtt && [...Array(qtt)].map((e, i) => <MediaCardSkeleton key={`skeleton-${i}`} />)}
        </>
    )
}