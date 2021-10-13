import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AutenticacaoContext from '../contextos/autenticacao'
import Header from './Header'
import TituloPainel from './TituloPainel'

const Lista = (props) => {

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
                setProfessores(responseBody.professores)
            }
        }
    
        listarProfessores()
    }, [token])
    

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div class="form-container"> 
                    <div>
                        <TituloPainel titulo="Lista" history={props.history} />
                        <table id="lista" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        <span>Nome</span>
                                        <Link to="/professores/salvar">
                                            <button className="btn btn-sm btn-primary">Adicionar</button>
                                        </Link>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            
                        {
                            professores && 
                            professores.map((professor, index) => (
                                <tr>
                                    <td key={index}>
                                        <span>{professor.nome}</span>
                                        <Link to={'/professores/salvar/'+professor.id}>
                                            <button className="btn btn-sm btn-primary">Editar</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </main>
        </>
    )
} 

export default Lista