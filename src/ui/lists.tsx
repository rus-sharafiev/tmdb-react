import React, { useEffect } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import Movies from '../pages/movies'
import Tvs from '../pages/tvs'
import People from '../pages/people'

const Tab: React.FC<{ to: string, name: string }> = ({ to, name }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => isActive ? 'tab-active' : undefined}
        >
            {name}
        </NavLink>
    )
}

const MovieLists: React.FC = () => {
    const navigate = useNavigate();
    let { list } = useParams()

    useEffect(() => {
        if (!list) navigate("popular")
    }, [])

    return (
        <>
            <main className='lists'>
                <div className='tabs'>
                    <Tab to='popular' name='Популярные' />
                    <Tab to='top_rated' name='Лучшие' />
                    <Tab to='upcoming' name='Ожидаемые' />
                </div>
                <Movies />
            </main>
        </>
    )
};

const TvLists: React.FC = () => {
    const navigate = useNavigate();
    let { list } = useParams()

    useEffect(() => {
        if (!list) navigate("popular")
    }, [])

    return (
        <>
            <main className='lists'>
                <div className='tabs'>
                    <Tab to='popular' name='Популярные' />
                    <Tab to='top_rated' name='Лучшие' />
                    <Tab to='airing_today' name='В эфире сегодня' />
                </div>
                <Tvs />
            </main>
        </>
    )
};

const PersonLists: React.FC = () => {
    const navigate = useNavigate();
    let { list } = useParams()

    useEffect(() => {
        if (!list) navigate("popular")
    }, [])

    return (
        <>
            <main className='lists'>
                <div className='tabs'>
                    <Tab to='popular' name='Популярные' />
                </div>
                <People />
            </main>
        </>
    )
};

export { MovieLists, TvLists, PersonLists }