import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/store'
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery } from '../store/api/cardsApi'
import { setMoviesPage } from '../store/listPageSlice'
import { MovieCards } from '../components/listCards'
import Tab from '../components/Tab'
import useScrollDir from '../hooks/useScrollDir'

const Movies: React.FC = () => {
    const page = useAppSelector(store => store.page.movies)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list } = useParams()
    const endOfPage = useRef(null)
    const scrollDir = useScrollDir('up')

    const popular = useGetPopularMoviesQuery(page.popular)
    const topRated = useGetTopRatedMoviesQuery(page.top_rated)
    const upcoming = useGetUpcomingMoviesQuery(page.upcoming)

    useEffect(() => {
        if (!list) navigate('popular', { replace: true })
        if (popular.isLoading || topRated.isLoading || upcoming.isLoading) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [list])

    useEffect(() => {
        const moviesObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return

            if (list) dispatch(setMoviesPage({ type: list, page: page[list] + 1 }))
        })

        if (endOfPage.current) moviesObserver.observe(endOfPage.current)

        return () => {
            if (endOfPage.current) moviesObserver.unobserve(endOfPage.current)
        }

    }, [list, popular.isFetching, topRated.isFetching, upcoming.isFetching])

    if (!list) return null

    return (
        <main className='lists'>
            <div className={'tabs ' + scrollDir}>
                <Tab to='/movie/popular' name='Популярные' />
                <Tab to='/movie/top_rated' name='Лучшие' />
                <Tab to='/movie/upcoming' name='Ожидаемые' />
            </div>
            <div className={'cards'}>
                {list === 'popular' && <MovieCards cards={popular} />}
                {list === 'top_rated' && <MovieCards cards={topRated} />}
                {list === 'upcoming' && <MovieCards cards={upcoming} />}
                <div className='cards-loader' ref={endOfPage}></div>
            </div>
        </main>
    )
}

export default Movies