import React from 'react'
import { Link } from 'react-router-dom'

const AreaLogada = () => {
    return (
        <div id="opcoes-admin" className="text-center">
            <h1>Área Logada</h1>
            <div>
                <Link to="/professores">
                    <button className="w-50 btn btn-lg btn-primary">Lista professores</button>
                </Link>
            </div>
            <div>
                <Link to="/alunos">
                    <button className="w-50 btn btn-lg btn-primary">Lista alunos</button>
                </Link>
            </div>
            <div>
                <Link to="/turmas">
                    <button className="w-50 btn btn-lg btn-primary">Lista turmas</button>
                </Link>
            </div>
        </div>
    )
}

export default AreaLogada