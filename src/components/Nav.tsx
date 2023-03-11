import React from 'react'
import { NavLink } from "react-router-dom"

const Nav: React.FC = () => {

    const NavBtn: React.FC<{ to: string, icon: string, name: string }> = ({ to, icon, name }) => {
        return (
            <NavLink
                to={to}
                className={({ isActive }) => isActive ? 'nav-active' : undefined}
            >
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