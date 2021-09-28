import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AutenticacaoContext from '../contextos/autenticacao'

const Lista = () => {

    const [ professores, setProfessores ] = useState([])

    const { token } = useContext(AutenticacaoContext)

    useEffect(() => {
        const listarProfessores = async () => {
            const response = await fetch('http://www.localhost:3002/professor', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(response.status === 200) {
                const responseBody = await response.json()
                console.log(responseBody)

                setProfessores(responseBody.professores)
            }
        }
    
        listarProfessores()
    }, [token])
    

    return (
        <div>
            <h1>Lista</h1>

            <ul>
            {
                professores && 
                professores.map((professor, index) => (
                    <li key={index}>{professor.nome}</li>
                ))
            }
            </ul>
            <Link to="/professores/salvar">
                <button className="btn btn-lg btn-primary">Adicionar</button>
            </Link>

            
        </div>
    )
} 

export default Lista