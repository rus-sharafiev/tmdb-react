import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/redux-hooks'
import { fetchTvsContent } from '../store/contentSlice'
import { Tv } from '../types'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'

const Tvs: React.FC = () => {
    const dispatch = useAppDispatch()
    const content = useAppSelector((state) => state.tvs.content)
    const status = useAppSelector((state) => state.tvs.status)
    const navigate = useNavigate();
    let { list } = useParams()

    useEffect(() => {
        if (!list) navigate("popular")
        if (status === 'idle') {
            list && dispatch(fetchTvsContent(list))
        }
    }, [list])

    return (
        <>
            <main className={status !== 'complete' ? 'cards hidden' : 'cards'}>
                {status === 'complete' && content.map((tv: Tv) =>
                    <Card key={tv.id}
                        img={tv.poster_path}
                        title={tv.name}
                        originalTitle={tv.original_name}
                        rating={tv.vote_average}
                        votes={tv.vote_count} />
                )}
            </main>
            {status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

export default Tvs;