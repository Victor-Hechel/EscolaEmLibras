import AdminModel from "../model/Admin.js"
import { createHmac } from 'crypto'
import AdminService from "../services/AdminService.js";

const secret = "pwdSecretTest"

export default class AdminController {

    adminService;

    constructor(){
        this.adminService = new AdminService()
    }

    async list(req, resp, next) {

        try{
            const admins = await this.adminService.listarTodos()

            resp.status(200).json({
                admins: admins.map(x => ({
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
                mensagem: "Erro ao tentar listar admins"
            })
        }

    }

    async get(req, resp, next) {

        const id = req.params.id

        try{
            const admin = await this.adminService.buscarPorId(id)

            if(!admin){
                resp.status(204).send()
                return
            }

            resp.status(200).json({
                admin: {
                    id: admin._id,
                    nome: admin.nome,
                    dataNascimento: admin.dataNascimento,
                    email: admin.email,
                    genero: admin.genero,
                    desabilitado: admin.disabled
                }
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar buscar admin"
            })
        }
        
        
    }

    async create(req, resp, next) {

        const adminBody = req.body
        adminBody.password = createHmac('sha256', secret)
            .update(adminBody.senha)
            .digest('hex')

        try{
            const admin = await this.adminService.inserir(adminBody)

            resp.status(201).json({
                admin: {
                    id: admin._id,
                    nome: admin.nome,
                    dataNascimento: admin.dataNascimento,
                    email: admin.email,
                    genero: admin.genero,
                }
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar inserir admin"
            })
        }
        
    }

    async update(req, resp) {

        const adminBody = req.body
        try{
            const admin = await this.adminService.buscarPorId(adminBody.id)

            if(!admin){
                resp.status(204).send()
                return
            }

            admin.cpf = adminBody.cpf
            admin.nome = adminBody.nome
            admin.dataNascimento = adminBody.dataNascimento
            admin.email = adminBody.email
            admin.genero = adminBody.genero
            admin.tipo = adminBody.tipo
            admin.password = createHmac('sha256', secret)
                .update(adminBody.senha)
                .digest('hex')        

            await this.adminService.atualizar(admin)

            resp.status(201).json({
                admin: {
                    id: admin._id,
                    nome: admin.nome,
                    dataNascimento: admin.dataNascimento,
                    email: admin.email,
                    genero: admin.genero,
                }
            })
        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar atualizar o admin"
            })
        }
        
    }

    async disable(req, resp, next) {

        const id  = req.params.id

        try{
            const admin = await this.adminService.buscarPorId(id)

            if(!admin){
                resp.status(204).send()
                return
            }

            admin.disabled = true

            await this.adminService.atualizar(admin)

            resp.status(201).json({
                admin: {
                    id: admin._id,
                    nome: admin.nome,
                    dataNascimento: admin.dataNascimento,
                    email: admin.email,
                    genero: admin.genero,
                    desabilitado: admin.disabled
                }
            })
        } catch(err) {
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar atualizar o admin"
            })
        }

    }

}