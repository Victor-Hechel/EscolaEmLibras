import React from "react"

const QuestaoEscrita = (props) => {

    var respostaHtml = null

    const respostaInput = props.respondido ? props.respondido : ""

    if(props.respostaCerta){
        if(props.respostaCerta.estaCorreta){
            respostaHtml = <div>
                <h3>Resposta Certa!</h3>
                <button type="button" className="btn btn-primary" onClick={props.proximaQuestao}>Próxima</button>
            </div>
        }else{
            respostaHtml = <div>
                <h3>Resposta Errada!</h3>
                <p>
                    Resposta Certa: {props.respostaCerta.certa}
                </p>
                <button type="button" className="btn btn-primary" onClick={props.proximaQuestao}>Próxima</button>
            </div>
        }
    }

    return (
        <div>
            <h3>{props.questao.enunciado}</h3>
            <input type="text" className="form-control" placeholder="Digite sua resposta..." 
                onChange={e => props.setRespondidoQuestao(e.target.value)} 
                value={respostaInput}/>
            {respostaHtml}
        </div>
    )

}

export default QuestaoEscrita