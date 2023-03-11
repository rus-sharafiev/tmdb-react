import React from "react"
import useScrollDir from "../hooks/useScrollDir"

const Header: React.FC = () => {
    const scrollDir = useScrollDir('up')

    return (
        <header className={scrollDir}>
            <div className='overlay' />
            <label>
                search
                <input type={'text'} placeholder='Поиск по фильмам, сериалам и людям' />
            </label>
        </header>
    )
}

export default Header