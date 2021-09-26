import React, { createContext, useState } from 'react'

const AutenticacaoContext = createContext({})

export const AutenticacaoProvider = ({ children }) => {

    const [token, setToken] = useState("")

    function Logar(tokenParam) {
        console.log("Olha o token no contexto aqui: ", tokenParam)
    
        setToken(tokenParam)
    
    }

    return (
        <AutenticacaoContext.Provider value={{ signed: true, Logar, token }}>
            {children}
        </AutenticacaoContext.Provider>
    )
}

export default AutenticacaoContext