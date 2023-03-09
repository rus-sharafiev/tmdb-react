import React from "react"
import { NavLink } from "react-router-dom"

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

export default Tab