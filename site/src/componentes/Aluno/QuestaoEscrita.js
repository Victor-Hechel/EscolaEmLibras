import React from "react"

const QuestaoEscrita = (props) => {

    var respostaHtml = null
    console.log(props.respostaCerta)

    if(props.respostaCerta){
        if(props.respostaCerta.estaCerta){
            respostaHtml = <div>
                <h3>Resposta Certa!</h3>
                <button type="button" className="btn btn-primary">Próxima</button>
            </div>
        }else{
            respostaHtml = <div>
                <h3>Resposta Errada!</h3>
                <p>
                    Resposta Certa: {props.respostaCerta.certa}
                </p>
            </div>
        }
    }

    return (
        <div>
            <h3>{props.questao.enunciado}</h3>
            <input type="text" className="form-control" placeholder="Digite sua resposta..." onChange={e => props.setRespondidoQuestao(e.target.value)}/>
            {respostaHtml}
        </div>
    )

}

export default QuestaoEscrita