import React from "react";

const QuestaoMultiplaForm = (props) => {

    function adicionarAlternativa() {
        props.setAlteracoes(props.index, {
            alternativas: [...props.questao.alternativas, { texto: "", correta: false }]
        })
    }

    function setAlteracaoAlternativa(index, alteracao){

        const alternativaCopy = { ...props.questao.alternativas[index], ...alteracao }
        const alternativasCopy = [...props.questao.alternativas]
        alternativasCopy[index] = alternativaCopy
        props.setAlteracoes(props.index, { alternativas: alternativasCopy})
    }

    return (
        <div className="container" id="questao">
            <div className="row">
                <div className="col">
                    <label htmlFor="titulo" className="form-label">Título PT</label>
                    <div className="input-group">
                        <textarea name="titulo" className="form-control" id="titulo"
                            value={props.questao.titulo} onChange={e => props.setAlteracoes(props.index, { titulo: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="tituloMidia" className="form-label">Título Libras</label>
                    <input type="file" name="tituloMidia" className="form-control" id="tituloMidia"
                        onChange={e => props.salvarAnexo(props.index, e)} />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h3>Alternativas</h3>
                    <button className="btn btn-sm btn-primary" type="button" onClick={adicionarAlternativa}>Adicionar</button>
                </div>
            </div>

            {
                props.questao.alternativas &&
                props.questao.alternativas.map((alternativa,index) =>
                (
                    <div key={index}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="texto" className="form-label">Texto PT</label>
                                <div className="input-group">
                                    <textarea name="texto" className="form-control" id="texto"
                                        value={alternativa.texto} onChange={e => setAlteracaoAlternativa(index, { texto: e.target.value })} />
                                </div>
                            </div>
                            <div className="col">
                                <label htmlFor="textoMidia" className="form-label">Texto Libras</label>
                                <input type="file" name="textoMidia" className="form-control" id="textoMidia"
                                    onChange={e => props.salvarAnexo(props.index, e)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-check">
                                    <input type="radio" name="alternativaCorreta" className="form-check-input" value={index} id="tituloMidia" onChange={e => props.setAlteracoes(props.index, { correta: e.target.value })}/>
                                    <label htmlFor="correta" className="form-check-label">Alternativa Correta</label>
                                </div>
                            </div>
                        </div>

                        <hr></hr>

                    </div>
                )
                )
            }


        </div>
    )
}

export default QuestaoMultiplaForm;