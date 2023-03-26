import React from 'react'
import { Outlet } from "react-router-dom"

import Logo from './components/ui/logo'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'

const App: React.FC = () => {

    return (
        <>
            <Outlet />
            <Header />
            <Footer />
            <Nav />
            <Logo />
        </>
    )
}

export default App