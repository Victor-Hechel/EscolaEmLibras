import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import DisciplinaLista from '../componentes/Aluno/DisciplinaLista'
// import DisciplinaTurma from '../componentes/Professor/DisciplinaTurma'

const ProfessorRoutes = () => {

    return (
        <BrowserRouter>
            <Route path="/" exact component={DisciplinaLista} />
            {/* <Route path="/disciplina/:id?" component={DisciplinaTurma} /> */}
        </BrowserRouter>
    )
}

export default ProfessorRoutes