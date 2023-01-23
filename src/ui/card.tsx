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

const CardSkeleton: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 190 345" width='190'>
            <defs>
                <linearGradient id="skeleton-loading-animation" x1="-100%" x2="200%" gradientUnits="userSpaceOnUse" gradientTransform="rotate(20)">
                    <stop offset="0" stopColor="var(--md-sys-color-surface-variant)" stopOpacity="1">
                        <animate attributeName="offset" values="0;0.8" dur="1.4s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="0.1" stopColor="var(--md-sys-color-surface-variant)" stopOpacity="0" >
                        <animate attributeName="offset" values="0.1;0.9" dur="1.4s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="0.2" stopColor="var(--md-sys-color-surface-variant)" stopOpacity="1" >
                        <animate attributeName="offset" values="0.2;1" dur="1.4s" repeatCount="indefinite" />
                    </stop>
                </linearGradient>
            </defs>
            <path fill="url(#skeleton-loading-animation)" d="M32.5,325h0c-15.19,0-27.5-12.31-27.5-27.5h0c0-15.19,12.31-27.5,27.5-27.5h0c15.19,0,27.5,12.31,27.5,27.5h0c0,15.19-12.31,27.5-27.5,27.5Zm148.5-24v-7c0-2.21-1.79-4-4-4H72c-2.21,0-4,1.79-4,4v7c0,2.21,1.79,4,4,4h105c2.21,0,4-1.79,4-4ZM178,0H12C5.37,0,0,5.37,0,12V273c0,3.91,1.88,7.37,4.76,9.56,5.32-9.86,15.75-16.56,27.74-16.56h0c12.95,0,24.08,7.82,28.92,19h116.58c6.63,0,12-5.37,12-12V12c0-6.63-5.37-12-12-12Zm-20,319v-7c0-2.21-1.79-4-4-4H72c-2.21,0-4,1.79-4,4v7c0,2.21,1.79,4,4,4h82c2.21,0,4-1.79,4-4Z" />
        </svg>
    )
}

export { CardSkeleton }
export default Card
