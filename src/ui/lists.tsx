import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import useScrollDir from "../hooks/useScrollDir";

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

const Lists: React.FC<{ type: 'movie' | 'tv' | 'person' }> = ({ type }) => {
    const scrollDir = useScrollDir('up')

    return (
        <>
            <main className='lists'>
                <div className={'tabs ' + scrollDir}>
                    <Tab to='popular' name='Популярные' />
                    {(type === 'movie' || type === 'tv') && <Tab to='top_rated' name='Лучшие' />}
                    {type === 'movie' && <Tab to='upcoming' name='Ожидаемые' />}
                    {type === 'tv' && <Tab to='airing_today' name='В эфире сегодня' />}
                </div>
                <Outlet />
            </main>
        </>
    )
}

export default Lists