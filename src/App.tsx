import React from 'react'
import { Outlet } from "react-router-dom"

import Logo from './ui/logo'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'

const App: React.FC = () => {

    return (
        <>
            <Outlet />
            <Header />
            <Logo />
            <Footer />
            <Nav />
        </>
    )
}

export default App