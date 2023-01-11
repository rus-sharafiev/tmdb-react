import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/redux-hooks'
import { fetchMoviesContent } from '../store/contentSlice'
import { Movie } from '../types'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'

const Movies: React.FC = () => {
    const dispatch = useAppDispatch()
    const content = useAppSelector((state) => state.movies.content)
    const status = useAppSelector((state) => state.movies.status)
    const navigate = useNavigate();
    let { list } = useParams()

    useEffect(() => {
        if (!list) navigate("popular")
        if (status === 'idle') {    
            list && dispatch(fetchMoviesContent(list))
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