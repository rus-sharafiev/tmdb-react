import React from "react"
import useScrollDir from "../hooks/useScrollDir"
import SearchBar from "./SearchBar"
import Tabs from "./Tabs"

const Header: React.FC = () => {
    const scrollDir = useScrollDir('up')

    return (
        <header className={scrollDir}>
            <div className='overlay' />
            <Tabs />
            <SearchBar />
        </header>
    )
}

export default Header