import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchPopularPeople, fetchRussianNames, ppNext } from '../store/peopleSlice'
import { RootState } from '../store/store'
import { PersonCard } from '../types/cards'
import CircularProgressIndicator from '../ui/cpi'
import Tab from '../components/Tab'
import useScrollDir from '../hooks/useScrollDir'

const People: React.FC = () => {
    const people = useAppSelector((state: RootState) => state.people)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list } = useParams()
    const scrollDir = useScrollDir('up')

    useEffect(() => {
        if (!list) navigate('popular', { replace: true })

        switch (list) {
            case 'popular':
                if (people.popular.status === 'idle') dispatch(fetchPopularPeople(people.popular.page))
                if (people.russianNames.status === 'idle') dispatch(fetchRussianNames(people.popular.page))
                break;
        }
    }, [list])

    if (!list) return null

    return (
        <main className='lists'>
            <div className={'tabs ' + scrollDir}>
                <Tab to='popular' name='Популярные' />
                <Tab to='top_rated' name='Лучшие' />
                <Tab to='upcoming' name='Ожидаемые' />
            </div>
            <div className={people[list].status !== 'complete' ? 'cards hidden' : 'cards'}>
                {people[list].status === 'complete' && people[list].content.map((person: PersonCard) => {
                    let name = person.name
                    people.russianNames.content.length !== 0
                        && people.russianNames.content.map((rusName: { id: number, name: string }) =>
                            rusName.id === person.id
                                ? name = rusName.name
                                : null)
                    return (
                        <div className='card' key={person.id}>
                            <img src={person.profile_path} alt='image' />
                            <div className='name'>
                                <span>{name}</span>
                                <span>{person.name}</span>
                            </div>
                        </div>)
                })}
            </div>
            {people[list].status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </main>
    )
};

export default People;