import React, { useContext } from 'react'

import LogadoRoutes from './LogadoRoutes'
import DeslogadoRoutes from './DeslogadoRoutes'
import AutenticacaoContext from '../contextos/autenticacao'

const Routes = () => {

    const { token } = useContext(AutenticacaoContext)

    return (
        token ? <DeslogadoRoutes /> : <LogadoRoutes/>
    )
}

export default Routes