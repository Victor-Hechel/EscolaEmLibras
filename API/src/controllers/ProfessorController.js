import ProfessorModel from "../model/Professor.js"
import { createHmac } from 'crypto'
import ProfessorService from "../services/ProfessorService.js";

const secret = "pwdSecretTest"

export default class ProfessorController {

    professorService;

    constructor(){
        this.professorService = new ProfessorService()
    }

    async list(req, resp, next) {

        try{
            const professores = await this.professorService.listarTodos()

            resp.status(200).json({
                professores: professores.map(x => ({
                    id: x._id,
                    nome: x.nome,
                    dataNascimento: x.dataNascimento,
                    email: x.email,
                    genero: x.genero,
                    desabilitado: x.disabled
                }))
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar listar professores"
            })
        }

    }

    async get(req, resp, next) {

        const id = req.params.id

        try{
            const professor = await this.professorService.buscarPorId(id)

            if(!professor){
                resp.status(204).send()
                return
            }

            resp.status(200).json({
                professor: {
                    id: professor._id,
                    nome: professor.nome,
                    dataNascimento: professor.dataNascimento,
                    email: professor.email,
                    genero: professor.genero,
                    desabilitado: professor.disabled
                }
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar buscar professor"
            })
        }
        
        
    }

    async create(req, resp, next) {

        const professorBody = req.body
        professorBody.password = createHmac('sha256', secret)
            .update(professorBody.senha)
            .digest('hex')

        try{
            const professor = await this.professorService.inserir(professorBody)

            resp.status(201).json({
                professor: {
                    id: professor._id,
                    nome: professor.nome,
                    dataNascimento: professor.dataNascimento,
                    email: professor.email,
                    genero: professor.genero,
                }
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar inserir professor"
            })
        }
        
    }

    async update(req, resp) {

        const professorBody = req.body
        try{
            const professor = await this.professorService.buscarPorId(professorBody.id)

            if(!professor){
                resp.status(204).send()
                return
            }

            professor.cpf = professorBody.cpf
            professor.nome = professorBody.nome
            professor.dataNascimento = professorBody.dataNascimento
            professor.email = professorBody.email
            professor.genero = professorBody.genero
            professor.tipo = professorBody.tipo
            professor.password = createHmac('sha256', secret)
                .update(professorBody.senha)
                .digest('hex')        

            await this.professorService.atualizar(professor)

            resp.status(201).json({
                professor: {
                    id: professor._id,
                    nome: professor.nome,
                    dataNascimento: professor.dataNascimento,
                    email: professor.email,
                    genero: professor.genero,
                }
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar atualizar o professor"
            })
        }
        
    }

    async disable(req, resp, next) {

        const id  = req.params.id

        try{
            const professor = await this.professorService.buscarPorId(id)

            if(!professor){
                resp.status(204).send()
                return
            }

            professor.disabled = true

            await this.professorService.atualizar(professor)

            resp.status(201).json({
                professor: {
                    id: professor._id,
                    nome: professor.nome,
                    dataNascimento: professor.dataNascimento,
                    email: professor.email,
                    genero: professor.genero,
                    desabilitado: professor.disabled
                }
            })
        } catch(err) {
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar atualizar o professor"
            })
        }

    }

}