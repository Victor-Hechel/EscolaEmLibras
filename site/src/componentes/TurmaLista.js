import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AutenticacaoContext from '../contextos/autenticacao'
import Header from './Header'
import TituloPainel from './TituloPainel'

const TurmaLista = (props) => {

    const [ turmas, setTurmas ] = useState([])

    const { token } = useContext(AutenticacaoContext)

    useEffect(() => {
        const listarTurmas = async () => {
            const response = await fetch('http://www.localhost:3002/turma', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(response.status === 200) {
                const responseBody = await response.json()
                setTurmas(responseBody.turmas)
            }
        }
    
        listarTurmas()
    }, [token])
    

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div className="form-container"> 
                    <div>
                        <TituloPainel titulo="Lista" history={props.history} />
                        <table id="lista" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        <span>Nome</span>
                                        <Link to="/turmas/salvar">
                                            <button className="btn btn-sm btn-primary">Adicionar</button>
                                        </Link>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            
                        {
                            turmas && 
                            turmas.map((turma, index) => (
                                <tr key={index}>
                                    <td>
                                        <span>{turma.codigo}</span>
                                        <Link to={'/turmas/salvar/'+turma.id}>
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

export default TurmaLista