import React, { useState, useEffect, useTransition } from 'react'
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom"
import { useAppSelector, useAppDispatch } from './redux-hooks'
import { Movie, Tv, Person } from './types'
import Rating from './components/rating'
import CircularProgressIndicator from './components/cpi'
import { fetchMoviesContent, fetchTvsContent, fetchPeopleContent } from './contentSlice'

const Card: React.FC<{img: string, title: string, rating?: number, votes?: number, originalTitle?: string}> = ({img, title, rating, votes, originalTitle}) => {
    return (
        <div className='card'>
            <img src={img} />
            {rating && votes && <Rating radius={22.5} rating={parseFloat(rating.toFixed(1))} votes={votes}/>}
            <div className='title'>
                <span>{title}</span>
                <span>{originalTitle}</span>
            </div>
        </div>
    )
}

const Start: React.FC = () => {
    return (
        <div></div>
    )
}

const Movies: React.FC = () => {
    const dispatch = useAppDispatch()
    const content = useAppSelector((state) => state.movies)

    useEffect(() => {
          dispatch(fetchMoviesContent('popular'))
    }, [dispatch])

    return (
        <>
            <main className={'cards '}>
                {content.length !== 0 && content.map((movie: Movie) =>
                        <Card key={movie.id}
                            img={movie.poster_path} 
                            title={movie.title} 
                            originalTitle={movie.original_title} 
                            rating={movie.vote_average}
                            votes={movie.vote_count}/>  
                )}     
            </main>
            {content.length === 0 && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

const Tvs: React.FC = () => {
    const dispatch = useAppDispatch()
    const content = useAppSelector((state) => state.tvs)

    useEffect(() => {
          dispatch(fetchTvsContent('popular'))
    }, [dispatch])

    return (
        <>
            <main className={'cards '}>
                {content.length !== 0 && content.map((tv: Tv) => 
                    <Card key={tv.id} 
                        img={tv.poster_path} 
                        title={tv.name} 
                        originalTitle={tv.original_name} 
                        rating={tv.vote_average}
                        votes={tv.vote_count}/>
                )}
            </main>
            {content.length === 0 && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

const People: React.FC = () => {
    const dispatch = useAppDispatch()
    const content = useAppSelector((state) => state.people)

    useEffect(() => {
          dispatch(fetchPeopleContent('popular'))
    }, [dispatch])

    return (
        <>
            <main className={'cards '}>
                {content.length !== 0 && content.map((person: Person) =>
                    <Card key={person.id}
                        img={person.profile_path} 
                        title={person.name}/>
                )}
            </main>
            {content.length === 0 && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

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
                <Route path="/movie" element={<Movies/>} />
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