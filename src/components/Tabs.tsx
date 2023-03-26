import React from "react"
import { useLocation, NavLink } from "react-router-dom"

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

const Tabs: React.FC = () => {
    const { pathname } = useLocation()
    const mediaType = pathname.split('/')[1]

    if (pathname.split('/')[2] !== 'list') return null

    return (
        <div className='tabs'>
            {(mediaType === 'movie' || mediaType === 'tv' || mediaType === 'person') &&
                <Tab to={`/${mediaType}/list/popular`} name='Популярные' />}

            {(mediaType === 'movie' || mediaType === 'tv') &&
                <Tab to={`/${mediaType}/list/top_rated`} name='Лучшие' />}

            {mediaType === 'movie' &&
                <Tab to={`/${mediaType}/list/upcoming`} name='Ожидаемые' />}

            {mediaType === 'tv' &&
                <Tab to={`/${mediaType}/list/airing_today`} name='В эфире сегодня' />}
        </div>
    )
}

export default Tabs