import React, { useContext } from "react"
import AutenticacaoContext from '../contextos/autenticacao';

const Header = () => {

    const { Deslogar } = useContext(AutenticacaoContext)

    return (
        <header>
            <img id="logo" src="/logo_site.png" alt="logo do site" />
            <h1>Escola em Libras</h1>
    
            <div className="right-content">
                <i id="logout-icon" className="bi bi-box-arrow-right" onClick={Deslogar}></i>
            </div>
        </header>
    )
}

export default Header