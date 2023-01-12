import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/redux-hooks'
import { fetchPeopleContent } from '../store/contentSlice'
import { Person } from '../types'
import CircularProgressIndicator from '../ui/cpi'

const People: React.FC = () => {
    const dispatch = useAppDispatch()
    const content = useAppSelector((state) => state.people.content)
    const status = useAppSelector((state) => state.people.status)
    const navigate = useNavigate();
    let { list } = useParams()

    useEffect(() => {
        if (!list) navigate("popular")
        if (status === 'idle') {
            list && dispatch(fetchPeopleContent(list))
        }
    }, [list])

    return (
        <>
            <main className={status !== 'complete' ? 'cards hidden' : 'cards'}>
                {status === 'complete' && content.map((person: Person) =>
                    <div className='card' key={person.id}>
                        <img src={person.profile_path} alt='image' />
                        <span className='name'>{person.name}</span>
                    </div>
                )}
            </main>
            {status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

export default People;