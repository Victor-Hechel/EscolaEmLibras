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
            console.log(responseBody)
            setRespostaId(responseBody.id)
            setQuestaoAtual(0)
        }

    }

    function proximaQuestao(){
        setQuestaoAtual(questaoAtual+1)
    }

    var questaoPage = null
    
    if(questaoAtual != null){
        questaoPage = <Questao 
            questao={tarefa.questoes[questaoAtual]} 
            respostaId={respostaId} 
            proximaQuestao={proximaQuestao} />
    }
    else{
        questaoPage = <div>
            <TituloPainel titulo={tarefa.titulo} />
            <h3>Questões: 0/{tarefa.questoes.length}</h3>
            <button type="button" className="btn btn-primary" onClick={comecarTarefa}>Começar</button>
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