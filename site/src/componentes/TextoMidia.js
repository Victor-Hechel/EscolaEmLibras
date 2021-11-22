import React from "react";

const TextoMidia = (props) => {

    var titulo = <></>
    if(props.texto){
        titulo = <span>{props.texto}</span>
    }

    var midia = <></>
    if(props.midia){
        const url = `http://localhost:3002/${props.midia}`
        if(props.midia.endsWith(".webp")){
            midia = <div className="align-center"><img className="img-fluid" src={url} alt="texto" /></div>
        }else{
            midia = <div className="align-center"><video controls muted src={url} /></div>
        }
        
    }

    return (
        <div>
            {titulo}
            {midia}
        </div>
    )
}

export default TextoMidia