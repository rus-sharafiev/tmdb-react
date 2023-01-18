import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchPopularTvs, fetchTopRatedTvs, fetchAiringTodayTvs, ptNext, trtNext, attNext } from '../store/tvsSlice'
import { RootState } from '../store/store'
import { Tv } from '../types/cards'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'

const Tvs: React.FC = () => {
    const tvs = useAppSelector((state: RootState) => state.tvs)
    const dispatch = useAppDispatch()
    const endOfPage = useRef(null)
    let { list } = useParams()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [tvs.popular.firstLoadDone, tvs.top_rated.firstLoadDone, tvs.airing_today.firstLoadDone])

    useEffect(() => {
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
            <main className={tvs[list].firstLoadDone ? 'cards' : 'cards hidden'}>
                {tvs[list].content.map((tv: Tv) =>
                    <Card key={tv.id}
                        img={tv.poster_path}
                        title={tv.name}
                        originalTitle={tv.original_name}
                        rating={tv.vote_average}
                        votes={tv.vote_count} />
                )}
                <div className='cards-loader' ref={endOfPage}></div>
            </main>
            <div className={tvs[list].status === 'loading' ? 'page-is-loading show' : 'page-is-loading'}>Стр {tvs[list].page}</div>
            {!tvs[list].firstLoadDone && tvs[list].status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

export default Tvs;