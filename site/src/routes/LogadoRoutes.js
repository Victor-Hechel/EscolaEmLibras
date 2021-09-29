import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import AreaLogada from '../componentes/AreaLogada'
import Lista from '../componentes/Lista'
import ProfessorForm from '../componentes/ProfessorForm'

const LogadoRoutes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={AreaLogada} />
            <Route path="/professores" exact component={Lista} />
            <Route path="/professores/salvar" component={ProfessorForm} />
        </BrowserRouter>
    )
}

export default LogadoRoutes