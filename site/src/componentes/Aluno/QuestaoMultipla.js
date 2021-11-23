import React from "react"
import TextoMidia from "../TextoMidia"
import TituloQuestao from "../TituloQuestao"

const QuestaoMultipla = (props) => {

    var respostaHtml = null

    if(props.respostaCerta){
        if(props.respostaCerta.estaCorreta){
            respostaHtml = <div className="margin-bottom">
                <h3>Resposta Certa!</h3>
            </div>
        }else{
            const alternativaCerta = props.questao.alternativas.filter(x => x.id === props.respostaCerta.certa)[0]
            respostaHtml = <div className="margin-bottom">
                <h3>Resposta Errada!</h3>
                <p>
                    Resposta Certa: <TextoMidia texto={alternativaCerta.texto} midia={alternativaCerta.midia} />
                </p>
            </div>
        }
    }

    return (
        <div className="midia-md">
            <div className="margin-bottom questao-multipla-escolha">
                <TituloQuestao questao={props.questao} />
                <table id="lista" className="table table-bordered background-gray ">
                    <tbody>
                    {
                        props.questao.alternativas &&
                        props.questao.alternativas.map((alternativa,index) =>
                        (
                            <tr key={index}>
                                <td>
                                    <div className="flex-container">
                                        <div className="flex-item">
                                            <input type="radio" name="alternativaCorreta" className="form-check-input" value={alternativa.id} onChange={e => props.setRespondidoQuestao(e.target.value)}/>
                                        </div>
                                        <div className="flex-item">
                                            <TextoMidia texto={alternativa.texto} midia={alternativa.midia} />
                                        </div>
                                        <div className="flex-item"></div>
                                    </div>
                                </td>
                            </tr>
                        )
                        )
                    }
                    </tbody>
                </table>
                
            </div>
            {respostaHtml}
        </div>
    )

}

export default QuestaoMultipla