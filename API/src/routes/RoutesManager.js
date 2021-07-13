import { Router } from "express"
import AdminRoutes from "./AdminRoutes.js"
import AlunoRoutes from "./AlunoRoutes.js"

export default class RoutesManager {

    constructor(app) {
        this.app = app
    }

    initializeRoutes(){
        this.initializeAdmin()
        this.initializeAluno()
    }

    initializeAdmin(){
        const router = AdminRoutes.initializeRoutes(Router())
        this.app.use('/admin', router)
    }
    
    initializeAluno(){
        const router = AlunoRoutes.initializeRoutes(Router())
        this.app.use('/aluno', router)
    }
}