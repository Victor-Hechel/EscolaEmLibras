import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import AreaLogada from '../componentes/AreaLogada'

const LogadoRoutes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={AreaLogada} />
        </BrowserRouter>
    )
}

export default LogadoRoutes