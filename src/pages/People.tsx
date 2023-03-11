import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/store'
import Tab from '../components/Tab'
import useScrollDir from '../hooks/useScrollDir'
import { useGetPopularPeopleQuery } from '../store/api/cardsApi'
import { setPeoplePage } from '../store/listPageSlice'
import { PersonCards } from '../components/listCards'

const People: React.FC = () => {
    const page = useAppSelector(store => store.page.people)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list } = useParams()
    const endOfPage = useRef(null)
    const scrollDir = useScrollDir('up')

    const popular = useGetPopularPeopleQuery(page.popular)

    useEffect(() => {
        if (!list) navigate('popular', { replace: true })
        if (popular.isLoading) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [list])

    useEffect(() => {
        const peopleObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return

            if (list) dispatch(setPeoplePage({ type: list, page: page[list] + 1 }))
        })

        if (endOfPage.current) peopleObserver.observe(endOfPage.current)

        return () => {
            if (endOfPage.current) peopleObserver.unobserve(endOfPage.current)
        }

    }, [list, popular.isFetching])

    if (!list) return null

    return (
        <main className='lists'>
            <div className={'tabs ' + scrollDir}>
                <Tab to='/person/popular' name='Популярные' />
            </div>
            <div className={'cards'}>
                {list === 'popular' && <PersonCards cards={popular} />}
                <div className='cards-loader' ref={endOfPage}></div>
            </div>
        </main>
    )
}

export default People