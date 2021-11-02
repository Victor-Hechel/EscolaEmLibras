import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Login from '../componentes/Login'

const DeslogadoRoutes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route render={() => <Redirect to="/" />} />
        </BrowserRouter>
    )
}

export default DeslogadoRoutes