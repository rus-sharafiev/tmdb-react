import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { fetchPopularPeople } from '../store/peopleSlice'
import { RootState } from '../store/store'
import { Person } from '../types'
import CircularProgressIndicator from '../ui/cpi'
import { nanoid } from 'nanoid'

const getRussianName = async (id: number) => {
    const cyrillicPattern = /^[\u0410-\u044F\s]+$/;

    let response = await fetch(`/api/person/${id}`)
    let person = await response.json()

    return new Promise<string>((resolve, reject) => {
        person?.also_known_as?.map((name: string) => {
            if (cyrillicPattern.test(name)) {
                return resolve(name)
            }
        })
        resolve(person.name)
    })
}

interface RusNames { id: number, name: string }

const getRussianNamesArray = async (people: Person[]) => {
    let arr: RusNames[] = await Promise.all(people.map(async (person: Person) => {
        let russianName = await getRussianName(person.id)
        return { id: person.id, name: russianName }
    }))
    return arr
}

const People: React.FC = () => {
    const people = useAppSelector((state: RootState) => state.people)
    const dispatch = useAppDispatch()
    const [russianNames, setRussianNames] = useState<RusNames[]>([])
    let { list } = useParams()

    useEffect(() => {
        switch (list) {
            case 'popular':
                if (people.popular.status === 'idle')
                    dispatch(fetchPopularPeople())
                        .unwrap()
                        .then((res) => getRussianNamesArray(res))
                        .then((names) => setRussianNames(names))
                break;
        }
    }, [list])

    if (!list) return null

    return (
        <>
            <main className={people[list].status !== 'complete' ? 'cards hidden' : 'cards'}>
                {people[list].status === 'complete' && people[list].content.map((person: Person) => {
                    let name = person.name
                    russianNames.length !== 0 && russianNames.map((rusName) => rusName.id === person.id ? name = rusName.name : null)
                    return (
                        <div className='card' key={person.id}>
                            <img src={person.profile_path} alt='image' />
                            <div className='name'>
                                <span>{name}</span>
                                <span>{person.name}</span>
                            </div>
                        </div>)
                })}
            </main>
            {people[list].status === 'loading' && <CircularProgressIndicator className='cpi' />}
        </>
    )
};

export default People;