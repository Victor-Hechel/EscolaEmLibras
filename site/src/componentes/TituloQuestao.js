import React from "react";

const TituloQuestao = (props) => {

    var titulo = <></>
    if(props.questao.enunciado){
        titulo = <h3>{props.questao.enunciado}</h3>
    }

    var midia = <></>
    if(props.questao.midia){
        const url = `http://localhost:3002/${props.questao.midia}`
        if(props.questao.midia.endsWith(".webp")){
            midia = <div className="align-center"><img className="img-fluid" src={url} alt="enunciado" /></div>
        }else{
            midia = <div className="align-center"><video controls muted src={url} /></div>
        }
        
    }

    return (
        <div className="titulo">
            {titulo}
            {midia}
        </div>
    )
}

export default TituloQuestao