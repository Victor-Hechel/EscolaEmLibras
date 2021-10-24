import React, { useContext } from 'react'

import AutenticacaoContext from '../contextos/autenticacao'
import AdminRoutes from './AdminRoutes'
import ProfessorRoutes from './ProfessorRoutes'

const LogadoRoutes = () => {

    const { user } = useContext(AutenticacaoContext)
    const kind = user.kind.toLowerCase()

    switch(kind){
        case 'admin': return (<AdminRoutes />);
        case 'professor': return (<ProfessorRoutes />);
        case 'aluno': return (<div></div>);
        default: return (<></>);
    }
}

export default LogadoRoutes