import React, { useContext, useEffect, useState } from "react"
import QuestaoEscrita from "./QuestaoEscrita"
import AutenticacaoContext from '../../contextos/autenticacao'
import QuestaoMultipla from "./QuestaoMultipla"
import QuestaoPares from "./QuestaoPares"


const Questao = (props) => {

    const { token } = useContext(AutenticacaoContext)

    const [ respondidoQuestao, setRespondidoQuestao ] =  useState(null)

    const [ respostaCerta, setRespostaCerta ] = useState(null)

    const questaoProps = props.questao

    useEffect(() => {
        setRespostaCerta(null)
        setRespondidoQuestao(null)
    }, [questaoProps])

    var questao = null
    if(props.questao.kind === 'QuestaoEscrita'){
        questao = <QuestaoEscrita 
            questao={props.questao}
            respondido={respondidoQuestao}
            setRespondidoQuestao={setRespondidoQuestao}
            respostaCerta={respostaCerta} 
            proximaQuestao={props.proximaQuestao} />
    }else if(props.questao.kind === 'QuestaoMultipla'){
        questao = <QuestaoMultipla 
            questao={props.questao}
            respondido={respondidoQuestao}
            setRespondidoQuestao={setRespondidoQuestao}
            respostaCerta={respostaCerta} 
            proximaQuestao={props.proximaQuestao} />
    }else if(props.questao.kind === 'QuestaoPares'){
        questao = <QuestaoPares 
            questao={props.questao}
            respondido={respondidoQuestao}
            setRespondidoQuestao={setRespondidoQuestao}
            respostaCerta={respostaCerta} 
            proximaQuestao={props.proximaQuestao} />
    }

    async function responder(){
        const response = await fetch(`http://www.localhost:3002/resposta/questao`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                respostaId: props.respostaId,
                questao: props.questao.id,
                respondido: respondidoQuestao
            })
        })

        if(response.status === 201) {
            const responseBody = await response.json()
            setRespostaCerta(responseBody.resultado)
        }
    }

    return (
        <div>
            {questao}
            <button type="button" className="btn btn-primary" onClick={responder}>Responder</button>
        </div>
    )
}

export default Questao