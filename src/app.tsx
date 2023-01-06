import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Movie, Tv } from './types';

const imageLoader = async (url: string) => {
    return new Promise((res) => {
        let img = new Image();
        img.src = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=' + encodeURIComponent(url);
        img.onload = () => {
            res(img.src)
        }
    });
}

const preloadImages = async (content: {[index: string]: any}, size: string) => {
    let array = await Promise.all( content.results.map( async (item: {[index: string]: any}) => {
        item.poster_path = await imageLoader('https://image.tmdb.org/t/p/' + size + item.poster_path);
        return item;
    }));
    return array;
}

const FirstCard: React.FC = () => {
    const [content, setContent] = useState<{ [index: string]: any }>([]);

    useEffect(() => {
        fetch('/api/movie/popular')
        .then(response => response.json())
        .then(data => preloadImages(data, 'w300'))
        .then(preloadedArray => setContent(preloadedArray))
    }, []);

    return (
        <main className='movies'>
            {content.length !== 0 && content.map((movie: Movie) => 
                <div className='card' key={movie.id}>
                    <img src={movie.poster_path} />
                    <span className='title'>{movie.title}</span>
                </div>
            )}
        </main>
    )
};
const SecondCard: React.FC = () => {
    const [content, setContent] = useState<{ [index: string]: any }>([]);

    useEffect(() => {
        fetch('/api/tv/popular')
        .then(response => response.json())
        .then(data => preloadImages(data, 'w300'))
        .then(preloadedArray => setContent(preloadedArray))
    }, []);

    return (
        <main className='movies'>
            {content.length !== 0 && content.map((movie: Tv) => 
                <div className='card' key={movie.id}>
                    <img src={movie.poster_path} />
                    <span className='title'>{movie.name}</span>
                </div>
            )}
        </main>
    )
};
const ThirdCard: React.FC = () => {
    return (
        <main>
            <div className='card'>
            </div>
        </main>
    )
};

const App: React.FC = () => {
    const navigate = useNavigate();
    let location = useLocation();
    
    useEffect(() => {
        if (location.pathname === '/') { navigate("/1") };
    }, []);

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
                <Route path="/1" element={<FirstCard/>} />
                <Route path="/2" element={<SecondCard/>} />
                <Route path="/3" element={<ThirdCard/>} />
            </Routes>
            <nav>
                <NavBtn to='1' icon='movie' name='Movies'/>
                <NavBtn to='2' icon='tv_gen' name='TVs'/>
                <NavBtn to='3' icon='person' name='Persons'/>
            </nav>
        </>
    );
}

export default App;