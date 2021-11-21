import React from "react";

const QuestaoParesForm = (props) => {

    function adicionarPar() {
        props.setAlteracoes(props.index, {
            colunaEsquerda: [...props.questao.colunaEsquerda, { texto: "", midia: "" }],
            colunaDireita: [...props.questao.colunaDireita, { texto: "", midia: "" }]
        })
    }

    function setAlteracaoPar(index, coluna, alteracao){
        const parCopy = { ...props.questao[coluna][index], ...alteracao }
        const paresCopy = [...props.questao[coluna]]
        paresCopy[index] = parCopy
        const novoAtributo = { }
        novoAtributo[coluna] = paresCopy
        props.setAlteracoes(props.index, novoAtributo)
    }

    function setAlteracaoMidiaPar(index, coluna){
        return (value) => {
            setAlteracaoPar(index, coluna, { midia: value })
        }
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
                    <h3>Pares</h3>
                    <button className="btn btn-sm btn-primary" type="button" onClick={adicionarPar}>Adicionar</button>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    {
                        props.questao.colunaEsquerda &&
                        props.questao.colunaEsquerda.map((par, index) =>
                        (
                            <div className="row">
                                <div className="col-xl">
                                    <label htmlFor="texto" className="form-label">Texto PT</label>
                                    <div className="input-group">
                                        <textarea name="texto" className="form-control" id="texto"
                                            value={par.texto} onChange={e => setAlteracaoPar(index, "colunaEsquerda", { texto: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-xl">
                                    <label htmlFor="textoMidia" className="form-label">Texto Libras</label>
                                    <input type="file" name="textoMidia" className="form-control" id="textoMidia"
                                        onChange={e => props.salvarAnexo(props.index, e, setAlteracaoMidiaPar(index, "colunaEsquerda"))} />
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
                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="texto" className="form-label">Texto PT</label>
                                    <div className="input-group">
                                        <textarea name="texto" className="form-control" id="texto"
                                            value={par.texto} onChange={e => setAlteracaoPar(index, "colunaDireita", { texto: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-md">
                                    <label htmlFor="textoMidia" className="form-label">Texto Libras</label>
                                    <input type="file" name="textoMidia" className="form-control" id="textoMidia"
                                        onChange={e => props.salvarAnexo(props.index, e, setAlteracaoMidiaPar(index, "colunaDireita"))} />
                                </div>
                            </div>
                        )
                        ) 
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestaoParesForm;