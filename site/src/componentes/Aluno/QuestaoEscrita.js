import React from "react"
import TituloQuestao from "../TituloQuestao"

const QuestaoEscrita = (props) => {

    var respostaHtml = null

    const respostaInput = props.respondido ? props.respondido : ""

    if(props.respostaCerta){
        if(props.respostaCerta.estaCorreta){
            respostaHtml = <div className="margin-bottom">
                <h3>Resposta Certa!</h3>
            </div>
        }else{
            respostaHtml = <div className="margin-bottom">
                <h3>Resposta Errada!</h3>
                <p>
                    Resposta Certa: <span className="bold">{props.respostaCerta.certa}</span>
                </p>
            </div>
        }
    }

    return (
        <>
            <div className="margin-bottom">
                <span className="midia-md">
                    <TituloQuestao questao={props.questao} />
                </span>
                <input type="text" className="form-control" placeholder="Digite sua resposta..." 
                    onChange={e => props.setRespondidoQuestao(e.target.value)} 
                    value={respostaInput}/>    
            </div>
            {respostaHtml}
        </>
        
    )

}

export default QuestaoEscrita