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
                <button className="w-50 btn btn-lg btn-primary">Lista alunos</button>
            </div>
            <div>
                <button className="w-50 btn btn-lg btn-primary">Lista turmas</button>
            </div>
        </div>
    )
}

export default AreaLogada