import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar: React.FC = () => {
    const [serachQuery, setSerachQuery] = useState('')
    const nav = useNavigate()

    return (
        <div className="search-bar">
            <label>
                search
                <input
                    type={'text'}
                    placeholder='Поиск по фильмам, сериалам и людям'
                    onChange={(e) => setSerachQuery(e.target.value)}
                    onSubmit={(e) => console.log(e)}// nav(`/search/movie/${e}`)}
                />
            </label>
        </div>
    )
}

export default SearchBar