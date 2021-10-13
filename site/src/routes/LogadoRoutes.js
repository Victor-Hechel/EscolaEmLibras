import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import AreaLogada from '../componentes/AreaLogada'
import ProfessorForm from '../componentes/ProfessorForm'
import ProfessorLista from '../componentes/ProfessorLista'
import AlunoForm from '../componentes/AlunoForm'
import AlunoLista from '../componentes/AlunoLista'

const LogadoRoutes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={AreaLogada} />
            <Route path="/professores" exact component={ProfessorLista} />
            <Route path="/professores/salvar/:id?" component={ProfessorForm} />
            <Route path="/alunos" exact component={AlunoLista} />
            <Route path="/alunos/salvar/:id?" component={AlunoForm} />
        </BrowserRouter>
    )
}

export default LogadoRoutes