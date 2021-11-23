import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router'
import AutenticacaoContext from '../../contextos/autenticacao'
import Header from '../Header'
import TituloPainel from '../TituloPainel'
import QuestaoEscritaForm from './QuestaoEscritaForm'
import QuestaoMultiplaForm from './QuestaoMultiplaForm'
import QuestaoParesForm from './QuestaoParesForm'

const TarefaForm = (props) => {

    const [titulo, setTitulo] = useState("")

    const [questoes, setQuestoes] = useState([])

    const { token } = useContext(AutenticacaoContext)

    const [ tipoSelecionado, setTipoSelecionado ] = useState("escrita")
    const [ erro, setErro ] = useState("")
    const [ inputDisabled, setInputDisabled ] = useState(false)

    const disciplinaId = useQuery().get("disciplinaId")

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    function HandleSubmit(e) {
        e.preventDefault()
        setInputDisabled(true)

        const reqBody = {
            titulo: titulo,
            midia: null,
            disciplina: disciplinaId,
            questoes: questoes.map(q => {
                if(q.tipo === "escrita")
                    return {
                        enunciado: q.titulo,
                        midia: q.tituloMidia,
                        tipo: q.tipo,
                        resposta: q.resposta
                    }
                else if(q.tipo === "multipla")
                    return {
                        enunciado: q.titulo,
                        midia: q.tituloMidia,
                        tipo: q.tipo,
                        alternativas: q.alternativas.map((alt, index) => ({
                            ...alt,
                            correta: index === parseInt(q.correta)
                        }))
                    }
                else if(q.tipo === "pares")
                    return {
                        enunciado: q.titulo,
                        midia: q.tituloMidia,
                        tipo: q.tipo,
                        colunaEsquerda: q.colunaEsquerda,
                        colunaDireita: q.colunaDireita
                    }    

                return {}
            })
        }

        fetch(`http://www.localhost:3002/tarefa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        }).then(async x => {
            if (x.status === 201)
                props.history.goBack()
            else {
                const respBody = await x.json()
                setErro(respBody.mensagem)
            }
        }).catch(e => {
            setErro("Ocorreu um problema ao tentar salvar a tarefa")
        }).finally(() => setInputDisabled(false))
    }

    function setObjectInArray(index, updates) {
        const questaoCopy = { ...questoes[index], ...updates }
        const questoesCopy = [...questoes]
        questoesCopy[index] = questaoCopy
        setQuestoes(questoesCopy)
    }

    function adicionarQuestao() {

        const novaQuestao = {
            titulo: "",
            tituloMidia: "",
            tipo: tipoSelecionado
        }

        if(tipoSelecionado === "escrita") {
            novaQuestao.resposta = ""
        }else if(tipoSelecionado === "multipla") {
            novaQuestao.correta = 0
            novaQuestao.alternativas = [{ texto: "", midia: "" }]
        }else if(tipoSelecionado === "pares") {
            novaQuestao.colunaEsquerda = [{ texto: "", midia: "" }]
            novaQuestao.colunaDireita = [{ texto: "", midia: "" }]
        }

        setQuestoes([...questoes, novaQuestao])
    }

    function salvarAnexo(indice, e, callBack = (value) => setObjectInArray(indice, { tituloMidia: value })) {
        if (!e.target.files)
            return

        const data = new FormData()
        data.append('media', e.target.files[0])

        fetch(`http://www.localhost:3002/media`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data
        }).then(async x => {
            if (x.status === 200) {
                const responseBody = await x.json()
                callBack(responseBody.info.id);
            } else {
                const respBody = await x.json()
                setErro(respBody.mensagem)
            }
        }).catch(e => {
            setErro("Ocorreu um problema ao tentar salvar a tarefa")
        })
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
                                <label htmlFor="titulo" className="form-label">Título Tarefa</label>
                                <input type="text" name="titulo" className="form-control" id="titulo"
                                    value={titulo} onChange={e => setTitulo(e.target.value)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>Questões</label>

                                <div className="input-group mb-3 align-right">
                                    <select className="form-select" value={tipoSelecionado} onChange={e => setTipoSelecionado(e.target.value)}>
                                        <option value="escrita">Escrita</option>
                                        <option value="multipla">Múltipla</option>
                                        <option value="pares">Pares</option>
                                    </select>
                                    <button className="btn btn-sm btn-primary" type="button" onClick={adicionarQuestao}>Adicionar</button>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                {
                                    questoes != null &&
                                    questoes.map((questao, index) => {
                                        if(questao.tipo === "escrita")
                                            return <QuestaoEscritaForm 
                                                key={index}
                                                index={index} 
                                                questao={questao}
                                                setAlteracoes={setObjectInArray}
                                                salvarAnexo={salvarAnexo} />
                                        else if (questao.tipo === "multipla")
                                            return <QuestaoMultiplaForm 
                                                key={index}
                                                index={index} 
                                                questao={questao}
                                                setAlteracoes={setObjectInArray}
                                                salvarAnexo={salvarAnexo} />
                                        else if (questao.tipo === "pares")
                                            return <QuestaoParesForm 
                                                key={index}
                                                index={index} 
                                                questao={questao}
                                                setAlteracoes={setObjectInArray}
                                                salvarAnexo={salvarAnexo} />

                                        return <></>
                                    })
                                }

                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={inputDisabled ? "disabled" : ""}>Salvar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}


export default TarefaForm