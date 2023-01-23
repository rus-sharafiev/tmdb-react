import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchPopularTvs, fetchTopRatedTvs, fetchAiringTodayTvs, ptNext, trtNext, attNext } from '../store/tvsSlice'
import { RootState } from '../store/store'
import { Tv } from '../types/cards'
import Card, { CardSkeleton } from '../ui/card'
import CPI from '../ui/cpi'

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

        if (list && tvs[list].status === 'complete') {

            const intersectionObserver = new IntersectionObserver((entries) => {
                if (entries[0].intersectionRatio <= 0) return

                switch (list) {
                    case 'popular':
                        dispatch(fetchPopularTvs(tvs.popular.page + 1))
                            .then(() => console.log(`Has been loaded page ${tvs.popular.page + 1}`))
                        dispatch(ptNext())
                        break
                    case 'top_rated':
                        dispatch(fetchTopRatedTvs(tvs.top_rated.page + 1))
                            .then(() => console.log(`Has been loaded page ${tvs.top_rated.page + 1}`))
                        dispatch(trtNext())
                        break
                    case 'airing_today':
                        dispatch(fetchAiringTodayTvs(tvs.airing_today.page + 1))
                            .then(() => console.log(`Has been loaded page ${tvs.airing_today.page + 1}`))
                        dispatch(attNext())
                        break
                }
            });

            endOfPage.current && intersectionObserver.observe(endOfPage.current);
            return () => {
                endOfPage.current && intersectionObserver.unobserve(endOfPage.current);
            }
        }

    }, [endOfPage, list, tvs.popular.status, tvs.top_rated.status, tvs.airing_today.status])

    if (!list) return null

    return (
        <>
            <div className={'cards'}>
                {tvs[list].content.map((tv: Tv) =>
                    <Card key={tv.id}
                        img={tv.poster_path}
                        title={tv.name}
                        originalTitle={tv.original_name}
                        rating={tv.vote_average}
                        votes={tv.vote_count} />
                )}
                <div className='cards-loader' ref={endOfPage}></div>
                {tvs[list].status === 'loading' && [...Array(20)].map((e, i) => <CardSkeleton key={`skeleton-${i}`} />)}
            </div>
        </>
    )
};

export default Tvs;