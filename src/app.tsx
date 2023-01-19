import React from 'react'
import { Routes, Route, NavLink, Outlet } from "react-router-dom"
import Logo from './ui/logo'

import Lists from './ui/lists'
import Start from './pages/start'
import Movies from './pages/movies'
import Movie from './pages/MOVIE'
import Tvs from './pages/tvs'
import Tv from './pages/TV'
import People from './pages/people'
import Person from './pages/PERSON'
import useScrollDir from './hooks/useScrollDir'

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
                <Route path="/" element={<Start />} />
                <Route path="/movies" element={<Lists type='movie' />}>
                    <Route index element={<Movies />} />
                    <Route path=":list" element={<Movies />} />
                </Route>
                <Route path="/tvs" element={<Lists type='tv' />} >
                    <Route index element={<Tvs />} />
                    <Route path=":list" element={<Tvs />} />
                </Route>
                <Route path="/people" element={<Lists type='person' />} >
                    <Route index element={<People />} />
                    <Route path=":list" element={<People />} />
                </Route>
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/tv/:id" element={<Tv />} />
                <Route path="/person/:id" element={<Person />} />
            </Routes>
            <header className={scrollDir}>
                <div className='overlay' />
                <label>
                    search
                    <input type={'text'} placeholder='Поиск по фильмам, сериалам и людям' />
                </label>
            </header>
            <footer></footer>
            <Logo />
            <nav>
                <NavBtn to='movies' icon='movie' name='Фильмы' />
                <NavBtn to='tvs' icon='tv_gen' name='Сериалы' />
                <NavBtn to='people' icon='person' name='Люди' />
            </nav>
        </>
    );
}

export default App;