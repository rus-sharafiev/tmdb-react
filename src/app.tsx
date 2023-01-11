import React from 'react'
import { Routes, Route, NavLink } from "react-router-dom"
import Start from './pages/start'
import Movies from './pages/movies'
import Tvs from './pages/tvs'
import People from './pages/people'

const App: React.FC = () => {

    const NavBtn: React.FC<{to: string, icon: string, name:string}> = ({to, icon, name}) => {
        return (
            <NavLink 
                to={to} 
                className={({ isActive }) => isActive ? 'nav-active' : undefined }
            >
                <span className='material-symbols-rounded'>{icon}</span>
                {name}
            </NavLink>
        )
    }

    return ( 
        <>
            <Routes>
                <Route path="/" element={<Start/>} />
                <Route path="/movie" >
                    <Route index element={<Movies/>} />
                    <Route path=":list" element={<Movies/>} />
                </Route>
                <Route path="/tv" element={<Tvs/>} />
                <Route path="/person" element={<People/>} />
            </Routes>
            <nav>
                <NavBtn to='' icon='home' name='Главная'/>
                <NavBtn to='movie' icon='movie' name='Фильмы'/>
                <NavBtn to='tv' icon='tv_gen' name='Сериалы'/>
                <NavBtn to='person' icon='person' name='Люди'/>
            </nav>
        </>
    );
}

export default App;