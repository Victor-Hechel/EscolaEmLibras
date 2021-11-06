import React from "react"

const TituloPainel = (props) => {


    const btnVoltar = props.history ? <button id="voltar" type="button" className="btn btn-light" onClick={props.history.goBack}>Voltar</button> : null

    return (
        <div className="row">
            {btnVoltar}
            <h1 className="h3 mb-3 fw-normal">{props.titulo}</h1>
        </div>
    )
}

export default TituloPainel