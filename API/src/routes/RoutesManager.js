import { Router } from "express"
import AdminRoutes from "./AdminRoutes.js"
import AlunoRoutes from "./AlunoRoutes.js"
import ProfessorRoutes from "./ProfessorRoutes.js"
import RootRoutes from "./RootRoutes.js"
import Authentication from "../middlewares/Authentication.js"
import TurmaRoutes from "./TurmaRoutes.js"
import TarefaRoutes from "./TarefaRoutes.js"
import MediaRoutes from "./MediaRoutes.js"
import RespostaRoutes from "./RespostaRoutes.js"
import DisciplinaRoutes from "./DisciplinaRoutes.js"

export default class RoutesManager {

    constructor(app) {
        this.app = app
    }

    initializeRoutes(){
        this.initializeAdmin()
        this.initializeAluno()
        this.initializeProfessor()
        this.initializeRoot()
        this.initializeTurma()
        this.initializeTarefa()
        this.initializeMedia()
        this.initializeResposta()
        this.initializeDisciplina()
    }

    initializeRoot(){
        const router = RootRoutes.initializeRoutes(Router())
        this.app.use('/', router)
    }

    initializeAdmin(){
        const router = AdminRoutes.initializeRoutes(Router())
        this.app.use('/admin', 
            Authentication.authentication,
            Authentication.authorization(["Admin"]),
            router)
    }
    
    initializeAluno(){
        const router = AlunoRoutes.initializeRoutes(Router())
        this.app.use('/aluno', 
            Authentication.authentication, 
            router)
    }

    initializeProfessor(){
        const router = ProfessorRoutes.initializeRoutes(Router())
        this.app.use('/professor', 
            Authentication.authentication, 
            Authentication.authorization(["Admin", "Professor"]),
            router)
    }

    initializeTurma(){
        const router = TurmaRoutes.initializeRoutes(Router())
        this.app.use('/turma', 
            Authentication.authentication, 
            router)
    }

    initializeTarefa(){
        const router = TarefaRoutes.initializeRoutes(Router())
        this.app.use('/tarefa', 
            Authentication.authentication, 
            Authentication.authorization(["Professor", "Aluno"]),
            router)
    }

    initializeMedia(){
        const router = MediaRoutes.initializeRoutes(Router())
        this.app.use('/media',
            Authentication.authentication,
            Authentication.authorization(["Professor"]),
            router)    
    }

    initializeResposta(){
        const router = RespostaRoutes.initializeRoutes(Router())
        this.app.use('/resposta',
            Authentication.authentication,
            Authentication.authorization(["Aluno", "Professor"]),
            router)    
    }

    initializeDisciplina(){
        const router = DisciplinaRoutes.initializeRoutes(Router())
        this.app.use('/disciplina',
            Authentication.authentication,
            Authentication.authorization(["Admin", "Professor", "Aluno"]),
            router)
    }
}