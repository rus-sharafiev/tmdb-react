import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/store'
import { useGetAiringTodayTvsQuery, useGetPopularTvsQuery, useGetTopRatedTvsQuery } from '../store/api/cardsApi'
import { setTvsPage } from '../store/listPageSlice'
import { TvCards } from '../components/listCards'
import Tab from '../components/Tab'
import useScrollDir from '../hooks/useScrollDir'

const Tvs: React.FC = () => {
    const page = useAppSelector(store => store.page.tvs)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list } = useParams()
    const endOfPage = useRef(null)
    const scrollDir = useScrollDir('up')

    const popular = useGetPopularTvsQuery(page.popular)
    const topRated = useGetTopRatedTvsQuery(page.top_rated)
    const airingToday = useGetAiringTodayTvsQuery(page.airing_today)

    useEffect(() => {
        if (!list) navigate('popular', { replace: true })
        if (popular.isLoading || topRated.isLoading || airingToday.isLoading) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [list])

    useEffect(() => {
        const tvsObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return

            if (list) dispatch(setTvsPage({ type: list, page: page[list] + 1 }))
        })

        if (endOfPage.current) tvsObserver.observe(endOfPage.current)

        return () => {
            if (endOfPage.current) tvsObserver.unobserve(endOfPage.current)
        }

    }, [list, popular.isFetching, topRated.isFetching, airingToday.isFetching])

    if (!list) return null

    return (
        <main className='lists'>
            <div className={'tabs ' + scrollDir}>
                <Tab to='/tv/list/popular' name='Популярные' />
                <Tab to='/tv/list/top_rated' name='Лучшие' />
                <Tab to='/tv/list/airing_today' name='В эфире сегодня' />
            </div>
            <div className={'cards'}>
                {list === 'popular' && <TvCards cards={popular} />}
                {list === 'top_rated' && <TvCards cards={topRated} />}
                {list === 'airing_today' && <TvCards cards={airingToday} />}
                <div className='cards-loader' ref={endOfPage}></div>
            </div>
        </main>
    )
}

export default Tvs