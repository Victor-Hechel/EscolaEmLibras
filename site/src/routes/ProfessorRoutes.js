import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Aluno from '../componentes/Professor/Aluno'

import DisciplinaLista from '../componentes/Professor/DisciplinaLista'
import DisciplinaTurma from '../componentes/Professor/DisciplinaTurma'
import Resposta from '../componentes/Professor/Resposta'
import TarefaForm from '../componentes/Professor/TarefaForm'

const ProfessorRoutes = () => {

    return (
        <BrowserRouter>
            <Route path="/" exact component={DisciplinaLista} />
            <Route path="/disciplina/:id?" exact component={DisciplinaTurma} />
            <Route path="/tarefa/salvar" component={TarefaForm} />
            <Route path="/disciplina/:disciplinaId?/aluno/:alunoId?" component={Aluno} />
            <Route path="/resposta/:id?" component={Resposta} />
        </BrowserRouter>
    )
}

export default ProfessorRoutes