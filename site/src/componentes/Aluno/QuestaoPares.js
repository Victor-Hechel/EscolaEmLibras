import React from "react"

const QuestaoPares = (props) => {

    function selecionarPar(idEsquerda, idDireita){
        const respondidoDefault = props.respondido ? props.respondido : []
        const respondidoRemovendoEscolhaAntiga = respondidoDefault.filter(x => x.colunaEsquerda !== idEsquerda 
            && x.colunaDireita !== idDireita)


        if(idDireita){
            respondidoRemovendoEscolhaAntiga.push({
                colunaEsquerda: idEsquerda,
                colunaDireita: idDireita
            })
        }
        
        props.setRespondidoQuestao(respondidoRemovendoEscolhaAntiga)
    }


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
                    Resposta Certa:
                </p>
                {
                    props.respostaCerta.certa.map(par => (
                        <div className="row">
                            <div className="col">
                                {props.questao.colunaEsquerda.filter(x => x.id === par.colunaEsquerda)[0].texto}
                            </div>
                            <div className="col">
                                {props.questao.colunaDireita.filter(x => x.id === par.colunaDireita)[0].texto}
                            </div>
                        </div>
                    ))
                }
                
                <button type="button" className="btn btn-primary" onClick={props.proximaQuestao}>Próxima</button>
            </div>
        }
    }

    return (
        <div>
            <h3>{props.questao.enunciado}</h3>
            <div className="row">
                <div className="col">
                    {
                        props.questao.colunaEsquerda &&
                        props.questao.colunaEsquerda.map((par, index) =>
                        (
                            <div className="row" key={index}>
                                <div className="col-xl box-par">
                                    <span>{index+1})</span>
                                    {par.texto}
                                </div>
                            </div>
                        )
                        ) 
                    }
                </div>
                <div className="col">
                {
                        props.questao.colunaDireita &&
                        props.questao.colunaDireita.map((par, index) =>
                        (
                            <div className="row" key={index}>
                                <div className="col-xl box-par">
                                    <select onChange={e => selecionarPar(e.target.value, par.id)}>
                                        <option value="">-</option>
                                        {
                                            props.questao.colunaEsquerda.map((x, i) => (
                                                <option key={i} value={x.id}>{i+1}</option>
                                            ))
                                        }
                                    </select>
                                    {par.texto}
                                </div>
                            </div>
                        )
                        ) 
                    }
                </div>
            </div>
            {respostaHtml}
        </div>
    )

}

export default QuestaoPares