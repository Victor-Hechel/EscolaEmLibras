import React, { useContext, useEffect, useState } from "react";
import AutenticacaoContext from "../../contextos/autenticacao";
import Header from "../Header";
import TituloPainel from "../TituloPainel";

const Resposta = (props) => {

    const [ tarefas, setTarefas ] = useState([])

    const { token } = useContext(AutenticacaoContext)

    const disciplinaId  = props.match.params.disciplinaId
    const alunoId = props.match.params.alunoId

    useEffect(() => {
        setTarefas([
            {
                id: "123",
                titulo: "Uma atividade aí",
                pontos: 50
            },
            {
                id: "456",
                titulo: "Outra atividade"
            }
        ])
    }, [disciplinaId, alunoId, token])
    

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div className="form-container">
                    <div>
                        <TituloPainel titulo={"Nome do Aluno"} history={props.history} />
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
                                        {tarefa.pontos ? tarefa.pontos : "-" }
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

export default Resposta