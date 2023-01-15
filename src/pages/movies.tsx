import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../store/moviesSlice'
import { RootState } from '../store/store'
import { Movie } from '../types'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'

const Movies: React.FC<{}> = () => {
    const movies = useAppSelector((state: RootState) => state.movies)
    const dispatch = useAppDispatch()
    let { list } = useParams()

    useEffect(() => {
        switch (list) {
            case 'popular':
                if (movies.popular.status === 'idle') dispatch(fetchPopularMovies());
                break;
            case 'top_rated':
                if (movies.top_rated.status === 'idle') dispatch(fetchTopRatedMovies());
                break;
            case 'upcoming':
                if (movies.upcoming.status === 'idle') dispatch(fetchUpcomingMovies());
                break;
        }
    }, [list])

    if (!list) return null

    return (
        <>
            <div className={movies[list].status !== 'complete' ? 'cards hidden' : 'cards'}>
                {movies[list].status === 'complete' && movies[list].content?.map((movie: Movie) =>
                    <Card key={movie.id}
                        img={movie.poster_path}
                        title={movie.title}
                        originalTitle={movie.original_title}
                        rating={movie.vote_average}
                        votes={movie.vote_count} />
                )}
            </div>
            {movies[list].status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

export default Movies;