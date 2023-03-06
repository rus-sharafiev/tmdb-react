import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { RootState } from '../store/store'
import { useGetAiringTodayTvsQuery, useGetPopularTvsQuery, useGetTopRatedTvsQuery } from '../store/cardsApi'
import { setTvsPage } from '../store/listPageSlice'
import { TvCards } from '../components/listCards'

const Tvs: React.FC = () => {
    const page = useAppSelector(store => store.page.tvs)
    const tvs = useAppSelector((state: RootState) => state.tvs)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list } = useParams()
    const endOfPage = useRef(null)
    const [skip, setSkip] = useState({ popular: true, top_rated: true, airing_today: true })

    const popular = useGetPopularTvsQuery(page.popular, { skip: skip.popular })
    const topRated = useGetTopRatedTvsQuery(page.top_rated, { skip: skip.top_rated })
    const airingToday = useGetAiringTodayTvsQuery(page.airing_today, { skip: skip.airing_today })

    useEffect(() => {
        if (!list) navigate('popular', { replace: true })
        setSkip({
            popular: list === 'popular' ? false : true,
            top_rated: list === 'top_rated' ? false : true,
            airing_today: list === 'airing_today' ? false : true
        })
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
        <>
            <div className={'cards'}>
                {list === 'popular' && <TvCards cards={popular} />}
                {list === 'top_rated' && <TvCards cards={topRated} />}
                {list === 'airing_today' && <TvCards cards={topRated} />}
                <div className='cards-loader' ref={endOfPage}></div>
            </div>
        </>
    )
};

export default Tvs;