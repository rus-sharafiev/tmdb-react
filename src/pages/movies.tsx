import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, pmNext, trmNext, umNext } from '../store/moviesSlice'
import { RootState } from '../store/store'
import { Movie } from '../types/cards'
import Card, { CardSkeleton } from '../ui/card'

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

        if (list && movies[list].status === 'complete') {

            const intersectionObserver = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio <= 0) return


                switch (list) {
                    case 'popular':
                        dispatch(fetchPopularMovies(movies.popular.page + 1))
                            .then(() => console.log(`Has been loaded page ${movies.popular.page + 1}`))
                        dispatch(pmNext())
                        break
                    case 'top_rated':
                        dispatch(fetchTopRatedMovies(movies.top_rated.page + 1))
                            .then(() => console.log(`Has been loaded page ${movies.top_rated.page + 1}`))
                        dispatch(trmNext())
                        break
                    case 'upcoming':
                        dispatch(fetchUpcomingMovies(movies.upcoming.page + 1))
                            .then(() => console.log(`Has been loaded page ${movies.upcoming.page + 1}`))
                        dispatch(umNext())
                        break
                }
            });

            endOfPage.current && intersectionObserver.observe(endOfPage.current);
            return () => {
                endOfPage.current && intersectionObserver.unobserve(endOfPage.current);
            }
        }

    }, [endOfPage, list, movies.popular.status, movies.top_rated.status, movies.upcoming.status])

    if (!list) return null

    return (
        <>
            <div className={'cards'}>
                {movies[list].content.map((movie: Movie) =>
                    <Card key={movie.id}
                        img={movie.poster_path}
                        title={movie.title}
                        originalTitle={movie.original_title}
                        rating={movie.vote_average}
                        votes={movie.vote_count} />
                )}
                {movies[list].status === 'loading' && [...Array(20)].map((e, i) => <CardSkeleton key={`skeleton-${i}`} />)}
                <div className='cards-loader' ref={endOfPage}></div>
            </div>
        </>
    )
};

export default Movies;