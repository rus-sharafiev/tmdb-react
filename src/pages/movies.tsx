import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery } from '../store/cardsApi'
import { setMoviesPage } from '../store/listPageSlice'
import { MovieCards } from '../components/listCards'

const Movies: React.FC = () => {
    const page = useAppSelector(store => store.page.movies)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list } = useParams()
    const endOfPage = useRef(null)
    const [skip, setSkip] = useState({ popular: true, top_rated: true, upcoming: true })

    const popular = useGetPopularMoviesQuery(page.popular, { skip: skip.popular })
    const topRated = useGetTopRatedMoviesQuery(page.top_rated, { skip: skip.top_rated })
    const upcoming = useGetUpcomingMoviesQuery(page.upcoming, { skip: skip.upcoming })

    useEffect(() => {
        if (!list) navigate('popular', { replace: true })
        setSkip({
            popular: list === 'popular' ? false : true,
            top_rated: list === 'top_rated' ? false : true,
            upcoming: list === 'upcoming' ? false : true
        })
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
        <>
            <div className={'cards'}>
                {list === 'popular' && <MovieCards cards={popular} />}
                {list === 'top_rated' && <MovieCards cards={topRated} />}
                {list === 'upcoming' && <MovieCards cards={upcoming} />}
                <div className='cards-loader' ref={endOfPage}></div>
            </div>
        </>
    )
};

export default Movies;