import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Field, Form, Formik, FormikHelpers, FormikProps, useFormikContext } from 'formik'
import { useAppDispatch } from "../hooks/store"
import { searchApi } from "../services/api/searchApi"
import { resetSearchResults } from "../store/reducers/searchResultsSlice"
import { resetSearchPages } from "../store/reducers/pagesSlice"
import api from "../services"
import { MultiSearchResult, MultiSearchResults } from "../types"

interface Values {
    search: string
}

const Suggestions = () => {
    const { values } = useFormikContext() as FormikProps<Values>
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
                            <div key={`movie-suggestion-${suggestion.id}`}>{suggestion.title}</div>
                        )}
                    </>
                    : null}
                {tvs.length > 0
                    ? <>
                        <span>Сериалы</span>
                        {tvs.map(suggestion =>
                            <div key={`tv-suggestion-${suggestion.id}`}>{suggestion.name}</div>
                        )}
                    </>
                    : null}
                {people.length > 0
                    ? <>
                        <span>Люди</span>
                        {people.map(suggestion =>
                            <div key={`person-suggestion-${suggestion.id}`}>{suggestion.name}</div>
                        )}
                    </>
                    : null}
            </div>
            : null
    )
}

const ClearBtn: React.FC<{ inputRef: React.RefObject<HTMLInputElement> }> = ({ inputRef }) => {
    const { values, handleReset, setFieldValue } = useFormikContext() as FormikProps<Values>
    const location = useLocation()
    const isSearch = location.pathname.split('/')[1] === 'search'
    const currentUriQuery = location.pathname.split('/')[3]

    useEffect(() => {
        !isSearch && setFieldValue('search', '')
        isSearch && currentUriQuery && setFieldValue('search', decodeURI(currentUriQuery))
    }, [currentUriQuery])

    if (values.search)
        return <button className='close' onClick={e => { handleReset(e); inputRef.current?.focus() }}>close</button>

    return null
}

const SearchBar: React.FC = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const input = useRef<HTMLInputElement>(null)
    const location = useLocation()
    const category = location.pathname.split('/')[2]
    const currentUriQuery = decodeURI(location.pathname.split('/')[3])

    const initialValues = { search: '' }

    const handleSubmit = (values: typeof initialValues, { resetForm }: FormikHelpers<typeof initialValues>) => {
        if (currentUriQuery === values.search) return
        input.current?.blur()
        nav(`/search/${(category === 'movie' || category === 'tv' || category === 'person') ? category : 'movie'}/${values.search}`, { replace: true })
        dispatch(searchApi.util.resetApiState())
        dispatch(resetSearchPages())
        dispatch(resetSearchResults())
        resetForm()
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="search-bar">
                <button className='search'>search</button>
                <Field name='search' placeholder='Поиск по фильмам, сериалам и людям' innerRef={input} />
                <ClearBtn inputRef={input} />
                <Suggestions />
            </Form>
        </Formik>
    )
}

export default SearchBar
