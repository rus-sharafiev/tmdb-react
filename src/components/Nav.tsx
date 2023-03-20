import React from 'react'
import { NavLink, useLocation } from "react-router-dom"

const Nav: React.FC = () => {
    let location = useLocation()

    const search = location.pathname.split('/')[1] === 'search' ? true : false
    const query = location.pathname.split('/')[3]

    const NavBtn: React.FC<{ to: string, icon: string, name: string }> = ({ to, icon, name }) => {

        return (
            <NavLink to={search ? `/search/${to}/${query}` : to} className={({ isActive }) => isActive ? 'nav-active' : undefined} >
                <span className='material-symbols-rounded'>{icon}</span>
                {name}
            </NavLink>
        )
    }

    return (
        <nav>
            <NavBtn to='movie' icon='movie' name='Фильмы' />
            <NavBtn to='tv' icon='tv_gen' name='Сериалы' />
            <NavBtn to='person' icon='person' name='Люди' />
        </nav>
    )
}

export default Nav