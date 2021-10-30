import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AutenticacaoContext from '../../contextos/autenticacao'
import Header from '../Header'
import TituloPainel from '../TituloPainel'

const DisciplinaTurma = (props) => {

    const id  = props.match.params.id


    const [ nome, setNome ] = useState("")
    const [ alunos, setAlunos ] = useState([])
    const [ atividades, setAtividades ] = useState([])

    const { token } = useContext(AutenticacaoContext)

    useEffect(() => {

        const carregarTurma = async () => {
            const response = await fetch(`http://www.localhost:3002/disciplina/${id}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status === 200){
                const responseBody = await response.json()
                setNome(responseBody.disciplina.nome)
                await carregarAlunos(responseBody.disciplina.turma)
            }
        }

        const carregarAlunos = async (turmaId) => {
            const response = await fetch(`http://www.localhost:3002/turma/${turmaId}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status === 200){
                const responseBody = await response.json()
                setAlunos(responseBody.turma.alunos)
            }
        }

        carregarTurma()

    }, [id, token])

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div className="form-container">
                    <div>
                        <TituloPainel titulo={nome} history={props.history} />
                        <table id="lista" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Alunos</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                        {
                            alunos && 
                            alunos.map((aluno, index) => (
                                <tr key={index} 
                                    onClick={() => props.history.push(`/disciplina/${id}/aluno/${aluno.id}`)}>
                                    <td>
                                        {aluno.nome}
                                    </td>
                                </tr>
                            ))
                        }
                            </tbody>
                        </table>

                        <table id="lista" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span>Tarefas</span>
                                        <Link to={`/tarefa/salvar?disciplinaId=${id}`}>
                                            <button className="btn btn-sm btn-primary align-right">Adicionar</button>
                                        </Link>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
{/*                             
                        {
                            alunos && 
                            alunos.map((aluno, index) => (
                                <tr key={index} 
                                    onClick={() => props.history.push(`/disciplina/${id}/aluno/${aluno.id}`)}>
                                    <td>
                                        {aluno.nome}
                                    </td>
                                </tr>
                            ))
                        } */}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </main>
        </>
    )
}

export default DisciplinaTurma