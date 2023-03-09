import React from 'react'
import { Routes, Route, NavLink, Outlet, useParams } from "react-router-dom"
import Logo from './ui/logo'

import Home from './pages/Home'
import Movies from './pages/Movies'
import Movie from './pages/Movie'
import Tvs from './pages/Tvs'
import Tv from './pages/Tv'
import People from './pages/People'
import Person from './pages/Person'
import useScrollDir from './hooks/useScrollDir'

const MovieRouter: React.FC = () => {
    const { list } = useParams()
    if (!list || list === 'popular' || list === 'top_rated' || list === 'upcoming') return <Movies />
    return <Movie />
}

const App: React.FC = () => {
    const scrollDir = useScrollDir('up')

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
        <>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/movie/id/:id" element={<Movie />} />
                <Route path="/movie/:list?" element={<Movies />} />

                <Route path="/tv/id/:id" element={<Tv />} />
                <Route path="/tv/:list?" element={<Tvs />} />

                <Route path="/person/id/:id" element={<Person />} />
                <Route path="/person/:list?" element={<People />} />
            </Routes>
            <header className={scrollDir}>
                <div className='overlay' />
                <label>
                    search
                    <input type={'text'} placeholder='Поиск по фильмам, сериалам и людям' />
                </label>
            </header>
            <Logo />
            <footer></footer>
            <nav>
                <NavBtn to='movie' icon='movie' name='Фильмы' />
                <NavBtn to='tv' icon='tv_gen' name='Сериалы' />
                <NavBtn to='person' icon='person' name='Люди' />
            </nav>
        </>
    );
}

export default App;