import TurmaModel from "../model/Turma.js"
import DisciplinaModel from "../model/Disciplina.js"
import TurmaService from "../services/TurmaService.js"

export default class TurmaController {

    constructor() {
        this.turmaService = new TurmaService()
    }

    async list(req, resp) {

        try{
            const turmas = await this.turmaService.listar({ alunoId: req.query.alunoId })

            if(!turmas.length) {
                resp.status(204).json()
                return;
            }

            resp.status(200).json({
                turmas: turmas.map(x => ({
                    id: x._id,
                    codigo: x.codigo,
                    nome: x.nome,
                    disciplinas: x.disciplinas.map(disc => ({
                        id: disc._id,
                        nome: disc.nome
                    }))
                }))
            })
        }catch(e){
            console.log(e)
            resp.status(500).json({
                mensagem: "Falha ao tentar listar todas as turmas"
            })
        }
        
    }

    async get(req, resp) {

        try{
            const turma = await this.turmaService.buscarPorId(req.params.id)

            resp.status(200).json({
                turma: {
                    id: turma._id,
                    codigo: turma.codigo,
                    nome: turma.nome,
                    disciplinas: turma.disciplinas.map(x => ({ 
                        id: x.id, 
                        nome: x.nome, 
                        professor: x.professor 
                    })),
                    alunos: turma.alunos.map(x => ({ 
                        id: x.id, 
                        nome: x.nome 
                    }))
                }
            })
        }catch(e) {
            console.log(e)
            resp.status(500).json({
                mensagem: "Falha ao tentar carregar Turma"
            })
        }
        
    }

    async create(req, resp) {

        try{
            const turma = await this.turmaService.inserir(req.body)

            resp.status(201).json({
                turma: {
                    id: turma._id,
                    codigo: turma.codigo,
                    nome: turma.nome
                }
            })
        }catch(e){
            console.log(e)
            resp.status(500).json({
                mensagem: "Erro ao tentar inserir turmar"
            })
        }

    }

    static update(req, resp) {

        const reqBody = req.body

        TurmaModel.findById(req.body.id).exec()
            .then(turma => {
                if(!turma){
                    resp.status(204).json()
                    return;
                }
                
                turma.codigo = reqBody.nome
                turma.alunos = reqBody.alunos

                turma.save()
                    .then(async turmaResp => {
                        //deletar disciplinas que não fazem mais parte
                        try{
                            const disciplinas = await DisciplinaModel.find({ turma: turma._id }).exec()
                            
                            const disciplinasAtuais = req.body.disciplinas.map(x => x.id)

                            disciplinas.filter(x => !disciplinasAtuais.includes(x._id.toString()))
                                .forEach(disciplina => {
                                    DisciplinaModel.findByIdAndRemove(disciplina.id)
                                        .then()
                                        .catch(err => console.error("Erro ao tentar excluir matéria", err))
                                })
                            
                            const returnModel = { 
                                id: turmaResp._id,
                                codigo: turmaResp.codigo,
                                alunos: turmaResp.alunos,
                                disciplinas: [] 
                            }

                            // atualizar/cadastrar disciplinas atuais
                            for(let disciplina of req.body.disciplinas) {
                                try{
                                    disciplina.turma = returnModel.id
                                    disciplina._id = disciplina.id
                                    
                                    var disciplinaResp;
                                    if(disciplina._id)
                                        disciplinaResp = await DisciplinaModel.findByIdAndUpdate(disciplina.id, disciplina)
                                    else
                                        disciplinaResp = await new DisciplinaModel(disciplina).save()

                                    returnModel.disciplinas.push(disciplinaResp)
                                }catch(error){
                                    console.error("Falha ao salvar disciplina", error)                        
                                }
                            }

                            resp.status(201).json(returnModel)

                        }catch(err) {
                            resp.status(500).json({ err })
                        }

                    }).catch(err => {
                        resp.status(500).json(err)
                    })

            })
            .catch(err => { 
                resp.status(500).json({ err })
            })

        
    }

    static disable(req, resp, next) {

        const id  = req.params.id

        TurmaModel.findById(id).exec()
            .then(turma => {
                if(!turma){
                    resp.status(204).json()
                    return;
                }
                
                turma.disabled = true

                turma.save()
                    .then(disciplinaResp => resp.status(201).json({ disciplinaResp }))
                    .catch(err => {
                        resp.status(500).json(err)   
                    })

            })
            .catch(err => { 
                resp.status(500).json({ err })
            })

    }

}