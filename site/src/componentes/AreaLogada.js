import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'


const AreaLogada = () => {
    return (
        <>
        <Header />
        <div id="opcoes-admin" className="text-center">
            <h1>Bem vindo(a)!</h1>

            <div className="row">
                <div className="col">
                    <Link to="/professores">
                        <button className="w-50 btn btn-lg btn-primary">Lista professores</button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="/alunos">
                        <button className="w-50 btn btn-lg btn-primary">Lista alunos</button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <Link to="/turmas">
                    <button className="w-50 btn btn-lg btn-primary">Lista turmas</button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default AreaLogada