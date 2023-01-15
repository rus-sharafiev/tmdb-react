import React from "react"
import Rating from "../ui/rating"

const Card: React.FC<{ img: string, title: string, rating?: number, votes?: number, originalTitle?: string }> = ({ img, title, rating, votes, originalTitle }) => {
    return (
        <div className='card'>
            <img src={img} />
            <Rating radius={22.5} rating={parseFloat(rating ? rating.toFixed(1) : '0')} votes={votes} />
            <div className='title'>
                <span>{title}</span>
                <span>{originalTitle}</span>
            </div>
        </div>
    )
}

const Start: React.FC = () => {
    return (
        <div></div>
    )
}

export default Card