import React from "react"

const QuestaoMultipla = (props) => {

    var respostaHtml = null

    if(props.respostaCerta){
        if(props.respostaCerta.estaCerta){
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
            {
                props.questao.alternativas &&
                props.questao.alternativas.map((alternativa,index) =>
                (
                    <div key={index}>
                        <div className="row">
                            <div className="col">
                                <input type="radio" name="alternativaCorreta" className="form-check-input" value={index}/>
                                <label htmlFor="texto" className="form-label">{alternativa.texto}</label>
                            </div>
                        </div>

                        <hr></hr>

                    </div>
                )
                )
            }
            {respostaHtml}
        </div>
    )

}

export default QuestaoMultipla