import React, { useContext, useEffect, useState } from "react";
import AutenticacaoContext from "../../contextos/autenticacao";
import TituloPainel from "../TituloPainel";

const ResumoTarefa = (props) => {

    const respostaId = props.respostaId

    const { token } = useContext(AutenticacaoContext)

    const [ resposta, setResposta ] = useState({})

    useEffect(() => {
        const carregarResposta = async () => {
            const response = await fetch(`http://www.localhost:3002/resposta/${respostaId}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status === 200){
                const responseBody = await response.json()
                setResposta(responseBody.resposta)
            }
        }

        carregarResposta()

    }, [token, respostaId])

    var quantidadeQuestoesCertas = 0
    var quantidadeQuestoes = 0
    if(resposta.questoes){
        quantidadeQuestoesCertas = resposta.questoes.reduce((certas, questao) => certas + (questao.respostaAluno.certa ? 1 : 0), 0)
        quantidadeQuestoes = resposta.questoes.length
    }
    

    return (
        <div>
            <TituloPainel titulo="Tarefa finalizada!" />
            <h3>Questões certas: {quantidadeQuestoesCertas}/{quantidadeQuestoes}</h3>
            <h4>Pontos: {resposta.pontos}</h4>
        </div>
    )
}


export default ResumoTarefa