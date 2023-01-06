import React, { useState, useEffect, useTransition } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Movie, Tv, Person } from './types';
import Rating from './components/rating';

const imageLoader = async (url: string) => {
    return new Promise((res) => {
        let img = new Image();
        img.src = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=' + encodeURIComponent(url);
        img.onload = () => {
            res(img.src)
        }
    });
}

const preloadImages = async (content: {[index: string]: any}, size: string, person?: boolean) => {
    let array = await Promise.all( content.results.map( async (item: {[index: string]: any}) => {
        if (person) {
            item.profile_path = await imageLoader('https://image.tmdb.org/t/p/' + size + item.profile_path);
        } else {
            item.poster_path = await imageLoader('https://image.tmdb.org/t/p/' + size + item.poster_path);
        }
        return item;
    }));
    return array;
}

const Card: React.FC<{img: string, title: string, rating: number, votes: number, originalTitle: string}> = ({img, title, rating, votes, originalTitle}) => {
    return (
        <div className='card'>
            <img src={img} />
            <Rating radius={22.5} rating={parseFloat(rating.toFixed(1))} votes={votes}/>
            <div className='title'>
                <span>{title}</span>
                <span>{originalTitle}</span>
            </div>
        </div>
    )
}

const FirstCard: React.FC = () => {
    const [content, setContent] = useState<{ [index: string]: any }>([]);

    useEffect(() => {
        fetch('/api/movie/popular')
        .then(response => response.json())
        .then(array => preloadImages(array, 'w300'))
        .then(preloadedArray => setContent(preloadedArray))
    }, []);

    return (
        <main className='cards'>
            {content.length !== 0 && content.map((movie: Movie) => 
                <Card key={movie.id} 
                    img={movie.poster_path} 
                    title={movie.title} 
                    originalTitle={movie.original_title} 
                    rating={movie.vote_average}
                    votes={movie.vote_count}/>
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
        <main className='cards'>
            {content.length !== 0 && content.map((tv: Tv) => 
                <Card key={tv.id} 
                    img={tv.poster_path} 
                    title={tv.name} 
                    originalTitle={tv.original_name} 
                    rating={tv.vote_average}
                    votes={tv.vote_count}/>
            )}
        </main>
    )
};
const ThirdCard: React.FC = () => {
    const [content, setContent] = useState<{ [index: string]: any }>([]);

    useEffect(() => {
        fetch('/api/person/popular')
        .then(response => response.json())
        .then(data => preloadImages(data, 'w300', true))
        .then(preloadedArray => setContent(preloadedArray))
    }, []);

    return (
        <main className='cards'>
            {content.length !== 0 && content.map((person: Person) =>
                <div className='card' key={person.id}>
                    <img src={person.profile_path} />
                    <div className='name'>{person.name}</div>
                </div>
            )}
        </main>
    )
};

const App: React.FC = () => {
    const navigate = useNavigate();
    let location = useLocation();
    
    useEffect(() => {
        if (location.pathname === '/') { navigate("/movie") };
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
                <Route path="/movie" element={<FirstCard/>} />
                <Route path="/tv" element={<SecondCard/>} />
                <Route path="/person" element={<ThirdCard/>} />
            </Routes>
            <nav>
                <NavBtn to='movie' icon='movie' name='Movies'/>
                <NavBtn to='tv' icon='tv_gen' name='TVs'/>
                <NavBtn to='person' icon='person' name='Persons'/>
            </nav>
        </>
    );
}

export default App;