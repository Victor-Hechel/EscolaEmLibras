import ProfessorModel from "../model/Professor.js"
import { createHmac } from 'crypto'

const secret = "pwdSecretTest"

export default class ProfessorController {

    static list(req, resp, next) {

        ProfessorModel.find({}).exec()
            .then(professores => {
                if(!professores.length){
                    resp.status(204).json()
                    return;
                }
                resp.status(200).json({ professores })
            })
            .catch(err => resp.status(500).json(err))
    }

    static get(req, resp, next) {

        const id  = req.params.id

        ProfessorModel.findById(id).exec()
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
        user.senha = createHmac('sha256', secret)
            .update(user.senha)
            .digest('hex')

        const professor = new ProfessorModel(user)

        professor.save()
            .then(userResp => resp.status(201).json({ userResp }))
            .catch(err => {
                resp.status(500).json(err)   
            })
    }

    static update(req, resp, next) {

        const id  = req.body.id

        const reqBody = req.body

        ProfessorModel.findById(id).exec()
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

                user.senha = createHmac('sha256', secret)
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

        ProfessorModel.findById(id).exec()
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