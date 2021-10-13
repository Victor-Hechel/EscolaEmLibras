import React, { useContext, useState, useEffect } from 'react'
import AutenticacaoContext from '../contextos/autenticacao'
import Header from './Header'
import TituloPainel from './TituloPainel'

const AlunoForm = (props) => {

    const [ nome, setNome ] = useState("")
    const [ cpf, setCpf ] = useState("")
    const [ dataNascimento, setDataNascimento ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ genero, setGenero ] = useState("")
    const [ senha, setSenha ] = useState("")
    const [ inputDisabled, setInputDisabled] = useState(false)
    const [ erro, setErro ] = useState("")
    const [ id ] = useState(props.match.params.id)


    const { token } = useContext(AutenticacaoContext)

    useEffect(() => {
        const carregarAluno = async () => {
            const response = await fetch(`http://www.localhost:3002/aluno/${id}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(response.status === 200) {
                const responseBody = await response.json()
                console.log(responseBody)
                setNome(responseBody.aluno.nome)
                setDataNascimento(responseBody.aluno.dataNascimento)
                setCpf(responseBody.aluno.cpf)
                setEmail(responseBody.aluno.email)
                setGenero(responseBody.aluno.genero)
            }
        }
    
        carregarAluno()
    }, [token, id])

    function HandleSubmit(e){
        e.preventDefault()
        setInputDisabled(true)
        const reqBody = {
            cpf,
            nome,
            dataNascimento,
            email,
            genero
        }

        if(!id){
            reqBody.senha = senha
        }else{
            reqBody.id = id
        }
            

        fetch(`http://www.localhost:3002/aluno`, {
            method: id ? 'PUT' : 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        }).then(async x => {
            if(x.status === 201)
                props.history.push("/alunos")
            else{
                const respBody = await x.json()
                setErro(respBody.mensagem)
            }
                    
        }).catch(e => {
            setErro("Ocorreu um problema ao tentar salvar o aluno")
        }).finally(() => setInputDisabled(false))
        
    }

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div class="form-container"> 
                    <form onSubmit={HandleSubmit}>

                        <TituloPainel titulo="Cadastro Aluno" history={props.history} />
                        {
                            erro && 
                            <div className="alert alert-danger" role="alert">
                                {erro}
                            </div>
                        }

                        <div className="row">
                            <div className="col">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" name="nome" className="form-control" id="nome" 
                                    value={nome} onChange={e => setNome(e.target.value)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="cpf" className="form-label">CPF</label>
                                <input type="text" name="cpf" className="form-control" id="cpf" 
                                    value={cpf} onChange={e => setCpf(e.target.value)} />
                            </div>

                            <div className="col-md">
                                <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                                <input type="date" name="dataNascimento" className="form-control" id="dataNascimento" 
                                    value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
                            </div>

                            <div className="col-md">
                                <label htmlFor="genero" className="form-label">Gênero</label>
                                <select name="genero" id="genero" className="form-control" 
                                    value={genero} onChange={e => setGenero(e.target.value)}>
                                    <option>Selecione</option>
                                    <option value="f">Feminino</option>
                                    <option value="m">Masculino</option>
                                    <option value="o">Outro</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" id="email" 
                                    value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                        </div>

                        {
                            !id &&
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="senha" className="form-label">Senha</label>
                                    <input type="password" name="senha" className="form-control" id="senha" 
                                        value={senha} onChange={e => setSenha(e.target.value)} />
                                </div>
                            </div>
                            
                        }
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


export default AlunoForm