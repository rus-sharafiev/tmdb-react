import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux-hooks'
import { fetchTvsContent } from '../contentSlice'
import { Tv } from '../types'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'

const Tvs: React.FC = () => {
    const dispatch = useAppDispatch()
    const content = useAppSelector((state) => state.tvs.content)
    const status = useAppSelector((state) => state.tvs.status)
    const [list, setList] = useState('popular');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTvsContent(list))
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
                        votes={tv.vote_count}/>
                )}
            </main>
            {status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

export default Tvs;