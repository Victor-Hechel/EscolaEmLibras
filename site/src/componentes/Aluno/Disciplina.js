import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AutenticacaoContext from '../../contextos/autenticacao'
import Header from '../Header'
import TituloPainel from '../TituloPainel'

const Disciplina = (props) => {

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
                await carregarAtividades()
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

        const carregarAtividades = async () => {
            const response = await fetch(`http://www.localhost:3002/tarefa?disciplinaId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status === 200){
                const responseBody = await response.json()
                
                setAtividades(responseBody.tarefas)
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
                        <table id="lista" className="table lista-alunos">
                            <thead>
                                <tr>
                                    <th colSpan="2">Alunos</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                        {
                            alunos && 
                            alunos.map((aluno, index) => (
                                <tr key={index} >
                                    <td>
                                        {aluno.nome}
                                    </td>
                                    <td>
                                        {aluno.pontos} pts
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
                        {
                            
                            atividades && 
                            atividades.map((atividade, index) => (
                                <tr key={index} 
                                    onClick={() => props.history.push(`/tarefa/${atividade.id}`)}>
                                    <td>
                                        {atividade.titulo}
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

export default Disciplina