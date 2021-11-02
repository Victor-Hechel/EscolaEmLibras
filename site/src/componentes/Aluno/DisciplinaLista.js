import React, { useContext, useEffect, useState } from 'react'
import AutenticacaoContext from '../../contextos/autenticacao'
import Header from '../Header'
import TituloPainel from '../TituloPainel'

const DisciplinaLista = (props) => {

    const [ disciplinas, setDisciplinas ] = useState([])

    const { token, user } = useContext(AutenticacaoContext)

    const userId = user.id

    useEffect(() => {
        const listarDisciplinas = async () => {
            const response = await fetch(`http://www.localhost:3002/turma?alunoId=${userId}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(response.status === 200) {
                const responseBody = await response.json()
                setDisciplinas(responseBody.turmas[0].disciplinas)
            }
        }

        listarDisciplinas()
    }, [token, userId])
    

    return (
        <>
            <Header />
            <main className="container main-panel">
                <div className="form-container"> 
                    <div>
                        <TituloPainel titulo="Lista" history={props.history} />
                        <table id="lista" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Disciplina</th>
                                </tr>
                            </thead>
                            <tbody>
                            {console.log(disciplinas)}
                        {
                            disciplinas && 
                            disciplinas.map((disciplina, index) => (
                                <tr key={index} 
                                    onClick={() => props.history.push(`/disciplina/${disciplina.id}`)}>
                                    <td>
                                        {disciplina.nome}
                                    </td>
                                </tr>
                            ))
                        }
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </main>
        </>
    )
} 

export default DisciplinaLista