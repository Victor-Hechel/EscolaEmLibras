import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from '../componentes/Professor/Home'

const ProfessorRoutes = () => {

    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
        </BrowserRouter>
    )
}

export default ProfessorRoutes