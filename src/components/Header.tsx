import React from "react"
import useScrollDir from "../hooks/useScrollDir"
import SearchBar from "./SearchBar"

const Header: React.FC = () => {
    const scrollDir = useScrollDir('up')

    return (
        <header className={scrollDir}>
            <div className='overlay' />
            < SearchBar />
        </header>
    )
}

export default Header