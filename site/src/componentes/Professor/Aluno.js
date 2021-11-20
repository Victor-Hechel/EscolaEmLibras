import React, { useContext, useEffect, useState } from "react";
import AutenticacaoContext from "../../contextos/autenticacao";
import Header from "../Header";
import TituloPainel from "../TituloPainel";

const Aluno = (props) => {

    const [ aluno, setAluno ] = useState({ id: null, nome: null })
    const [ tarefas, setTarefas ] = useState([])

    const { token } = useContext(AutenticacaoContext)

    const disciplinaId  = props.match.params.disciplinaId
    const alunoId = props.match.params.alunoId

    useEffect(() => {
        const listarDisciplinas = async () => {
            const response = await fetch(`http://www.localhost:3002/aluno/${alunoId}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(response.status === 200) {
                const responseBody = await response.json()
                setAluno(responseBody.aluno)
            }
        }
    
        listarDisciplinas()
    }, [alunoId, token])

    useEffect(() => {
        const carregarTarefas = async () => {
            const response = await fetch(`http://www.localhost:3002/tarefa?disciplinaId=${disciplinaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status === 200){
                const responseBody = await response.json()
                carregarRespostas(responseBody.tarefas)
            }
        }

        const carregarRespostas = async(tarefas) => {
            const response = await fetch(`http://www.localhost:3002/resposta?alunoId=${alunoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status === 200){
                const responseBody = await response.json()

                const tarefasModelo = []
                for(const tarefa of tarefas){
                    const tarefaModelo = {
                        id: tarefa.id,
                        titulo: tarefa.titulo,
                        numeroQuestoes: tarefa.questoes.length
                    }
                    
                    const resposta = responseBody.respostas.filter(r => tarefa.id === r.tarefaId)
                    if(resposta.length){
                        tarefaModelo.numeroCertas = resposta[0].pontos/10
                    }
                        
                    
                    tarefasModelo.push(tarefaModelo)
                }

                setTarefas(tarefasModelo)
            }
        }

        carregarTarefas()
    }, [alunoId, disciplinaId, token])
    

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div className="form-container">
                    <div>
                        <TituloPainel titulo={aluno.nome} history={props.history} />
                        <table id="lista" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Tarefas</th>
                                    <th>Pontos</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                        {
                            tarefas && 
                            tarefas.map((tarefa, index) => (
                                <tr key={index} 
                                    onClick={() => props.history.push(`/resposta/${tarefa.id}`)}>
                                    <td>
                                        {tarefa.titulo}
                                    </td>
                                    <td>
                                        {tarefa.numeroCertas ? `${tarefa.numeroCertas} / ${tarefa.numeroQuestoes}`  : "-" }
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

export default Aluno