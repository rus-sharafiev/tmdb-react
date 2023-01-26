import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, pmNext, trmNext, umNext } from '../store/moviesSlice'
import { RootState } from '../store/store'
import { MovieCard } from '../types/cards'
import { MediaCardSkeleton } from '../ui/skeletons'
import Rating from '../ui/rating'

const Movies: React.FC = () => {
    const movies = useAppSelector((state: RootState) => state.movies)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list } = useParams()
    const endOfPage = useRef(null)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [movies.popular.firstLoadDone, movies.top_rated.firstLoadDone, movies.upcoming.firstLoadDone])

    useEffect(() => {
        if (!list) navigate('popular', { replace: true })

        switch (list) {
            case 'popular':
                if (movies.popular.status === 'idle') dispatch(fetchPopularMovies(movies.popular.page))
                break
            case 'top_rated':
                if (movies.top_rated.status === 'idle') dispatch(fetchTopRatedMovies(movies.top_rated.page))
                break
            case 'upcoming':
                if (movies.upcoming.status === 'idle') dispatch(fetchUpcomingMovies(movies.upcoming.page))
                break
        }
    }, [list])

    useEffect(() => {
        const moviesObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return

            if (list && movies[list].status === 'complete') {
                switch (list) {
                    case 'popular':
                        dispatch(pmNext())
                        dispatch(fetchPopularMovies(movies.popular.page + 1))
                            .then(() => console.log(`Has been loaded page ${movies.popular.page}`))
                        break
                    case 'top_rated':
                        dispatch(trmNext())
                        dispatch(fetchTopRatedMovies(movies.top_rated.page + 1))
                            .then(() => console.log(`Has been loaded page ${movies.top_rated.page + 1}`))
                        break
                    case 'upcoming':
                        dispatch(umNext())
                        dispatch(fetchUpcomingMovies(movies.upcoming.page + 1))
                            .then(() => console.log(`Has been loaded page ${movies.upcoming.page + 1}`))
                        break
                }
            }
        });

        if (endOfPage.current) moviesObserver.observe(endOfPage.current);

        return () => {
            if (endOfPage.current) moviesObserver.unobserve(endOfPage.current);
        }

    }, [endOfPage, movies.popular.status, movies.top_rated.status, movies.upcoming.status])

    if (!list) return null

    return (
        <>
            <div className={'cards'}>
                {movies[list].content.map((movie: MovieCard) =>
                    <Link to={`/movie/${movie.id}`} className='card' key={movie.id}>
                        <img src={movie.poster_path} />
                        <Rating radius={22.5} rating={parseFloat(movie.vote_average ? movie.vote_average.toFixed(1) : '0')} votes={movie.vote_count} />
                        <div className='title'>
                            <span>{movie.title}</span>
                            <span>{movie.original_title}</span>
                        </div>
                    </Link>
                )}
                {movies[list].status === 'loading' && [...Array(20)].map((e, i) => <MediaCardSkeleton key={`skeleton-${i}`} />)}
                <div className='cards-loader' ref={endOfPage}></div>
            </div>
        </>
    )
};

export default Movies;