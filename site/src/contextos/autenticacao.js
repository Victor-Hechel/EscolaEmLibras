import React, { createContext, useState } from 'react'
import jwtDecode from 'jwt-decode'

const AutenticacaoContext = createContext({})

export const AutenticacaoProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const user = localStorage.getItem("user")


    function Logar(tokenParam) {

        localStorage.setItem("token", tokenParam)
        const userDecoded = jwtDecode(tokenParam).usuario
        localStorage.setItem("user", JSON.stringify(userDecoded))        
        
        setToken(tokenParam)
        
    }

    function Deslogar(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
    }

    return (
        <AutenticacaoContext.Provider value={{ signed: true, Logar, Deslogar, token, user: JSON.parse(user) }}>
            {children}
        </AutenticacaoContext.Provider>
    )
}

export default AutenticacaoContext