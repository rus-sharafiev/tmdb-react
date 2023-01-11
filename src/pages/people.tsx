import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/redux-hooks'
import { fetchPeopleContent } from '../store/contentSlice'
import { Person } from '../types'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'

const People: React.FC = () => {
    const dispatch = useAppDispatch()
    const content = useAppSelector((state) => state.people.content)
    const status = useAppSelector((state) => state.people.status)
    const [list, setList] = useState('popular');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPeopleContent(list))
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