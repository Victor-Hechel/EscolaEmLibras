import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AutenticacaoContext from '../contextos/autenticacao'
import Header from './Header'
import TituloPainel from './TituloPainel'

const Lista = (props) => {

    const [ alunos, setAlunos ] = useState([])

    const { token } = useContext(AutenticacaoContext)

    useEffect(() => {
        const listarAlunos = async () => {
            const response = await fetch('http://www.localhost:3002/aluno', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(response.status === 200) {
                const responseBody = await response.json()
                setAlunos(responseBody.alunos)
            }
        }
    
        listarAlunos()
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
                                        <Link to="/alunos/salvar">
                                            <button className="btn btn-sm btn-primary">Adicionar</button>
                                        </Link>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            
                        {
                            alunos && 
                            alunos.map((aluno, index) => (
                                <tr>
                                    <td key={index}>
                                        <span>{aluno.nome}</span>
                                        <Link to={'/alunos/salvar/'+aluno.id}>
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