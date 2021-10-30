import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router'
import AutenticacaoContext from '../../contextos/autenticacao'
import Header from '../Header'
import TituloPainel from '../TituloPainel'

const TarefaForm = (props) => {

    const [ titulo, setTitulo ] = useState("")    

    const [ questoes, setQuestoes ] = useState([])

    const { token } = useContext(AutenticacaoContext)

    const [ erro, setErro ] = useState("") 
    const [ inputDisabled, setInputDisabled ] = useState(false) 

    const disciplinaId = useQuery().get("disciplinaId")

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
      
    function HandleSubmit(e){
        e.preventDefault()
        setInputDisabled(true)

        const reqBody = {
            titulo: titulo,
            midia: null,
            disciplina: disciplinaId,
            questoes: questoes.map(q => ({
                enunciado: q.titulo,
                tipo: "escrita",
                resposta: q.resposta
            }))
        }   

        fetch(`http://www.localhost:3002/tarefa`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        }).then(async x => {
            if(x.status === 201)
                props.history.goBack()
            else{
                const respBody = await x.json()
                setErro(respBody.mensagem)
            }
        }).catch(e => {
            setErro("Ocorreu um problema ao tentar salvar a tarefa")
        }).finally(() => setInputDisabled(false))
    }

    function setObjectInArray(index, updates) {
        const questaoCopy = {...questoes[index], ...updates}
        const questoesCopy = [...questoes]
        questoesCopy[index] = questaoCopy
        setQuestoes(questoesCopy)
    }

    function adicionarTarefa(){
        setQuestoes([...questoes, {titulo: "", tituloMidia: null, resposta:""}])
    }

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div className="form-container"> 
                    <form onSubmit={HandleSubmit}>

                        <TituloPainel titulo="Cadastro Tarefa" history={props.history} />
                        {
                            erro && 
                            <div className="alert alert-danger" role="alert">
                                {erro}
                            </div>
                        }

                        <div className="row">
                            <div className="col">
                                <label htmlFor="titulo" className="form-label">Título PT</label>
                                <input type="text" name="titulo" className="form-control" id="titulo" 
                                        value={titulo} onChange={e => setTitulo(e.target.value)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3>Questões</h3>
                                <button type="button" className="btn btn-sm btn-primary align-right" onClick={adicionarTarefa}>Adicionar</button>
                            </div>
                        </div> 

                        <div className="row">
                            <div className="col">
                                { 
                                    questoes != null &&
                                    questoes.map((questao, index) => (
                                        <div className="container" id="questao" key={index}>
                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="titulo" className="form-label">Título PT</label>
                                                    <div className="input-group"> 
                                                        <textarea name="titulo" className="form-control" id="titulo" 
                                                            value={questao.titulo} onChange={e => setObjectInArray(index, {titulo: e.target.value})} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="tituloMidia" className="form-label">Título Libras</label>
                                                    <input type="file" name="tituloMidia" className="form-control" id="tituloMidia" 
                                                        onChange={ e => setObjectInArray(index, {tituloMidia: e.target.value})} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="resposta" className="form-label">Resposta</label>
                                                    <div className="input-group"> 
                                                        <textarea name="resposta" className="form-control" id="resposta" 
                                                            value={questao.resposta} onChange={e => setObjectInArray(index, {resposta: e.target.value})} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={inputDisabled ? "disabled": ""}>Salvar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}


export default TarefaForm