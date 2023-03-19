import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Field, Form, Formik, FormikProps, useFormikContext } from 'formik'
import { useAppDispatch } from "../hooks/store"
import { searchApi } from "../services/api/searchApi"
import { resetSearchResults } from "../store/reducers/searchResultsSlice"
import { resetSearchPages } from "../store/reducers/pagesSlice"

interface Values {
    search: string
}

const Suggestions = () => {
    const { values } = useFormikContext() as FormikProps<Values>

    return (
        <div className='suggestions'></div>
    )
}

const ClearBtn = () => {
    const { values, handleReset } = useFormikContext() as FormikProps<Values>

    if (values.search)
        return <button className='close' onClick={handleReset}>close</button>

    return null
}

const SearchBar: React.FC = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()

    const initialValues = { search: '' }

    const handleSubmit = (values: typeof initialValues) => {
        dispatch(resetSearchPages())
        dispatch(resetSearchResults())
        dispatch(searchApi.util.resetApiState())
        nav(`/search/movie/${values.search}`)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="search-bar">
                <button className='search'>search</button>
                <Field name='search' placeholder='Поиск по фильмам, сериалам и людям' />
                <ClearBtn />
                <Suggestions />
            </Form>
        </Formik>
    )
}

export default SearchBar
