import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchPopularTvs, fetchTopRatedTvs, fetchAiringTodayTvs } from '../store/tvsSlice'
import { RootState } from '../store/store'
import { Tv } from '../types'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'

const Tvs: React.FC = () => {
    const tvs = useAppSelector((state: RootState) => state.tvs)
    const dispatch = useAppDispatch()
    let { list } = useParams()

    useEffect(() => {
        switch (list) {
            case 'popular':
                if (tvs.popular.status === 'idle') dispatch(fetchPopularTvs());
                break;
            case 'top_rated':
                if (tvs.top_rated.status === 'idle') dispatch(fetchTopRatedTvs());
                break;
            case 'airing_today':
                if (tvs.airing_today.status === 'idle') dispatch(fetchAiringTodayTvs());
                break;
        }
    }, [list])

    if (!list) return null

    return (
        <>
            <main className={tvs[list].status !== 'complete' ? 'cards hidden' : 'cards'}>
                {tvs[list].status === 'complete' && tvs[list].content.map((tv: Tv) =>
                    <Card key={tv.id}
                        img={tv.poster_path}
                        title={tv.name}
                        originalTitle={tv.original_name}
                        rating={tv.vote_average}
                        votes={tv.vote_count} />
                )}
            </main>
            {tvs[list].status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

export default Tvs;