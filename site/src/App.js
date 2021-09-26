import React from 'react'
import Routes from './routes'
import { AutenticacaoProvider } from './contextos/autenticacao'

class App extends React.Component {

    render(){
        return (
            <AutenticacaoProvider>
                <Routes />
            </AutenticacaoProvider>
        )
    }
}

export default App