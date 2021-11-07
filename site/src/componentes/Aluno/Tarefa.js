import React, { useEffect, useContext, useState } from "react";
import AutenticacaoContext from '../../contextos/autenticacao'
import Header from "../Header";
import TituloPainel from "../TituloPainel";
import Questao from "./Questao";

const Tarefa = (props) => {

    const id  = props.match.params.id
    const { token } = useContext(AutenticacaoContext)
    
    const [ tarefa, setTarefa ] = useState({
        titulo: "",
        questoes: []
    })

    const [ questaoAtual, setQuestaoAtual ] = useState(null)
    const [ respostaId, setRespostaId ] = useState("")

    useEffect(() => {
        const carregarTarefa = async () => {
            const response = await fetch(`http://www.localhost:3002/tarefa/${id}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status === 200){
                const responseBody = await response.json()
                setTarefa(responseBody.tarefa)
            }
        }

        carregarTarefa()

    }, [token, id])

    async function comecarTarefa(){

        const response = await fetch(`http://www.localhost:3002/resposta`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tarefaId: id
            })
        })

        if(response.status === 201){
            const responseBody = await response.json()
            setRespostaId(responseBody.id)
            setQuestaoAtual(0)
        }

    }

    function proximaQuestao(){
        setQuestaoAtual(questaoAtual+1)
    }

    var questaoPage = null

    if(questaoAtual != null && questaoAtual < tarefa.questoes.length){
        questaoPage = <Questao 
            key={questaoAtual}
            questao={tarefa.questoes[questaoAtual]} 
            respostaId={respostaId} 
            proximaQuestao={proximaQuestao} />
    }
    else if(questaoAtual == null){
        questaoPage = <div>
            <TituloPainel titulo={tarefa.titulo} />
            <h3>Questões: 0/{tarefa.questoes.length}</h3>
            <button type="button" className="btn btn-primary" onClick={comecarTarefa}>Começar</button>
        </div>
    } else {
        questaoPage = <div>
            <TituloPainel titulo="Tarefa finalizada!" />
            <h3>Questões certas: {0}/{tarefa.questoes.length}</h3>
            <h4>Pontos: {0}</h4>
        </div>
    }

        

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div className="form-container">
                    {questaoPage}
                </div>
            </main>
        </>
    )
}

export default Tarefa