import React, { createContext, useState } from 'react'
import jwtDecode from 'jwt-decode'

const AutenticacaoContext = createContext({})

export const AutenticacaoProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"))

    function Logar(tokenParam) {
        setToken(tokenParam)
        localStorage.setItem("token", tokenParam)
        localStorage.setItem("user", JSON.stringify(jwtDecode(tokenParam).usuario))
    }

    return (
        <AutenticacaoContext.Provider value={{ signed: true, Logar, token }}>
            {children}
        </AutenticacaoContext.Provider>
    )
}

export default AutenticacaoContext