import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Disciplina from '../componentes/Aluno/Disciplina'
import DisciplinaLista from '../componentes/Aluno/DisciplinaLista'
import Tarefa from '../componentes/Aluno/Tarefa'

const ProfessorRoutes = () => {

    return (
        <BrowserRouter>
            <Route path="/" exact component={DisciplinaLista} />
            <Route path="/disciplina/:id?" component={Disciplina} />
            <Route path="/tarefa/:id?" component={Tarefa} />
        </BrowserRouter>
    )
}

export default ProfessorRoutes