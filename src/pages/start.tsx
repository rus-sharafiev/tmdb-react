import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/redux-hooks'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'
import Select from 'react-select'

const Start: React.FC = () => {
    return (
        <>
            <main className={'start'}>
            </main>
        </>
    )
};

export default Start;