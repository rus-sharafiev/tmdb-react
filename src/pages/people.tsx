import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux-hooks'
import { fetchPeopleContent } from '../contentSlice'
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
                    <Card key={person.id}
                        img={person.profile_path} 
                        title={person.name}/>
                )}
            </main>
            {status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

export default People;