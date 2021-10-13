import React from "react"

const TituloPainel = (props) => {
    console.log(props)
    return (
        <div className="row">
            <button id="voltar" type="button" class="btn btn-light" onClick={props.history.goBack}>Voltar</button>
            <h1 className="h3 mb-3 fw-normal">{props.titulo}</h1>
        </div>
    )
}

export default TituloPainel