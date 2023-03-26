import React, { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Field, Form, Formik, FormikHelpers, FormikProps, useFormikContext } from 'formik'
import { useAppDispatch } from "../hooks/store"
import { searchApi } from "../services/api/searchApi"
import { resetSearchResults } from "../store/reducers/searchResultsSlice"
import { resetSearchPages } from "../store/reducers/pagesSlice"
import Suggestions from "./Suggestions"

const ClearBtn: React.FC<{ inputRef: React.RefObject<HTMLInputElement> }> = ({ inputRef }) => {
    const { values, handleReset, setFieldValue } = useFormikContext() as FormikProps<{ search: string }>
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
