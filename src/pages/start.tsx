import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux-hooks'
import { fetchTvsContent } from '../contentSlice'
import { Tv } from '../types'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'

const Start: React.FC = () => {
    return (
        <>
            <main className={'start'}>
            </main>
        </>
    )
};

export default Start;