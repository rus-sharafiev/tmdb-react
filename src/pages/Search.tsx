import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { MovieCards, PersonCards, TvCards } from "../components/listCards"
import { useAppDispatch, useAppSelector } from "../hooks/store"
import useScrollDir from "../hooks/useScrollDir"
import { useSearchMoviesQuery, useSearchPeopleQuery, useSearchTvsQuery } from "../services/api/searchApi"
import { setSearchPage } from "../store/reducers/pagesSlice"

const Search: React.FC = () => {
    const page = useAppSelector(store => store.pages.search)
    const results = useAppSelector(store => store.searchResults)
    const dispatch = useAppDispatch()
    const { list, query } = useParams()
    const endOfPage = useRef(null)
    const scrollDir = useScrollDir('up')
    const [skip, setSkip] = useState({ movie: true, tv: true, person: true })

    if (!query || !list) return null

    const searchObserver = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio > 0)
            return dispatch(setSearchPage({ type: list, page: page[list] + 1 }))
    })

    const movies = useSearchMoviesQuery(`${query}/${page.movie}`, { skip: skip.movie })
    const tvs = useSearchTvsQuery(`${query}/${page.tv}`, { skip: skip.tv })
    const people = useSearchPeopleQuery(`${query}/${page.person}`, { skip: skip.person })

    useEffect(() => {

        setSkip({
            movie: list === 'movie' ? false : true,
            tv: list === 'tv' ? false : true,
            person: list === 'person' ? false : true
        })

        if (movies.isLoading || tvs.isLoading || people.isLoading)
            window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [list])

    useEffect(() => {
        if (!results[list]) return
        if (!endOfPage.current) return

        if (movies.isFetching || tvs.isFetching || people.isFetching || results[list].pages < page[list] + 1)
            return searchObserver.unobserve(endOfPage.current)

        searchObserver.observe(endOfPage.current)

        return () => {
            if (endOfPage.current) searchObserver.unobserve(endOfPage.current)
        }

    }, [list, movies, tvs, people])

    return (
        <main className='search'>
            <div className={'cards'}>
                {list === 'movie' && <MovieCards cards={movies} qtt={results.movie?.qtt} />}
                {list === 'tv' && <TvCards cards={tvs} qtt={results.tv?.qtt} />}
                {list === 'person' && <PersonCards cards={people} qtt={results.person?.qtt} />}
                <div className='cards-loader' ref={endOfPage}></div>
            </div>
        </main>
    )
}

export default Search

