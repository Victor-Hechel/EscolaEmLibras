import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import DisciplinaLista from '../componentes/Professor/DisciplinaLista'

const ProfessorRoutes = () => {

    return (
        <BrowserRouter>
            <Route path="/" exact component={DisciplinaLista} />
        </BrowserRouter>
    )
}

export default ProfessorRoutes