import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import DisciplinaLista from '../componentes/Professor/DisciplinaLista'
import DisciplinaTurma from '../componentes/Professor/DisciplinaTurma'
import TarefaForm from '../componentes/Professor/TarefaForm'

const ProfessorRoutes = () => {

    return (
        <BrowserRouter>
            <Route path="/" exact component={DisciplinaLista} />
            <Route path="/disciplina/:id?" component={DisciplinaTurma} />
            <Route path="/tarefa/salvar" component={TarefaForm} />
        </BrowserRouter>
    )
}

export default ProfessorRoutes