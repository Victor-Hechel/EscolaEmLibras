import TurmaModel from "../model/Turma.js"
import DisciplinaModel from "../model/Disciplina.js"

export default class TurmaController {

    static list(req, resp, next) {

        TurmaModel.find({}).exec()
            .then(async turmas => {
                if(!turmas.length){
                    resp.status(204).json()
                    return;
                }

                const turmasRetorno = []

                for(let turma of turmas){
                    try{
                        const disciplinas = await DisciplinaModel.find({ turmaId: turma._id }).exec()
                    
                        turmasRetorno.push({
                            id: turma._id,
                            codigo: turma.codigo,
                            alunos: turma.alunos,
                            disciplinas 
                        })
                    } catch(err){
                        console.error("Erro tentando carregar as turmas", err)
                    }
                }

                resp.status(200).json({ turmasRetorno })
            })
            .catch(err => resp.status(500).json(err))
    }

    static get(req, resp, next) {

        const id  = req.params.id

        TurmaModel.findById(id).exec()
            .then(turma => {
                if(!turma){
                    resp.status(204).json()
                    return;
                }
                
                DisciplinaModel.find({ turmaId: id })
                    .exec()
                    .then(disciplinas => {
                        resp.status(200).json({ 
                            turma: {
                                id,
                                codigo: turma.codigo,
                                alunos: turma.alunos,
                                disciplinas 
                            } 
                        })
                    }).catch(err => {
                        resp.status(500).json({ err })
                    })
            })
            .catch(err => { 
                resp.status(500).json({ err })
            })
    }

    static async create(req, resp, next) {

        const turmaModel = new TurmaModel({
            codigo: req.body.codigo,
            alunos: req.body.alunos
        })

        turmaModel.save()
            .then(async turmaResp => {
                
                const returnModel = { 
                    id: turmaResp._id,
                    codigo: turmaResp.codigo,
                    alunos: turmaResp.alunos,
                    disciplinas: [] 
                }

                for(let disciplina of req.body.disciplinas) {
                    try{
                        disciplina.turmaId = returnModel.id
                        const disciplinaModel = new DisciplinaModel(disciplina)
                        const disciplinaResp = await disciplinaModel.save()
                        returnModel.disciplinas.push(disciplinaResp)
                    }catch(error){
                        console.error("Falha ao salvar disciplina", error)                        
                    }
                }
                
                resp.status(201).json({ returnModel })
            })
            .catch(err => {
                resp.status(500).json(err)   
            })
    }

    static update(req, resp, next) {

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
                            const disciplinas = await DisciplinaModel.find({ turmaId: turma._id }).exec()
                            
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
                                    disciplina.turmaId = returnModel.id
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