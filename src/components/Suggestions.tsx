import { FormikProps, useFormikContext } from "formik"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services"
import { MultiSearchResult, MultiSearchResults } from "../types"

const Suggestions: React.FC = () => {
    const { values, handleReset } = useFormikContext() as FormikProps<{ search: string }>
    const [suggestions, setSuggestions] = useState<MultiSearchResult[]>([])
    const [movies, setMovies] = useState<MultiSearchResult[]>([])
    const [tvs, setTvs] = useState<MultiSearchResult[]>([])
    const [people, setPeople] = useState<MultiSearchResult[]>([])

    useEffect(() => {
        values.search.length > 4
            ?
            (api.get(`/api/search/multi/${values.search}/1`) as Promise<MultiSearchResults>)
                .then(res => setSuggestions(res.results ?? []))
                .catch(e => console.log(e))
            : setSuggestions([])
    }, [values.search])

    useEffect(() => {
        console.log(suggestions)
        setMovies(suggestions.filter(suggestion => suggestion.media_type === 'movie'))
        setTvs(suggestions.filter(suggestion => suggestion.media_type === 'tv'))
        setPeople(suggestions.filter(suggestion => suggestion.media_type === 'person'))
    }, [suggestions])

    return (
        suggestions.length > 0
            ?
            <div className='suggestions'>
                {movies.length > 0
                    ? <>
                        <span>Фильмы</span>
                        {movies.map(suggestion =>
                            <div key={`movie-suggestion-${suggestion.id}`}>
                                <Link
                                    to={`/movie/${suggestion.id}`}
                                    onClick={e => setTimeout(() => handleReset(e))}
                                >
                                    {suggestion.title}
                                </Link>
                            </div>
                        )}
                    </>
                    : null}
                {tvs.length > 0
                    ? <>
                        <span>Сериалы</span>
                        {tvs.map(suggestion =>
                            <div key={`tv-suggestion-${suggestion.id}`}>
                                <Link
                                    to={`/tv/${suggestion.id}`}
                                    onClick={e => setTimeout(() => handleReset(e))}
                                >
                                    {suggestion.name}
                                </Link>
                            </div>
                        )}
                    </>
                    : null}
                {people.length > 0
                    ? <>
                        <span>Люди</span>
                        {people.map(suggestion =>
                            <div key={`person-suggestion-${suggestion.id}`}>
                                <Link
                                    to={`/person/${suggestion.id}`}
                                    onClick={e => setTimeout(() => handleReset(e))}
                                >
                                    {suggestion.name}
                                </Link>
                            </div>
                        )}
                    </>
                    : null}
            </div>
            : null
    )
}

export default Suggestions