import React from "react"

const MediaCardSkeleton: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 195 350" width='195'>
            <path fill="url(#skeleton-gradient)" opacity="0.6" d="M60,307.5c0,15.19-12.31,27.5-27.5,27.5s-27.5-12.31-27.5-27.5,12.31-27.5,27.5-27.5,27.5,12.31,27.5,27.5ZM183,0H12C5.37,0,0,5.37,0,12V281c0,3.91,1.87,7.37,4.76,9.56,5.71-9.33,16-15.56,27.74-15.56,12.74,0,23.76,7.33,29.09,18h121.41c6.63,0,12-5.37,12-12V12c0-6.63-5.37-12-12-12Zm-16,307v-6c0-2.21-1.79-4-4-4H71c-2.21,0-4,1.79-4,4v6c0,2.21,1.79,4,4,4h92c2.21,0,4-1.79,4-4Zm-30,14v-3c0-2.21-1.79-4-4-4h-62c-2.21,0-4,1.79-4,4v3c0,2.21,1.79,4,4,4h62c2.21,0,4-1.79,4-4Z" />
        </svg>
    )
}

const PersonCardSkeleton: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 195 350" width='195'>
            <path fill="url(#skeleton-gradient)" opacity="0.6" d="M60.5,308.5c0,15.19-12.31,27.5-27.5,27.5s-27.5-12.31-27.5-27.5,12.31-27.5,27.5-27.5,27.5,12.31,27.5,27.5ZM183.5,1H12.5C5.87,1,.5,6.37,.5,13V282c0,3.91,1.87,7.37,4.76,9.56,5.71-9.33,16-15.56,27.74-15.56,12.74,0,23.76,7.33,29.09,18h121.41c6.63,0,12-5.37,12-12V13c0-6.63-5.37-12-12-12Zm5,312v-8c0-2.21-1.79-4-4-4H78.5c-2.21,0-4,1.79-4,4v8c0,2.21,1.79,4,4,4h106c2.21,0,4-1.79,4-4Zm-17,19v-5c0-2.21-1.79-4-4-4H78.5c-2.21,0-4,1.79-4,4v5c0,2.21,1.79,4,4,4h89c2.21,0,4-1.79,4-4Z" />
        </svg>
    )
}

const MovieSkeleton: React.FC = () => {
    return (
        <>
            <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
            <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
            <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
            <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
            <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
            <div><svg xmlns="http://www.w3.org/2000/svg" ><rect /></svg></div>
        </>
    )
}

export { MediaCardSkeleton, PersonCardSkeleton, MovieSkeleton }
