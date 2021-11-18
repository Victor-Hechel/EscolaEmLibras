import { createHmac } from 'crypto'
import AlunoService from "../services/AlunoService.js";

const secret = "pwdSecretTest"

export default class AlunoController {

    alunoService;

    constructor(){
        this.alunoService = new AlunoService()
    }

    async list(req, resp) {

        try{
            const alunos = await this.alunoService.listarTodos()

            resp.status(200).json({
                alunos: alunos.map(x => ({
                    id: x._id,
                    nome: x.nome,
                    dataNascimento: x.dataNascimento,
                    email: x.email,
                    genero: x.genero,
                    pontos: x.pontos,
                    desabilitado: x.disabled
                }))
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar listar alunos"
            })
        }

    }

    async get(req, resp) {

        const id = req.params.id

        try{
            const aluno = await this.alunoService.buscarPorId(id)

            if(!aluno){
                resp.status(204).send()
                return
            }

            resp.status(200).json({
                aluno: {
                    id: aluno._id,
                    nome: aluno.nome,
                    cpf: aluno.cpf,
                    dataNascimento: aluno.dataNascimento.toISOString().split('T')[0],
                    email: aluno.email,
                    genero: aluno.genero,
                    pontos: aluno.pontos,
                    desabilitado: aluno.disabled
                }
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar buscar aluno"
            })
        }
        
        
    }

    async create(req, resp) {

        const alunoBody = req.body
        alunoBody.password = createHmac('sha256', secret)
            .update(alunoBody.senha)
            .digest('hex')

        try{
            const aluno = await this.alunoService.inserir(alunoBody)

            resp.status(201).json({
                aluno: {
                    id: aluno._id,
                    nome: aluno.nome,
                    dataNascimento: aluno.dataNascimento,
                    email: aluno.email,
                    genero: aluno.genero,
                    pontos: aluno.pontos
                }
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar inserir aluno"
            })
        }
        
    }

    async update(req, resp) {

        const alunoBody = req.body
        try{
            const aluno = await this.alunoService.buscarPorId(alunoBody.id)

            if(!aluno){
                resp.status(204).send()
                return
            }

            if(alunoBody.cpf)
                aluno.cpf = alunoBody.cpf
            
            if(alunoBody.nome)
                aluno.nome = alunoBody.nome

            if(alunoBody.dataNascimento)
                aluno.dataNascimento = alunoBody.dataNascimento
            
            if(alunoBody.email)
                aluno.email = alunoBody.email

            if(alunoBody.genero)
                aluno.genero = alunoBody.genero
            
            if(alunoBody.tipo)
                aluno.tipo = alunoBody.tipo
            
            if(alunoBody.pontos)
                aluno.pontos = alunoBody.pontos

            await this.alunoService.atualizar(aluno)

            resp.status(201).json({
                aluno: {
                    id: aluno._id,
                    nome: aluno.nome,
                    dataNascimento: aluno.dataNascimento,
                    email: aluno.email,
                    genero: aluno.genero,
                    pontos: aluno.pontos
                }
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar atualizar o aluno"
            })
        }
        
    }

    async disable(req, resp) {

        const id  = req.params.id

        try{
            const aluno = await this.alunoService.buscarPorId(id)

            if(!aluno){
                resp.status(204).send()
                return
            }

            aluno.disabled = true

            await this.alunoService.atualizar(aluno)

            resp.status(201).json({
                aluno: {
                    id: aluno._id,
                    nome: aluno.nome,
                    dataNascimento: aluno.dataNascimento,
                    email: aluno.email,
                    genero: aluno.genero,
                    desabilitado: aluno.disabled
                }
            })
        } catch(err) {
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar atualizar o aluno"
            })
        }

    }

    async aumentarPontuacao(req, resp){
        const id  = req.params.id

        try{
            const aluno = await this.alunoService.buscarPorId(id)

            if(!aluno){
                resp.status(204).send()
                return
            }
            
            if(!aluno.pontos)
                aluno.pontos = 0
            
            aluno.pontos += req.body.pontos

            await this.alunoService.atualizar(aluno)

            resp.status(200).send({
                aluno: {
                    id: aluno._id,
                    nome: aluno.nome,
                    dataNascimento: aluno.dataNascimento,
                    email: aluno.email,
                    genero: aluno.genero,
                    pontos: aluno.pontos
                }
            })

        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar atualizar o aluno"
            })
        }
    }

}