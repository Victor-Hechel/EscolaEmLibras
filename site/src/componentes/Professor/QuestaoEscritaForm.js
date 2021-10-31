import React from "react";

const QuestaoEscritaForm = (props) => {
    
    return (
        <div className="container" id="questao">
            <div className="row">
                <div className="col">
                    <label htmlFor="titulo" className="form-label">Título PT</label>
                    <div className="input-group">
                        <textarea name="titulo" className="form-control" id="titulo"
                            value={props.questao.titulo} onChange={e => props.setObjectInArray(props.index, { titulo: e.target.value })} />
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
                    <label htmlFor="resposta" className="form-label">Resposta</label>
                    <div className="input-group">
                        <textarea name="resposta" className="form-control" id="resposta"
                            value={props.questao.resposta} onChange={e => props.setObjectInArray(props.index, { resposta: e.target.value })} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestaoEscritaForm;