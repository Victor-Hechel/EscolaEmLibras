import AlunoModel from "../model/Aluno.js"
import { createHmac } from 'crypto'

const secret = "pwdSecretTest"

export default class AlunoController {

    static list(req, resp, next) {

        AlunoModel.find({}).exec()
            .then(alunos => {
                if(!alunos.length){
                    resp.status(204).json()
                    return;
                }
                resp.status(200).json({ alunos })
            })
            .catch(err => resp.status(500).json(err))
    }

    static get(req, resp, next) {

        const id  = req.params.id

        AlunoModel.findById(id).exec()
            .then(user => {
                if(!user){
                    resp.status(204).json()
                    return;
                }
                    
                resp.status(200).json({ user })
            })
            .catch(err => { 
                resp.status(500).json({ err })
            })
    }

    static async create(req, resp, next) {

        const user = req.body
        user.password = createHmac('sha256', secret)
            .update(user.senha)
            .digest('hex')

        const aluno = new AlunoModel(user)

        aluno.save()
            .then(userResp => resp.status(201).json({ userResp }))
            .catch(err => {
                resp.status(500).json(err)   
            })
    }

    static update(req, resp, next) {

        const id  = req.body.id

        const reqBody = req.body

        AlunoModel.findById(id).exec()
            .then(user => {
                if(!user){
                    resp.status(204).json()
                    return;
                }
                
                user.cpf = reqBody.cpf
                user.nome = reqBody.nome
                user.dataNascimento = reqBody.dataNascimento
                user.email = reqBody.email
                user.genero = reqBody.genero
                user.tipo = reqBody.tipo
                user.pontos = reqBody.pontos
                user.password = createHmac('sha256', secret)
                    .update(reqBody.senha)
                    .digest('hex')

                user.save()
                    .then(userResp => resp.status(201).json({ userResp }))
                    .catch(err => {
                        resp.status(500).json(err)   
                    })

            })
            .catch(err => { 
                resp.status(500).json({ err })
            })

        
    }

    static disable(req, resp, next) {

        const id  = req.params.id

        AlunoModel.findById(id).exec()
            .then(user => {
                if(!user){
                    resp.status(204).json()
                    return;
                }
                
                user.disabled = true

                user.save()
                    .then(userResp => resp.status(201).json({ userResp }))
                    .catch(err => {
                        resp.status(500).json(err)   
                    })

            })
            .catch(err => { 
                resp.status(500).json({ err })
            })

    }

}