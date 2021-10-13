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

            aluno.cpf = alunoBody.cpf
            aluno.nome = alunoBody.nome
            aluno.dataNascimento = alunoBody.dataNascimento
            aluno.email = alunoBody.email
            aluno.genero = alunoBody.genero
            aluno.tipo = alunoBody.tipo
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

}