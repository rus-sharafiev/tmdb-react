import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux-hooks'
import { fetchMoviesContent } from '../contentSlice'
import { Movie } from '../types'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'

const Movies: React.FC = () => {
    const dispatch = useAppDispatch()
    const content = useAppSelector((state) => state.movies.content)
    const status = useAppSelector((state) => state.movies.status)
    const [list, setList] = useState('popular');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMoviesContent(list))
        }
    }, [list])

    return (
        <>
            <main className={status !== 'complete' ? 'cards hidden' : 'cards'}>
                {status === 'complete' && content.map((movie: Movie) =>
                    <Card key={movie.id}
                        img={movie.poster_path} 
                        title={movie.title} 
                        originalTitle={movie.original_title} 
                        rating={movie.vote_average}
                        votes={movie.vote_count}/>  
                )}     
            </main>
            {status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

export default Movies;