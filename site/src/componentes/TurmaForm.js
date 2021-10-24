import React, { useContext, useState, useEffect } from 'react'
import AutenticacaoContext from '../contextos/autenticacao'
import Header from './Header'
import TituloPainel from './TituloPainel'

const TurmaForm = (props) => {

    const [ codigo, setCodigo ] = useState("")
    const [ alunos, setAlunos ] = useState([])
    const [ disciplinas, setDisciplinas ] = useState([])
    const [ inputDisabled, setInputDisabled] = useState(false)
    const [ erro, setErro ] = useState("")
    const [ id ] = useState(props.match.params.id)

    const [ alunosSelect, setAlunosSelect ] = useState([])
    const [ professoresSelect, setProfessoresSelect ] = useState([])
    const [ alunoSelecionado, setAlunoSelecionado ] = useState("")

    const { token } = useContext(AutenticacaoContext)

    useEffect(() => {
        if(!id)
            return

        const carregarTurma = async () => {
            const response = await fetch(`http://www.localhost:3002/turma/${id}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(response.status === 200) {
                const responseBody = await response.json()
                setCodigo(responseBody.turma.codigo)
                setAlunos(responseBody.turma.alunos)
                setDisciplinas(responseBody.turma.disciplinas)
            }
        }
    
        carregarTurma()
    }, [token, id])

    useEffect(() => {
        const listarAlunos = async () => {
            const response = await fetch('http://www.localhost:3002/aluno', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(response.status === 200) {
                const responseBody = await response.json()
                setAlunosSelect(responseBody.alunos)
            }
        }

        const listarProfessores = async () => {
            const response = await fetch('http://www.localhost:3002/professor', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(response.status === 200) {
                const responseBody = await response.json()
                setProfessoresSelect(responseBody.professores)
            }
        }

        listarAlunos()
        listarProfessores()
    }, [token])

    function HandleSubmit(e){
        e.preventDefault()
        setInputDisabled(true)
        const reqBody = {
            codigo,
            disciplinas,
            alunos: alunos.map(x => x.id)
        }

        fetch(`http://www.localhost:3002/turma`, {
            method: id ? 'PUT' : 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        }).then(async x => {
            if(x.status === 201)
                props.history.push("/turmas")
            else{
                const respBody = await x.json()
                setErro(respBody.mensagem)
            }
                    
        }).catch(e => {
            console.log(e)
            setErro("Ocorreu um problema ao tentar salvar a turma")
        }).finally(() => setInputDisabled(false))
        
    }

    function adicionarAluno() {
        if(!alunoSelecionado)
            return;

        setAlunos([...alunos, alunosSelect.find(x => x.id === alunoSelecionado)])
    }

    function adicionarDisciplina() {
        setDisciplinas([...disciplinas, { nome: "", professor: "" }])
    }

    function removerAluno(i) {
        const alunosCopia = alunos.slice()
        alunosCopia.splice(i, 1)
        setAlunos(alunosCopia)
    }

    function alterarProfessor(e, index) {
        const disciplinasCopia = disciplinas.slice()
        disciplinasCopia[index].professor = e.target.value
        setDisciplinas(disciplinasCopia)
    }

    function alterarDisciplina(e, index) {
        const disciplinasCopia = disciplinas.slice()
        disciplinasCopia[index].nome = e.target.value
        setDisciplinas(disciplinasCopia)
    }

    function removerMateria(index) {
        return () => {
            const disciplinasCopia = disciplinas.slice()
            disciplinasCopia.splice(index, 1)
            setDisciplinas(disciplinasCopia)
        }
    }

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div className="form-container"> 
                    <form onSubmit={HandleSubmit}>

                        <TituloPainel titulo="Cadastro Turma" history={props.history} />
                        {
                            erro && 
                            <div className="alert alert-danger" role="alert">
                                {erro}
                            </div>
                        }

                        <div className="row">
                            <div className="col">
                                <label htmlFor="codigo" className="form-label">Código</label>
                                <input type="text" name="codigo" className="form-control" id="codigo" 
                                    value={codigo} onChange={e => setCodigo(e.target.value)} />
                            </div>
                            
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="aluno" className="form-label">Alunos</label>
                                <div className="input-group">
                                    <select name="aluno" id="aluno" className="form-control" onChange={e => setAlunoSelecionado(e.target.value)}>
                                        <option value="">Selecione</option>
                                    {
                                        alunosSelect && 
                                        alunosSelect.map((aluno, index) => (
                                            <option key={index} value={aluno.id}>{aluno.nome}</option>
                                        ))
                                    }
                                    </select>
                                    <button class="btn btn-primary" type="button" onClick={adicionarAluno}><i className="bi bi-plus"></i></button>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <table id="lista" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span>Nome</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                {
                                    alunos && 
                                    alunos.map((aluno, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span>{aluno.nome}</span>
                                                <button className="btn btn-sm btn-primary invisible-button align-right" onClick={() => removerAluno(index)}>Remover</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="row">
                            <div>
                                <table id="lista" className="table table-bordered table-striped table-no-padding">
                                    <thead>
                                        <tr>
                                            <th>Disciplina</th>
                                            <th>Professor</th>
                                            <th>Remover</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                {
                                    disciplinas && 
                                    disciplinas.map((disciplina, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="text" className="form-control" value={disciplina.nome} placeholder="Matéria..." onChange={e => alterarDisciplina(e, index)} />
                                            </td>
                                            <td>
                                                <select value={disciplina.professor} className="form-control" onChange={e => alterarProfessor(e, index)}>
                                                    <option value="">Selecione</option>
                                                { 
                                                    professoresSelect && 
                                                    professoresSelect.map((professor, index) => (
                                                        <option value={professor.id} key={index}>{professor.nome}</option>
                                                    ))
                                                }
                                                </select>
                                            </td>
                                            <td className="align-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-primary" onClick={removerMateria(index)}><i className="bi bi-dash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <button className="btn btn-primary align-right" type="button" onClick={adicionarDisciplina}>Adicionar Matéria</button>
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


export default TurmaForm