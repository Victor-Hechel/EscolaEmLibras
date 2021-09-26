import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from '../componentes/Login'

const DeslogadoRoutes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
        </BrowserRouter>
    )
}

export default DeslogadoRoutes