import React, { useContext, useState } from 'react'
import AutenticacaoContext from '../contextos/autenticacao'

const ProfessorForm = () => {

    const [ nome, setNome ] = useState("")
    const [ cpf, setCpf ] = useState("")
    const [ dataNascimento, setDataNascimento ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ genero, setGenero ] = useState("")
    const [ senha, setSenha ] = useState("")

    const { token } = useContext(AutenticacaoContext)


    function HandleSubmit(e){
        e.preventDefault()

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
        }).catch(e => {
            console.log(e)
        })
        
    }

    return (
        <form onSubmit={HandleSubmit}>
            <h1>Professor Form</h1>
            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)}/>
            <input type="text" name="cpf" value={cpf} onChange={e => setCpf(e.target.value)}/>
            <input type="text" name="dataNascimento" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
            <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="text" name="genero" value={genero} onChange={e => setGenero(e.target.value)}/>
            <input type="password" name="senha" value={senha} onChange={e => setSenha(e.target.value)} />
            <input type="submit" value="Salvar" />
        </form>
    )
}

export default ProfessorForm