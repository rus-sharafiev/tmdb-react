import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import CircularProgressIndicator from '../ui/cpi'
import { MediaCardSkeleton } from '../ui/skeletons'

const Home: React.FC = () => {
    // const [images, setImages] = useState([])
    // var arr: [] = []

    // useEffect(() => {
    //     const fetcher = async () => {
    //         let resp1 = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=c0cd17f2ebe19b55372de99dfd4c7e63&language=ru&page=1')
    //         let arr1 = await resp1.json()

    //         let resp2 = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=c0cd17f2ebe19b55372de99dfd4c7e63&language=ru&page=2')
    //         let arr2 = await resp2.json()

    //         let resp3 = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=c0cd17f2ebe19b55372de99dfd4c7e63&language=ru&page=3')
    //         let arr3 = await resp3.json()

    //         let resp4 = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=c0cd17f2ebe19b55372de99dfd4c7e63&language=ru&page=4')
    //         let arr4 = await resp4.json()

    //         let resp5 = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=c0cd17f2ebe19b55372de99dfd4c7e63&language=ru&page=5')
    //         let arr5 = await resp5.json()

    //         let resp6 = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=c0cd17f2ebe19b55372de99dfd4c7e63&language=ru&page=6')
    //         let arr6 = await resp6.json()

    //         let resp7 = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=c0cd17f2ebe19b55372de99dfd4c7e63&language=ru&page=7')
    //         let arr7 = await resp7.json()

    //         let result = arr.concat(arr1.results, arr2.results, arr3.results, arr4.results, arr5.results, arr6.results, arr7.results)

    //         return result;
    //     }
    //     fetcher().then((arr) => setImages(arr))
    // }, [])

    return (
        <>
            <main className={'start'}>
                {/* <MediaCardSkeleton /> */}
            </main>
        </>
    )
}

export default Home