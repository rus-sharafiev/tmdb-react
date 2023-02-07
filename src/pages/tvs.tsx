import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchPopularTvs, fetchTopRatedTvs, fetchAiringTodayTvs, ptNext, trtNext, attNext } from '../store/tvsSlice'
import { RootState } from '../store/store'
import { TvCard } from '../types/cards'
import { MediaCardSkeleton } from '../ui/skeletons'
import Rating from '../ui/rating'

const Tvs: React.FC = () => {
    const tvs = useAppSelector((state: RootState) => state.tvs)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list } = useParams()
    const endOfPage = useRef(null)


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [tvs.popular.firstLoadDone, tvs.top_rated.firstLoadDone, tvs.airing_today.firstLoadDone])

    useEffect(() => {
        if (!list) navigate('popular', { replace: true })

        switch (list) {
            case 'popular':
                if (tvs.popular.status === 'idle') dispatch(fetchPopularTvs(tvs.popular.page))
                break
            case 'top_rated':
                if (tvs.top_rated.status === 'idle') dispatch(fetchTopRatedTvs(tvs.top_rated.page))
                break
            case 'airing_today':
                if (tvs.airing_today.status === 'idle') dispatch(fetchAiringTodayTvs(tvs.airing_today.page))
                break
        }
    }, [list])

    useEffect(() => {
        const tvObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return

            if (list && tvs[list].status === 'complete') {
                switch (list) {
                    case 'popular':
                        dispatch(ptNext())
                        dispatch(fetchPopularTvs(tvs.popular.page + 1))
                            .then(() => console.log(`Has been loaded page ${tvs.popular.page + 1}`))
                        break
                    case 'top_rated':
                        dispatch(trtNext())
                        dispatch(fetchTopRatedTvs(tvs.top_rated.page + 1))
                            .then(() => console.log(`Has been loaded page ${tvs.top_rated.page + 1}`))
                        break
                    case 'airing_today':
                        dispatch(attNext())
                        dispatch(fetchAiringTodayTvs(tvs.airing_today.page + 1))
                            .then(() => console.log(`Has been loaded page ${tvs.airing_today.page + 1}`))
                        break
                }
            }
        });

        if (endOfPage.current && list && tvs[list].status === 'complete') tvObserver.observe(endOfPage.current);

        return () => {
            if (endOfPage.current) tvObserver.unobserve(endOfPage.current);
        }

    }, [tvs.popular.status, tvs.top_rated.status, tvs.airing_today.status])

    if (!list) return null

    return (
        <>
            <div className={'cards'}>
                {tvs[list].content.map((tv: TvCard) =>
                    <Link to={`/tv/${tv.id}`} className='card' key={tv.id}>
                        <img src={tv.poster_path} />
                        <Rating radius={22.5} rating={parseFloat(tv.vote_average ? tv.vote_average.toFixed(1) : '0')} votes={tv.vote_count} />
                        <div className='title'>
                            <span>{tv.name}</span>
                            <span>{tv.original_name}</span>
                        </div>
                    </Link>
                )}
                <div className='cards-loader' ref={endOfPage}></div>
                {tvs[list].status === 'loading' && [...Array(20)].map((e, i) => <MediaCardSkeleton key={`skeleton-${i}`} />)}
            </div>
        </>
    )
};

export default Tvs;