import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import proxyImageLoader from "../helpers/proxyImageLoader"
import { Movie } from "../types/movie"

const preloadMovie = async (content: Movie) => {
    content.backdrop_path = await proxyImageLoader(content.backdrop_path, 'w1280')
    content.poster_path = await proxyImageLoader(content.poster_path, 'w500')
    return content;
}

const Movie: React.FC = () => {
    let { id } = useParams()
    const [movie, setMovie] = useState<Movie>()

    useEffect(() => {
        fetch(`/api/movie/${id}`)
            .then(res => res.json())
            .then(obj => preloadMovie(obj))
            .then(movie => setMovie(movie))
    }, [id])

    useEffect(() => {
        movie && console.log(movie)
    }, [movie])

    if (!movie) return null

    return (
        <main className="movie">
            <img src={movie.poster_path} alt='poster' />
            <img src={movie.backdrop_path} alt='backdrop' />
        </main>
    )
}

export default Movie