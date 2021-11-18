import React, { useContext, useEffect, useState } from "react";
import AutenticacaoContext from "../../contextos/autenticacao";
import TituloPainel from "../TituloPainel";

const ResumoTarefa = (props) => {

    const respostaId = props.respostaId

    const { token, user } = useContext(AutenticacaoContext)

    const [ resposta, setResposta ] = useState({})

    const userId = user.id

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
                atualizarPontos(responseBody.resposta.pontos)
            }
        }

        const atualizarPontos = (pontos) => {
            fetch(`http://www.localhost:3002/aluno/${userId}/aumentar-pontos`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    pontos
                })
            })
        }

        carregarResposta()

    }, [token, respostaId, userId])

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