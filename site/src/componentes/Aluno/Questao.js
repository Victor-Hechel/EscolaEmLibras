import React, { useContext, useState } from "react"
import QuestaoEscrita from "./QuestaoEscrita"
import AutenticacaoContext from '../../contextos/autenticacao'


const Questao = (props) => {

    const { token } = useContext(AutenticacaoContext)

    const [ respondidoQuestao, setRespondidoQuestao ] =  useState(null)

    const [ respostaCerta, setRespostaCerta ] = useState(null)

    console.log(respondidoQuestao)
    console.log(respostaCerta)
    var questao = null
    if(props.questao.kind){
        questao = <QuestaoEscrita 
            questao={props.questao} 
            setRespondidoQuestao={setRespondidoQuestao}
            respostaCerta={respostaCerta} />
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
            <button type="button" className="btn btn-primary" onClick={responder}>Próxima</button>
        </div>
    )
}

export default Questao