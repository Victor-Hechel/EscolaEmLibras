import React, { useContext, useState } from 'react'
import AutenticacaoContext from '../contextos/autenticacao'

const ProfessorForm = (props) => {

    const [ nome, setNome ] = useState("")
    const [ cpf, setCpf ] = useState("")
    const [ dataNascimento, setDataNascimento ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ genero, setGenero ] = useState("")
    const [ senha, setSenha ] = useState("")
    const [ inputDisabled, setInputDisabled] = useState(false)

    const { token } = useContext(AutenticacaoContext)


    function HandleSubmit(e){
        e.preventDefault()
        setInputDisabled(true)
        fetch('http://www.localhost:3002/professor', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                cpf,
                nome,
                dataNascimento,
                email,
                genero,
                senha
            })
        }).then(x => {
            console.log(x)
            props.history.push("/professores")
        }).catch(e => {
            console.log(e)
        }).finally(() => setInputDisabled(false))
        
    }

    return (
        <div className="container text-center">
            <main className="form-signin">
                <form onSubmit={HandleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Cadastro Professor</h1>

                    <div className="form-floating">
                        <input type="text" name="nome" className="form-control" id="nome" 
                            value={nome} onChange={e => setNome(e.target.value)}/>
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" name="cpf" className="form-control" id="cpf" 
                            value={cpf} onChange={e => setCpf(e.target.value)} />
                        <label htmlFor="cpf">Cpf</label>
                    </div>
                    <div className="form-floating">
                        <input type="date" name="dataNascimento" className="form-control" id="dataNascimento" 
                            value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" name="email" className="form-control" id="email" 
                            value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" name="genero" className="form-control" id="genero" 
                            value={genero} onChange={e => setGenero(e.target.value)} />
                        <label htmlFor="genero">Gênero</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" name="senha" className="form-control" id="senha" 
                            value={senha} onChange={e => setSenha(e.target.value)} />
                        <label htmlFor="senha">Senha</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={inputDisabled ? "disabled": ""}>Salvar</button>
                </form>
            </main>
        </div>
    )
}


export default ProfessorForm